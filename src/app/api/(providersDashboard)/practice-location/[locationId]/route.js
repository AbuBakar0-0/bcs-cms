import { supabase } from "@/lib/supabase";

export async function DELETE(request, { params }) {
	try {
		const { locationId } = await params;
		console.log("Soft deleting practice location:", locationId);

		const deletedAt = new Date().toISOString();

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
			.is("deleted_at", null)
			.eq("uuid", locationId)
			.single();
		if (fetchError || !location) {
			console.error("Practice location not found:", locationId);
			return new Response(null, { status: 404 });
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
			supabase
				.from("practice_locations")
				.update({ deleted_at: deletedAt })
				.eq("uuid", locationId),

			addressIds.length > 0 &&
				supabase
					.from("addresses")
					.update({ deleted_at: deletedAt })
					.in("uuid", addressIds),

			contactIds.length > 0 &&
				supabase
					.from("contacts")
					.update({ deleted_at: deletedAt })
					.in("uuid", contactIds),
		]);

		console.log("Successfully soft deleted practice location:", locationId);
		return new Response(null, { status: 200 });
	} catch (error) {
		console.error("Error soft deleting practice location:", error);
		return new Response(null, { status: 500 });
	}
}

export async function PUT(request, { params }) {
	let updatedAddresses = [];
	let updatedContacts = [];

	try {
		const locationId = params.locationId;
		console.log("location id ----------------------> ", locationId);
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

		const { data: existingLocation, error: fetchError } = await supabase
			.from("practice_locations")
			.select(
				`
                *,
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

		if (fetchError || !existingLocation) {
			return new Response(
				JSON.stringify({ error: "Practice location not found" }),
				{
					headers: { "Content-Type": "application/json" },
					status: 404,
				}
			);
		}

		// Update addresses
		const addressTypes = ["service", "mailing", "correspondence"];
		const addressIds = {
			service: existingLocation.service_address_id,
			mailing: existingLocation.mailing_address_id,
			correspondence: existingLocation.correspondence_address_id,
		};

		try {
			const addresses = await Promise.all(
				addressTypes.map(async (type) => {
					const addressData = {
						address_line_1: data[`${type}_address_1`],
						address_line_2: data[`${type}_address_2`] || null,
						city: data[`${type}_city`],
						state: data[`${type}_state`],
						zip_code: data[`${type}_zip`],
					};

					const { data: addressResult, error } = await supabase
						.from("addresses")
						.update(addressData)
						.eq("uuid", addressIds[type])
						.select()
						.single();

					if (error) {
						throw new Error(
							`Failed to update ${type} address: ${error.message}`
						);
					}

					updatedAddresses.push(addressResult);
					return addressResult;
				})
			);

			// Update contacts
			const contactTypes = ["service", "mailing", "correspondence", "practice"];
			const contactIds = {
				service: existingLocation.service_contact_id,
				mailing: existingLocation.mailing_contact_id,
				correspondence: existingLocation.correspondence_contact_id,
				practice: existingLocation.practice_contact_id,
			};

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
							.update(contactData)
							.eq("uuid", contactIds[type])
							.select()
							.single();

						if (error) {
							throw new Error(
								`Failed to update ${type} contact: ${error.message}`
							);
						}

						updatedContacts.push(contactResult);
						return contactResult;
					})
				);

				// Update practice location
				const practiceLocationData = {
					legal_business_name: data.legal_business_name,
					doing_business_name: data.doing_business_name || null,
					npi_2: data.npi_2 || null,
					tax_id: data.tax_id || null,
					taxonomy_code_1: data.taxonomy_code_1 || null,
					taxonomy_code_2: data.taxonomy_code_2 || null,
					ptan_medicare_number: data.ptan_medicare_number || null,
					medicaid_number: data.medicaid_number || null,
				};

				const { data: practiceLocationResult, error } = await supabase
					.from("practice_locations")
					.update(practiceLocationData)
					.eq("uuid", locationId)
					.select()
					.single();

				if (error) {
					throw new Error(
						`Failed to update practice location: ${error.message}`
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
				throw error;
			}
		} catch (error) {
			throw error;
		}
	} catch (error) {
		console.error("Error in PUT handler:", error);
		return new Response(
			JSON.stringify({
				error: "Failed to update practice location",
				details: error.message,
			}),
			{
				headers: { "Content-Type": "application/json" },
				status: 500,
			}
		);
	}
}
