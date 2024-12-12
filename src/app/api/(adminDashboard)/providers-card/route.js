import { supabase } from "@/lib/supabase";

export async function GET(request) {
  try {
    // Extract UUID from request query parameters
    const searchParams = request.nextUrl.searchParams;
    const uuid = searchParams.get("uuid");

    // Ensure UUID is provided
    if (!uuid) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "UUID parameter is required",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Build the query to fetch joined data
    const { data, error } = await supabase
      .from("providers_info")
      .select(
        `*, 
        home_address:addresses!home_address_id (*),
        service_location_address:addresses!service_location_address_id (*),
        mailing_address:addresses!mailing_address_id (*),
        contact:contacts!contact_id (*),
        emergency_contact:contacts!emergency_contact_id (*),
        professional_ids(*)`
         // Select related data from professional_ids table
      )
      .eq("uuid", uuid); // Filter by UUID

    // Handle potential query errors
    if (error) {
      throw new Error(`Database query error: ${error.message}`);
    }

    // Check if no records were found
    if (!data || data.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No records found for the provided UUID",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 404,
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
    // Handle general errors
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
