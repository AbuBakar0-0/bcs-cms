import { supabase } from "@/lib/supabase";

export async function GET(request) {
  try {
    // Extract optional filters, if any
    const searchParams = request.nextUrl.searchParams;
    const addedBy = searchParams.get("uuid"); // Filter based on added_by

    // Build the query without aliases
    let query = supabase
      .from("provider_documents")
      .select(`
        *,
        providers_info(*)
      `)
      .eq("providers_info.added_by", addedBy)
      .is("deleted_at",null); // Filtering by added_by

    // Execute the query
    const { data, error } = await query;

    // Handle potential query errors
    if (error) {
      throw new Error(`Failed to retrieve data: ${error.message}`);
    }

    // Check if no data was found
    if (!data || data.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No records found",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 404,
        }
      );
    }

    // Return the data as a list
    return new Response(
      JSON.stringify(data),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    // Handle general errors
    console.error("Error in GET handler:", error);
    return new Response(
      JSON.stringify({
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
