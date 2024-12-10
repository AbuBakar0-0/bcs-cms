import { supabase } from "@/lib/supabase";

export async function GET(request) {
  try {
    // Extract the 'added_by' parameter from the request
    const searchParams = request.nextUrl.searchParams;
    const uuid = searchParams.get("uuid");

    if (!uuid) {
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

    // Fetch the required data using Supabase's query builder
    const { data, error } = await supabase
      .from("payers_setup")
      .select("status, providers_info!inner(uuid)")
      .eq("providers_info.uuid", uuid)
      .is("deleted_at", null);

    if (error) {
      throw new Error(`Failed to retrieve data: ${error.message}`);
    }

    if (!data || data.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Group by status and count occurrences
    const statusCounts = data.reduce((acc, item) => {
      const { status } = item;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    // Convert the grouped data into the desired response format
    const response = Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
    }));

    // Return the grouped data
    return new Response(JSON.stringify(response), {
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
