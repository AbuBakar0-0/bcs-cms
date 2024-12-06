import { supabase } from "@/lib/supabase";

export async function GET(request) {
  try {
    // Extract the 'uuid' parameter from the request
    const searchParams = request.nextUrl.searchParams;
    const uuid = searchParams.get("uuid");

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

    // Step 1: Fetch practice_location by uuid
    const { data: practiceLocation, error: locationError } = await supabase
      .from("practice_locations")
      .select("provider_id")
      .eq("uuid", uuid)
      .single();

    if (locationError || !practiceLocation) {
      throw new Error("No practice location found with the provided UUID.");
    }

    const providerId = practiceLocation.provider_id;

    // Step 2: Fetch provider_documents and related providers_info
    const { data, error } = await supabase
      .from("provider_documents")
      .select(
        `*, 
        providers_info(*)`
      )
      .eq("provider_id", providerId);

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
          status: 404,
        }
      );
    }

    // Return the retrieved data
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
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
