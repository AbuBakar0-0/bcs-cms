import { supabase } from "@/lib/supabase";

export async function GET(request) {
	try {
		// Fetching providers information
		const { data: providers, error: providersError } = await supabase
			.from("providers_info")
			.select(
				`uuid, 
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
                expiry_date`
			);

		if (providersError) throw providersError;

		// Respond with the retrieved providers
		return new Response(
			JSON.stringify({
				message: "Providers retrieved successfully",
				providers,
			}),
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error retrieving providers:", error);
		return new Response(
			JSON.stringify({
				message: "Failed to retrieve providers",
				error: error.message,
			}),
			{ status: 500 }
		);
	}
}
