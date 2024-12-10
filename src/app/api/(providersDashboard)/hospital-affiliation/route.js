import { supabase } from "@/lib/supabase";
import insertAddress from "../util";

export async function POST(request) {
	try {
		const formData = await request.json();
		const homeAddress = await insertAddress(formData, "Location");
		console.log(homeAddress);   
		const { data: hospitalAffiliation, error: hospitalError } = await supabase
			.from("hospital_admittings")
			.insert({
				hospital_name: formData.hospital_name,
				address_id: homeAddress?.uuid,
				type: formData.type,
				provider_id: formData.provider_id,
				deleted_at: null,
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
		const searchParams = request.nextUrl.searchParams;
		const provider_id = searchParams.get("provider_id");

		const { data: hospitalAffiliations, error: hospitalError } = await supabase
			.from("hospital_admittings")
			.select("uuid, hospital_name, address_id, type")
			.is("deleted_at", null)
			.eq("provider_id", provider_id);

		if (hospitalError) throw hospitalError;

		if (!hospitalAffiliations.length) {
			return new Response(
				JSON.stringify({
					message: "No hospital affiliations found",
					hospitalAffiliations,
				}),
				{ status: 200 }
			);
		}

		const addressIds = hospitalAffiliations.map((h) => h.address_id);
		const { data: addresses, error: addressError } = await supabase
			.from("addresses")
			.select("*")
			.in("uuid", addressIds);

		if (addressError) throw addressError;

		const result = hospitalAffiliations.map((hospital) => {
			const address = addresses.find(
				(addr) => addr.uuid === hospital.address_id
			);
			return {
				...hospital,
				address: address || null,
			};
		});

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

export async function PUT(request) {
	try {
		const formData = await request.json();
		const { uuid } = formData;

		if (!uuid) {
			return new Response(
				JSON.stringify({
					message: "UUID is required for updating",
				}),
				{ status: 400 }
			);
		}

		// Get the existing hospital affiliation
		const { data: existingHospital, error: fetchError } = await supabase
			.from("hospital_admittings")
			.select("address_id")
			.eq("uuid", uuid)
			.single();

		if (fetchError) throw fetchError;

		// Update address with all available fields
		const { data: updatedAddress, error: addressError } = await supabase
			.from("addresses")
			.update({
				address_line_1: formData.address_line_1,
				address_line_2: formData.address_line_2,
				city: formData.city,
				state: formData.state,
				country: formData.country || "USA",
				zip_code: formData.zip_code,
				county: formData.county,
				type: "Location",
			})
			.eq("uuid", existingHospital.address_id)
			.select()
			.single();

		if (addressError) throw addressError;

		// Update hospital affiliation
		const { data: updatedHospital, error: hospitalError } = await supabase
			.from("hospital_admittings")
			.update({
				hospital_name: formData.hospital_name,
				type: formData.type,
			})
			.eq("uuid", uuid)
			.select()
			.single();

		if (hospitalError) throw hospitalError;

		return new Response(
			JSON.stringify({
				message: "Data updated successfully",
				result: {
					...updatedHospital,
					address: updatedAddress,
				},
			}),
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating Data:", error);
		return new Response(
			JSON.stringify({
				message: "Error Updating Data",
				error: error.message,
			}),
			{ status: 500 }
		);
	}
}
export async function DELETE(request) {
	try {
		const { searchParams } = new URL(request.url);
		const uuid = searchParams.get("uuid");

		if (!uuid) {
			return new Response(
				JSON.stringify({
					message: "UUID is required for deletion",
				}),
				{ status: 400 }
			);
		}

		const { data: hospital, error: fetchError } = await supabase
			.from("hospital_admittings")
			.select("address_id")
			.eq("uuid", uuid)
			.is("deleted_at", null)
			.single();

		if (fetchError) throw fetchError;

		const now = new Date().toISOString();

		const { error: hospitalError } = await supabase
			.from("hospital_admittings")
			.update({ deleted_at: now })
			.eq("uuid", uuid)
			.is("deleted_at", null);

		if (hospitalError) throw hospitalError;

		const { error: addressError } = await supabase
			.from("addresses")
			.update({ deleted_at: now })
			.eq("uuid", hospital.address_id)
			.is("deleted_at", null);

		if (addressError) throw addressError;

		return new Response(
			JSON.stringify({
				message: "Data deleted successfully",
			}),
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error deleting Data:", error);
		return new Response(
			JSON.stringify({
				message: "Error Deleting Data",
				error: error.message,
			}),
			{ status: 500 }
		);
	}
}
