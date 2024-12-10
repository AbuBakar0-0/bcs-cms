import { supabase } from "@/lib/supabase";

export async function GET(request) {
  try {
    // Extract `uuid` from the request parameters
    const searchParams = request.nextUrl.searchParams;
    const uuid = searchParams.get("uuid");

    // Validate `uuid` parameter
    if (!uuid) {
      return new Response(
        JSON.stringify({
          error: "Missing required parameter: uuid",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Fetch practice location details by `uuid`
    const { data: practiceLocation, error } = await supabase
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
      .eq("uuid", uuid) // Filter by `uuid`
      .is("deleted_at", null) // WHERE deleted_at IS NULL
      .single(); // Expect a single record

    // Handle potential query errors
    if (error) {
      throw new Error(`Failed to retrieve practice location: ${error.message}`);
    }

    // Check if no data was found
    if (!practiceLocation) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No practice location found for the provided uuid",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Return the data
    return new Response(
      JSON.stringify(practiceLocation),
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
        error: "Failed to retrieve practice location",
        details: error.message,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}
