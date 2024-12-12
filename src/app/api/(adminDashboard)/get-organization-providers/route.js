import { supabase } from "@/lib/supabase";

export async function GET(request) {
  try {
    // Extract the `profile_id` parameter from the search params
    const searchParams = request.nextUrl.searchParams;
    const profileId = searchParams.get("uuid");

    if (!profileId) {
      return Response.json(
        { error: "Missing profile_id parameter" },
        { status: 400 }
      );
    }

    // Perform the query with a JOIN equivalent using Supabase relationships
    const { data, error } = await supabase
      .from("practice_profile_provider") // The table we're querying from
      .select(`
        *,
        providers_info (
          *
        )
      `)
      .eq("profile_id", profileId); // Filter by profile_id

    if (error) throw error;

    // Return the data as a JSON response
    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
