import { supabase } from "@/lib/supabase";

export async function GET(request) {
  try {
    // Extract optional filters, if any
    const searchParams = request.nextUrl.searchParams;
    const uuid = searchParams.get("uuid");

    // Build the query
    let query = supabase
    .from("practice_locations")
    .select(
      `
      *,
      service_address:addresses!practice_locations_service_address_id_fkey(*),
      mailing_address:addresses!practice_locations_mailing_address_id_fkey(*),
      correspondence_address:addresses!practice_locations_correspondence_address_id_fkey(*),
      service_contact:contacts!practice_locations_service_contact_id_fkey(*),
      mailing_contact:contacts!practice_locations_mailing_contact_id_fkey(*),
      correspondence_contact:contacts!practice_locations_correspondence_contact_id_fkey(*),
      practice_contact:contacts!practice_locations_practice_contact_id_fkey(*)
    `
    )
    .is("deleted_at", null);

    // Add UUID filter if provided
    if (uuid) {
      query = query.eq("uuid", uuid);
    }

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
        status: 200,
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
