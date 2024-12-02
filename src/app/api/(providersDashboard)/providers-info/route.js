import { supabase } from "@/lib/supabase";

export async function POST(request) {
	try {
		const formData = await request.json();

		const { data: homeAddress, error: homeAddressError } = await supabase
			.from("addresses")
			.insert({
				address_line_1: formData.homeAddress1,
				address_line_2: formData.homeAddress2,
				city: formData.homeCity,
				state: formData.homeState,
				country: "USA",
				zip_code: formData.homeZipCode,
			})
			.select("uuid")
			.single();

		if (homeAddressError) throw homeAddressError;

		// Inserting Service Location Address
		const { data: serviceAddress, error: serviceAddressError } = await supabase
			.from("addresses")
			.insert({
				address_line_1: formData.serviceAddress1,
				address_line_2: formData.serviceAddress2,
				city: formData.serviceCity,
				state: formData.serviceState,
				country: "USA",
				zip_code: formData.serviceZipCode,
			})
			.select("uuid")
			.single();

		if (serviceAddressError) throw serviceAddressError;

		// Inserting Mailing Address
		const { data: mailingAddress, error: mailingAddressError } = await supabase
			.from("addresses")
			.insert({
				address_line_1: formData.mailingAddress1,
				address_line_2: formData.mailingAddress2,
				city: formData.mailingCity,
				state: formData.mailingState,
				country: "USA",
				zip_code: formData.mailingZipCode,
			})
			.select("uuid")
			.single();

		if (mailingAddressError) throw mailingAddressError;

		const { data: contact, error: contactError } = await supabase
			.from("contacts")
			.insert({
				home_phone: formData.homePhone,
				cell_phone: formData.cellPhone,
				email: formData.personalEmail,
				work_email: formData.workEmail,
			})
			.select("uuid")
			.single();
		if (contactError) throw contactError;
		console.log(formData.emergencyContactRelation, " ---------------- -- ");
		// Inserting Emergency Contact
		const { data: emergencyContact, error: emergencyContactError } =
			await supabase
				.from("contacts")
				.insert({
					contact_name: formData.emergencyContactName,
					relation: formData.emergencyContactRelation,
					cell_phone: formData.emergencyContactPhone,
					email: formData.emergencyContactEmail,
				})
				.select("uuid")
				.single();

		if (emergencyContactError) throw emergencyContactError;

		// Inserting Provider Information
		const { data: provider, error: providerError } = await supabase
			.from("providers_info")
			.insert({
				first_name: formData.firstName,
				middle_initial: formData.middleInitial,
				added_by: formData.added_by,
				last_name: formData.lastName,
				provider_title: formData.providerTitle,
				ssn: formData.ssn,
				gender: formData.gender,
				birth_city: formData.birthCity,
				birth_state: formData.birthState,
				birth_country: formData.birthCountry,
				dob: formData.dob,
				license_id: formData.licenseOrId,
				state_issued: formData.licenseStateIssued,
				issue_date: formData.licenseIssuedDate,
				expiry_date: formData.licenseExpiryDate,
				home_address_id: homeAddress?.uuid,
				service_location_address_id: serviceAddress?.uuid,
				mailing_address_id: mailingAddress?.uuid,
				emergency_contact_id: emergencyContact?.uuid,
				contact_id: contact?.uuid,
			})
			.select("uuid")
			.single();

		if (providerError) throw providerError;
		console.log(provider);
		// return new Response(null, {
		// 	status: 303,
		// 	headers: {
		// 		Location: `/providersInformation/${provider?.uuid}`,
		// 	},
		// });

		return new Response(
			JSON.stringify({
				message: "Provider information saved successfully",
				provider_id: provider?.uuid,
			}),
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error saving provider information:", error);
		return new Response(
			JSON.stringify({
				message: "Provider information saved successfully",
				provider_id: provider?.uuid,
			}),
			{ status: 201 }
		);
	}
}

export async function GET(request) {
	try {
		// Extract UUID from query parameters
		const { searchParams } = new URL(request.url);
		const uuid = searchParams.get("uuid");

		if (!uuid) {
			return new Response(JSON.stringify({ message: "UUID is required" }), {
				status: 400,
			});
		}

		// Use joins to fetch related data from the tables
		const { data, error } = await supabase
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
        expiry_date,
        added_by,
        birth_city,
        birth_state,
        birth_country,
        home_address:home_address_id (
          uuid,
          address_line_1,
          address_line_2,
          city,
          state,
          country,
          zip_code
        ),
        service_address:service_location_address_id (
          uuid,
          address_line_1,
          address_line_2,
          city,
          state,
          country,
          zip_code
        ),
        mailing_address:mailing_address_id (
          uuid,
          address_line_1,
          address_line_2,
          city,
          state,
          country,
          zip_code
        ),
        emergency_contact:emergency_contact_id (
          uuid,
          contact_name,
          relation,
          cell_phone,
          email
        ),
        contact:contact_id (
          uuid,
          home_phone,
          cell_phone,
          email,
          work_email
        )
      `
			)
			.eq("uuid", uuid)
			.single();

		if (error) throw error;

		// Return the response with the joined data
		return new Response(JSON.stringify(data), { status: 200 });
	} catch (error) {
		console.error("Error retrieving provider information:", error);
		return new Response(
			JSON.stringify({
				message: "Failed to retrieve provider information",
				error: error.message || "Unknown error",
			}),
			{ status: 500 }
		);
	}
}

// export async function GET() {
// 	try {
// 		const { data: providers, error: providersError } = await supabase
// 			.from("providers_info")
// 			.select(
// 				`
// 		  uuid,
// 		  first_name,
// 		  middle_initial,
// 		  last_name,
// 		  provider_title,
// 		  ssn,
// 		  gender,
// 		  dob,
// 		  license_id,
// 		  state_issued,
// 		  issue_date,
// 		  expiry_date
// 		`
// 			);
// 		if (providersError) throw providersError;

// 		return new Response(
// 			JSON.stringify({
// 				message: "Provider information saved successfully",
// 				provider: providers,
// 			}),
// 			{ status: 201 }
// 		);
// 	} catch (error) {
// 		console.error("Error fetching providers:", error);
// 		return new Response(
// 			JSON.stringify({ error: error.message || "Failed to fetch providers" }),
// 			{ status: 404 }
// 		);
// 	}
// }
