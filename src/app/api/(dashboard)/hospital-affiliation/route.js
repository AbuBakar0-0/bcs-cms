import { supabase } from "@/lib/supabase";
import insertAddress from "../util";

export async function POST(request) {
	try {
		const formData = await request.json();

        const homeAddress = await insertAddress(formData,"Location");
        
		// Inserting Provider Information
		const { data: hospitalAffiliation, error: hospitalError } = await supabase
			.from("hospital_affiliations")
			.insert({
                hospital_name: formData.hospital_name,
                address_id: homeAddress?.uuid,
                type:formData.type
			})
			.select("uuid")
			.single();

		if (hospitalError) throw hospitalError;
		console.log(hospitalAffiliation);
		return new Response(
			JSON.stringify({
				message: "Data saved successfully",
				hospitalAffiliation_id: hospitalAffiliation?.uuid,
			}),
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error saving Data:", error);
		return new Response(
			JSON.stringify({
				message: "Error Saving Data",
			}),
			{ status: 500 }
		);
	}
}

export async function GET(request) {
	try {
		// Fetching all hospital affiliations without filtering by type
		const { data: hospitalAffiliations, error: hospitalError } = await supabase
			.from("hospital_affiliations")
			.select("uuid, hospital_name, address_id, type");

		if (hospitalError) throw hospitalError;

		// If no hospital affiliations found, return an empty result
		if (!hospitalAffiliations.length) {
			return new Response(
				JSON.stringify({
					message: "No hospital affiliations found",
					hospitalAffiliations,
				}),
				{ status: 404 }
			);
		}

		// Fetch the addresses associated with each hospital affiliation
		const addressIds = hospitalAffiliations.map(h => h.address_id);
		const { data: addresses, error: addressError } = await supabase
			.from("addresses")
			.select("*")
			.in("uuid", addressIds); // Fetch addresses where the uuid matches the address_id

		if (addressError) throw addressError;

		// Combine the hospital affiliation and address data
		const result = hospitalAffiliations.map(hospital => {
			const address = addresses.find(addr => addr.uuid === hospital.address_id);
			return {
				...hospital,
				address: address || null, // If address exists, include it, otherwise null
			};
		});

		// Return the combined data
		return new Response(
			JSON.stringify({
				message: "Data fetched successfully",
				result,
			}),
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching Data:", error);
		return new Response(
			JSON.stringify({
				message: "Error Fetching Data",
			}),
			{ status: 500 }
		);
	}
}

