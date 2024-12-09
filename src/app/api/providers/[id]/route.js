import { supabase } from "@/lib/supabase";

export async function GET(req, { params }) {
  try {
    // Destructure the ID from the route parameters
    const { id } = params;

    // Fetch provider details along with joined data from related tables
    const { data, error } = await supabase
      .from("providers_info")
      .select(`
        *,
        home_address:addresses!home_address_id (*),
        service_location_address:addresses!service_location_address_id (*),
        mailing_address:addresses!mailing_address_id (*),
        contact:contacts!contact_id (*),
        emergency_contact:contacts!emergency_contact_id (*)
      `)
      .eq("uuid", id)
      .single();

    if (error) throw error;

    // Respond with the retrieved provider details, including related data
    return new Response(
      JSON.stringify({
        message: "Provider retrieved successfully",
        provider: data,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving provider:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to retrieve provider",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
