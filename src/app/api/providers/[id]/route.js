import { supabase } from "@/lib/supabase";

export async function GET(req, { params }) {
  try {
    // Destructure the ID from the route parameters
    const { id } = await params;

    // Fetch provider details for the given ID
    const { data, error } = await supabase
      .from("providers_info")
      .select(`*`)
      .eq("uuid", id)
      .single();

    if (error) throw error;

    // Respond with the retrieved provider details
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
