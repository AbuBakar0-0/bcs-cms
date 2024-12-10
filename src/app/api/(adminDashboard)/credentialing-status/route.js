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

    // Perform the query to join credentialing_contacts with providers_info
    const { data, error } = await supabase
      .from("practice_profiles")
      .select(
        `*, 
        providers_info!inner(*)`
      )
      .eq("providers_info.added_by", addedBy);

    if (error) {
      throw new Error(`Failed to retrieve data: ${error.message}`);
    }

    if (!data || data.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No records found",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Return the retrieved data
    return new Response(
      JSON.stringify(data),
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
