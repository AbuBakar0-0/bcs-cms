import { supabase } from "@/lib/supabase";

export async function GET(request) {
  try {
    // Extract the `uuid` parameter from the search params
    const searchParams = request.nextUrl.searchParams;
    const addedById = searchParams.get("uuid");

    if (!addedById) {
      return Response.json(
        { error: "Missing uuid parameter" },
        { status: 400 }
      );
    }

    // Perform the query with a JOIN and filter
    const { data, error } = await supabase
      .from("practice_profiles")
      .select(
        `*, 
        practice_profile_provider (
          *, 
          providers_info (
            *
          )
        )`
      )
      .eq("practice_profile_provider.providers_info.added_by", addedById); // Filter by added_by in the joined providers_info table

    if (error) throw error;

    // Filter out locations where practice_location_providers is an empty array
    const filteredData = data.filter(location => location.practice_profile_provider.length > 0);

    // Return the filtered data as a JSON response
    return Response.json(filteredData, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
