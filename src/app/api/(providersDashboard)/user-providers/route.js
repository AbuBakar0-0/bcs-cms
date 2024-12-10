import { supabase } from "@/lib/supabase";

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);
		const user_uuid = searchParams.get("user_uuid");

		if (!user_uuid) {
			return new Response(
				JSON.stringify({ message: "user_uuid is required" }),
				{
					status: 400,
				}
			);
		}

		const { data: providers, error: providersError } = await supabase
			.from("providers_info")
			.select(
				`
		  uuid,
		  first_name,
		  middle_initial,
		  last_name,
		  provider_title,
		  ssn,
		  gender,
		  dob,
		  license_id,
		  state_issued,
		  issue_date,
		  expiry_date
		`
			)
			.eq("added_by", user_uuid);
		if (providersError) throw providersError;

		return new Response(
			JSON.stringify({
				message: "Provider information saved successfully",
				provider: providers,
			}),
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error fetching providers:", error);
		return new Response(
			JSON.stringify({ error: error.message || "Failed to fetch providers" }),
			{ status: 200 }
		);
	}
}
