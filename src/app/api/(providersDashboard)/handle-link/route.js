import { supabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { business_id:practice_location_uuid, provider_id:provider_id } = body;
    
    // Validate the required fields
    if (!practice_location_uuid || !provider_id) {
        return Response.json(
            { error: "Both practice_location_uuid and provider_uuid are required" },
            { status: 400 }
        );
    }
    
    // Insert data into the table
    const { data, error } = await supabase
    .from("practice_location_providers")
    .insert([{ practice_location_uuid, provider_id }]).select();
    
    if (error) throw error;

    // Return success response
    return Response.json(
      { message: "Data inserted successfully", data },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
