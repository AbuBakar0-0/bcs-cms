import { supabase } from "@/lib/supabase";

export async function GET(request) {
  try {
    // Extract `added_by` from the request parameters
    const searchParams = request.nextUrl.searchParams;
    const added_by = searchParams.get("uuid");

    // Validate `added_by` parameter
    if (!added_by) {
      return new Response(
        JSON.stringify({
          error: "Missing required parameter: added_by",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Fetch practice profiles with providers_info, addresses, and contacts
    const { data: practiceProfiles, error } = await supabase
      .from("practice_locations")
      .select(`*`)
      .eq("practice_id", added_by) // Filter by `added_by`
      .is("deleted_at", null); // WHERE deleted_at IS NULL

    // Handle potential query errors
    if (error) {
      throw new Error(`Failed to retrieve practice profiles: ${error.message}`);
    }

    // Check if no data was found
    if (!practiceProfiles || practiceProfiles.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No practice profiles found for the provided added_by",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Return the data
    return new Response(JSON.stringify(practiceProfiles), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    // Handle general errors
    console.error("Error in GET handler:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to retrieve practice profiles",
        details: error.message,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}
