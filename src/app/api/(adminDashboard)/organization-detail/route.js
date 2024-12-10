import { supabase } from "@/lib/supabase";

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const uuid = searchParams.get("uuid");

    if (!uuid) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "UUID is required",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Query to fetch the desired data
    const { data, error } = await supabase
      .from("practice_locations")
      .select(
        `
        practice_location_providers (
          providers_info (*)
        )
      `
      )
      .eq("uuid", uuid);

    if (error) {
      throw new Error(`Failed to retrieve data: ${error.message}`);
    }

    if (!data || data.length === 0) {
      return new Response(
        JSON.stringify([]),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
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
