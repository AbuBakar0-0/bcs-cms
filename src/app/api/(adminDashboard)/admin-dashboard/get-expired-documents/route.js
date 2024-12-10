import { supabase } from "@/lib/supabase";

export async function GET(request) {
  try {
    // Extract the 'added_by' parameter from the request
    const searchParams = request.nextUrl.searchParams;
    const addedBy = searchParams.get("uuid");

    if (!addedBy) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "added_by parameter is required",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Fetch provider_info data to get related provider_documents
    const { data: providerInfo, error: providerInfoError } = await supabase
      .from("providers_info")
      .select("uuid")
      .eq("added_by", addedBy);

    if (providerInfoError) {
      throw new Error(
        `Failed to retrieve provider info: ${providerInfoError.message}`
      );
    }

    if (!providerInfo || providerInfo.length === 0) {
      return new Response(
        JSON.stringify([]),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Calculate the date 30 days from now and strip the time part
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set to the start of the day (midnight)

    const expiryDate = new Date();
    expiryDate.setDate(currentDate.getDate() + 30);
    expiryDate.setHours(0, 0, 0, 0); // Set to the start of the day (midnight)

    // Fetch provider_documents with the required conditions
    const { data: documents, error: documentsError } = await supabase
      .from("provider_documents")
      .select(
        `*, providers_info!inner(*)`
      )
      .in(
        "provider_id",
        providerInfo.map((pi) => pi.uuid)
      ) // Filter by provider_id
      .lte("expiry_date", expiryDate.toISOString()) // Documents expiring in 30 days or less
      .is("deleted_at", null); // Ensure deleted_at is null

    if (documentsError) {
      throw new Error(
        `Failed to retrieve provider documents: ${documentsError.message}`
      );
    }

    if (!documents || documents.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No provider documents matching the criteria",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Process documents and create an array of results
    const result = documents.map((document) => {
      const { first_name, middle_initial, last_name } = document.providers_info;
      const expiry_date = document.expiry_date; // Get expiry_date from provider_documents table

      // Strip the time part from expiry_date for comparison
      const documentExpiryDate = new Date(expiry_date);
      documentExpiryDate.setHours(0, 0, 0, 0); // Set to the start of the day (midnight)

      const daysUntilExpiry = Math.floor(
        (documentExpiryDate - currentDate) / (1000 * 60 * 60 * 24)
      ); // Difference in days

      let name = `${first_name} ${middle_initial.trim()}. ${last_name}`;
      let type = document.title; // Using title as the type
      let days = daysUntilExpiry;

      // Return the formatted object with name, type, and days
      return {
        name,
        type, // Added type field
        days,
      };
    });

    // Return the list of results in JSON format
    return new Response(
      JSON.stringify(result),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in GET handler:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to retrieve data",
        details: error.message,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}
