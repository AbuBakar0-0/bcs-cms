import { supabase } from "@/lib/supabase";

export async function GET(request) {
	try {
		// Get practice location with all related data
		const { data: practiceLocations, error: practiceError } =
			await supabase.from("practice_locations").select(`
                *,
                service_address:addresses!practice_locations_service_address_id_fkey (
                    address_line_1,
                    address_line_2,
                    city,
                    state,
                    zip_code
                ),
                mailing_address:addresses!practice_locations_mailing_address_id_fkey (
                    address_line_1,
                    address_line_2,
                    city,
                    state,
                    zip_code
                ),
                correspondence_address:addresses!practice_locations_correspondence_address_id_fkey (
                    address_line_1,
                    address_line_2,
                    city,
                    state,
                    zip_code
                ),
                service_contact:contacts!practice_locations_service_contact_id_fkey (
                    home_phone,
                    fax,
                    email,
                    cell_phone
                ),
                mailing_contact:contacts!practice_locations_mailing_contact_id_fkey (
                    home_phone,
                    fax,
                    email
                ),
                correspondence_contact:contacts!practice_locations_correspondence_contact_id_fkey (
                    home_phone,
                    fax,
                    email
                ),
                practice_contact:contacts!practice_locations_practice_contact_id_fkey (
                    contact_name,
                    email,
                    work_email,
                    work_phone,
                    cell_phone,
                    relation
                )
            `);

		if (practiceError) {
			throw new Error(
				`Failed to fetch practice locations: ${practiceError.message}`
			);
		}

		const transformedData = practiceLocations.map((location) => ({
			uuid: location.uuid,
			legal_business_name: location.legal_business_name,
			doing_business_name: location.doing_business_name,
			npi_2: location.npi_2,
			tax_id: location.tax_id,
			taxonomy_code_1: location.taxonomy_code_1,
			taxonomy_code_2: location.taxonomy_code_2,
			ptan_medicare_number: location.ptan_medicare_number,
			medicaid_number: location.medicaid_number,

			// Service Address
			service_address_1: location.service_address?.address_line_1,
			service_address_2: location.service_address?.address_line_2,
			service_city: location.service_address?.city,
			service_state: location.service_address?.state,
			service_zip: location.service_address?.zip_code,

			// Mailing Address
			mailing_address_1: location.mailing_address?.address_line_1,
			mailing_address_2: location.mailing_address?.address_line_2,
			mailing_city: location.mailing_address?.city,
			mailing_state: location.mailing_address?.state,
			mailing_zip: location.mailing_address?.zip_code,

			// Correspondence Address
			correspondence_address_1: location.correspondence_address?.address_line_1,
			correspondence_address_2: location.correspondence_address?.address_line_2,
			correspondence_city: location.correspondence_address?.city,
			correspondence_state: location.correspondence_address?.state,
			correspondence_zip: location.correspondence_address?.zip_code,

			// Service Contact
			service_phone: location.service_contact?.home_phone,
			service_fax: location.service_contact?.fax,
			service_email: location.service_contact?.email,
			service_appointment_phone: location.service_contact?.cell_phone,

			// Mailing Contact
			mailing_phone: location.mailing_contact?.home_phone,
			mailing_fax: location.mailing_contact?.fax,
			mailing_email: location.mailing_contact?.email,

			// Correspondence Contact
			correspondence_phone: location.correspondence_contact?.home_phone,
			correspondence_fax: location.correspondence_contact?.fax,
			correspondence_email: location.correspondence_contact?.email,

			// Practice Contact
			practice_contact_name: location.practice_contact?.contact_name,
			practice_contact_email: location.practice_contact?.email,
			practice_contact_work_phone: location.practice_contact?.work_phone,
			practice_contact_cell_phone: location.practice_contact?.cell_phone,
			practice_contact_type: location.practice_contact?.relation,
		}));

		return new Response(
			JSON.stringify({
				success: true,
				data: transformedData,
			}),
			{
				headers: { "Content-Type": "application/json" },
				status: 200,
			}
		);
	} catch (error) {
		console.error("Error in GET handler:", error);
		return new Response(
			JSON.stringify({
				error: "Failed to retrieve practice locations",
				details: error.message,
			}),
			{
				headers: { "Content-Type": "application/json" },
				status: 500,
			}
		);
	}
}

export async function POST(request) {
	let createdAddresses = [];
	let createdContacts = [];

	try {
		let data;
		try {
			data = await request.json();
		} catch (e) {
			return new Response(
				JSON.stringify({ error: "Invalid JSON format in request body" }),
				{
					headers: { "Content-Type": "application/json" },
					status: 400,
				}
			);
		}

		const addressTypes = ["service", "mailing", "correspondence"];
		const contactTypes = ["service", "mailing", "correspondence", "practice"];

		try {
			const addresses = await Promise.all(
				addressTypes.map(async (type) => {
					const addressData = {
						address_line_1: data[`${type}_address_1`],
						address_line_2: data[`${type}_address_2`] || null,
						city: data[`${type}_city`],
						state: data[`${type}_state`],
						zip_code: data[`${type}_zip`],
						type,
					};

					const { data: addressResult, error } = await supabase
						.from("addresses")
						.insert(addressData)
						.select()
						.single();

					if (error) {
						throw new Error(
							`Failed to create ${type} address: ${error.message}`
						);
					}

					createdAddresses.push(addressResult);
					return addressResult;
				})
			);

			try {
				const contacts = await Promise.all(
					contactTypes.map(async (type) => {
						let contactData;

						if (type === "practice") {
							contactData = {
								contact_name: data.practice_contact_name || null,
								email: data.practice_contact_email || null,
								work_email: data.practice_contact_email || null,
								work_phone: data.practice_contact_work_phone || null,
								cell_phone: data.practice_contact_cell_phone || null,
								relation: data.practice_contact_type || null,
							};
						} else {
							contactData = {
								home_phone: data[`${type}_phone`] || null,
								fax: data[`${type}_fax`] || null,
								email: data[`${type}_email`] || null,
							};

							if (type === "service") {
								contactData.cell_phone = data.service_appointment_phone || null;
							}
						}

						const { data: contactResult, error } = await supabase
							.from("contacts")
							.insert(contactData)
							.select()
							.single();

						if (error) {
							throw new Error(
								`Failed to create ${type} contact: ${error.message}`
							);
						}

						createdContacts.push(contactResult);
						return contactResult;
					})
				);

				const practiceLocationData = {
					provider_id: data.provider_id,
					legal_business_name: data.legal_business_name,
					doing_business_name: data.doing_business_name || null,
					npi_2: data.npi_2 || null,
					tax_id: data.tax_id || null,
					taxonomy_code_1: data.taxonomy_code_1 || null,
					taxonomy_code_2: data.taxonomy_code_2 || null,
					service_address_id: addresses[0].uuid,
					mailing_address_id: addresses[1].uuid,
					correspondence_address_id: addresses[2].uuid,
					service_contact_id: contacts[0].uuid,
					mailing_contact_id: contacts[1].uuid,
					correspondence_contact_id: contacts[2].uuid,
					practice_contact_id: contacts[3].uuid,
					ptan_medicare_number: data.ptan_medicare_number || null,
					medicaid_number: data.medicaid_number || null,
				};

				const { data: practiceLocationResult, error } = await supabase
					.from("practice_locations")
					.insert(practiceLocationData)
					.select()
					.single();

				if (error) {
					throw new Error(
						`Failed to create practice location: ${error.message}`
					);
				}

				return new Response(
					JSON.stringify({
						success: true,
						data: practiceLocationResult,
					}),
					{
						headers: { "Content-Type": "application/json" },
						status: 200,
					}
				);
			} catch (error) {
				await cleanup(createdContacts, createdAddresses);
				throw error;
			}
		} catch (error) {
			await cleanup([], createdAddresses);
			throw error;
		}
	} catch (error) {
		console.error("Error in POST handler:", error);
		return new Response(
			JSON.stringify({
				error: "Failed to save practice location",
				details: error.message,
			}),
			{
				headers: { "Content-Type": "application/json" },
				status: 500,
			}
		);
	}
}

export async function DELETE(request, { params }) {
	try {
		const locationId = params.locationId;
		console.log(`Starting deletion for location: ${locationId}`);

		const { data: location, error: fetchError } = await supabase
			.from("practice_locations")
			.select(
				`
                service_address_id,
                mailing_address_id,
                correspondence_address_id,
                service_contact_id,
                mailing_contact_id,
                correspondence_contact_id,
                practice_contact_id
            `
			)
			.eq("uuid", locationId)
			.single();

		if (fetchError || !location) {
			console.error(`Location not found: ${locationId}`);
			return new Response(
				JSON.stringify({ error: "Practice location not found" }),
				{
					status: 404,
					headers: { "Content-Type": "application/json" },
				}
			);
		}

		const addressIds = [
			location.service_address_id,
			location.mailing_address_id,
			location.correspondence_address_id,
		].filter(Boolean);

		const contactIds = [
			location.service_contact_id,
			location.mailing_contact_id,
			location.correspondence_contact_id,
			location.practice_contact_id,
		].filter(Boolean);

		await Promise.all([
			supabase.from("practice_locations").delete().eq("uuid", locationId),
			addressIds.length > 0 &&
				supabase.from("addresses").delete().in("uuid", addressIds),
			contactIds.length > 0 &&
				supabase.from("contacts").delete().in("uuid", contactIds),
		]);

		console.log(`Successfully deleted location: ${locationId}`);
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error(`Failed to delete location: ${params.locationId}`, error);
		return new Response(
			JSON.stringify({ error: "Failed to delete practice location" }),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
}

async function cleanup(contacts = [], addresses = []) {
	try {
		if (contacts.length > 0) {
			await supabase
				.from("contacts")
				.delete()
				.in(
					"uuid",
					contacts.map((c) => c.uuid)
				);
		}
		if (addresses.length > 0) {
			await supabase
				.from("addresses")
				.delete()
				.in(
					"uuid",
					addresses.map((a) => a.uuid)
				);
		}
	} catch (cleanupError) {
		console.error("Cleanup failed:", cleanupError);
	}
}
