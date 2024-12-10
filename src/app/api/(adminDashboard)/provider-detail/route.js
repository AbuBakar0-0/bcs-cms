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
      .eq("uuid", addedBy);

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

    // Get all provider_documents associated with the provider_id
    const { data, error } = await supabase
      .from("provider_documents")
      .select("status, provider_id")
      .in(
        "provider_id",
        providerInfo.map((pi) => pi.uuid)
      ) // Filter by the provider_id from providers_info
      .is("deleted_at", null);

    if (error) {
      throw new Error(
        `Failed to retrieve provider documents: ${error.message}`
      );
    }

    if (!data || data.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No provider documents found for the given added_by",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Group by status and count the occurrences
    const groupedData = data.reduce((acc, curr) => {
      const status = curr.status;
      if (!acc[status]) {
        acc[status] = { status: status, total_count: 0 };
      }
      acc[status].total_count++;
      return acc;
    }, {});

    const result = Object.values(groupedData);

    // Return the grouped data
    console.log(result);
    return new Response(JSON.stringify(result), {
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
