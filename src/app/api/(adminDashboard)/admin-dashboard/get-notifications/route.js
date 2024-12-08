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
        JSON.stringify({
          success: false,
          message: "No provider info found for the given added_by",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 404,
        }
      );
    }

    // Calculate the date 30 days from now
    const currentDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(currentDate.getDate() + 30);

    // Fetch provider_documents with the required conditions
    const { data: documents, error: documentsError } = await supabase
      .from("provider_documents")
      .select(
        `
        *,
        providers_info!inner(*)
      `
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
          status: 404,
        }
      );
    }

    // Return the documents
    return new Response(JSON.stringify(documents), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
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
