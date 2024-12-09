import { supabase } from "@/lib/supabase";

export async function GET(request) {
	try {
		// Extract the `uuid` parameter from the search params
		const searchParams = request.nextUrl.searchParams;
		const addedById = searchParams.get("uuid");

		if (!addedById) {
			return Response.json({ error: "Missing uuid parameter" }, { status: 400 });
		}

		// Perform the query with a JOIN and filter
		const { data, error } = await supabase
			.from("practice_profiles")
			.select(
				`*, 
				 providers_info(uuid, name, added_by)`
			)
			.eq("providers_info.added_by", addedById)
			.innerJoin("providers_info", "practice_profiles.provider_id", "providers_info.uuid");

		if (error) throw error;

		// Return the data as a JSON response
		return Response.json(data, { status: 200 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
}
