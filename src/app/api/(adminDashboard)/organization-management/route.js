import { supabase } from "@/lib/supabase";

export async function GET(request) {
  try {
    // Extract `added_by` from the request parameters
    const searchParams = request.nextUrl.searchParams;
    const added_by = searchParams.get("added_by");

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

    // Fetch practice locations and their related data
    const { data: practiceLocations, error } = await supabase
      .from("practice_locations")
      .select(
        `
        *,
        providers_info(*),
        service_address:addresses!practice_locations_service_address_id_fkey(*),
        mailing_address:addresses!practice_locations_mailing_address_id_fkey(*),
        correspondence_address:addresses!practice_locations_correspondence_address_id_fkey(*),
        service_contact:contacts!practice_locations_service_contact_id_fkey(*),
        mailing_contact:contacts!practice_locations_mailing_contact_id_fkey(*),
        correspondence_contact:contacts!practice_locations_correspondence_contact_id_fkey(*),
        practice_contact:contacts!practice_locations_practice_contact_id_fkey(*)
      `
      )
      .eq("providers_info.added_by", added_by) // Filter by `added_by`
      .is("deleted_at", null); // WHERE deleted_at IS NULL

    // Handle potential query errors
    if (error) {
      throw new Error(`Failed to retrieve practice locations: ${error.message}`);
    }

    // Check if no data was found
    if (!practiceLocations || practiceLocations.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No practice locations found for the provided added_by",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Return the data
    return new Response(
      JSON.stringify( practiceLocations),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    // Handle general errors
    console.error("Error in GET handler:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to retrieve practice locations",
        details: error.message,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}
