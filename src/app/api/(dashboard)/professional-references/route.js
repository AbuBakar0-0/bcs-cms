import { supabase } from "@/lib/supabase";
import insertAddress from "../util";

export async function POST(request) {
	try {
		const formData = await request.json();

		// Insert Address using utility function
		const homeAddress = await insertAddress(formData, "Location");

		// Insert Contact
		const { data: contact, error: contactError } = await supabase
			.from("contacts")
			.insert({
				cell_phone: formData.cell_phone,
				fax: formData.fax,
				email: formData.email,
			})
			.select("uuid")
			.single();

		if (contactError) throw contactError;

		// Create Professional Reference
		const { data: professionalReference, error: referenceError } =
			await supabase
				.from("professional_references")
				.insert({
					provider_type: formData.provider_type,
					first_name: formData.first_name,
					middle_initial: formData.middle_initial,
					last_name: formData.last_name,
					address_id: homeAddress?.uuid,
					contact_id: contact?.uuid,
				})
				.select("uuid")
				.single();

		if (referenceError) throw referenceError;

		return new Response(
			JSON.stringify({
				message: "Reference created successfully",
				reference_id: professionalReference?.uuid,
			}),
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error creating reference:", error);
		return new Response(
			JSON.stringify({
				message: "Error creating reference",
				error: error.message,
			}),
			{ status: 500 }
		);
	}
}

export async function GET(request) {
	try {
		// Get professional references
		const { data: professionalReferences, error: referenceError } =
			await supabase
				.from("professional_references")
				.select(
					"uuid, provider_type, first_name, middle_initial, last_name, address_id, contact_id"
				);

		if (referenceError) throw referenceError;

		if (!professionalReferences || professionalReferences.length === 0) {
			return new Response(
				JSON.stringify({
					message: "Success",
					data: [],
				}),
				{ status: 200 }
			);
		}

		const addressPromises = professionalReferences.map((reference) =>
			supabase
				.from("addresses")
				.select("*")
				.eq("uuid", reference.address_id)
				.single()
		);

		const contactPromises = professionalReferences.map((reference) =>
			supabase
				.from("contacts")
				.select("*")
				.eq("uuid", reference.contact_id)
				.single()
		);

		const [addressResponses, contactResponses] = await Promise.all([
			Promise.all(addressPromises),
			Promise.all(contactPromises),
		]);

		const flattenedData = professionalReferences.map((reference, index) => {
			const address = addressResponses[index].data || {};
			const contact = contactResponses[index].data || {};

			return {
				uuid: reference.uuid,
				provider_type: reference.provider_type || "",
				first_name: reference.first_name || "",
				middle_initial: reference.middle_initial || "",
				last_name: reference.last_name || "",
				address_line_1: address.address_line_1 || "",
				address_line_2: address.address_line_2 || "",
				country: address.country || "USA",
				city: address.city || "",
				state: address.state || "",
				zip_code: address.zip_code || "",
				cell_phone: contact.cell_phone || "",
				fax: contact.fax || "",
				email: contact.email || "",
				address_id: reference.address_id,
				contact_id: reference.contact_id,
			};
		});

		return new Response(
			JSON.stringify({
				message: "Data retrieved successfully",
				data: flattenedData,
			}),
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching references:", error);
		return new Response(
			JSON.stringify({
				message: "Error fetching references",
				error: error.message,
			}),
			{ status: 500 }
		);
	}
}
