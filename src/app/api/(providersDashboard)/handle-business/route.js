import { supabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { business_id, provider_id } = body;
    console.log(body);

    // Validate the required fields
    if (!business_id || !provider_id) {
      return Response.json(
        { error: "Both business_id and provider_id are required" },
        { status: 400 }
      );
    }

    // Insert data into the table
    const { data, error } = await supabase
      .from("practice_profile_provider")
      .insert([{ profile_id: business_id, provider_id }])
      .select();

    if (error) throw error;

    // Return success response
    return new Response(
      JSON.stringify({ message: "Data inserted successfully", data }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
