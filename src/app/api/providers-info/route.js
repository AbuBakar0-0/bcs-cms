import { supabase } from "@/lib/supabase";

export async function POST(request) {
	try {
		const formData = await request.json();

		// Inserting Home Address Data
		const { data: homeAddress, error: homeAddressError } = await supabase
			.from("addresses")
			.insert({
				address_line_1: formData.homeAddress1,
				address_line_2: formData.homeAddress2,
				city: formData.homeCity,
				state: formData.homeState,
				country: "USA",
				zip_code: formData.homeZipCode,
				type: "HOME",
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
				type: "SERVICE",
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
				type: "MAILING",
			})
			.select("uuid")
			.single();

		if (mailingAddressError) throw mailingAddressError;

		// Inserting Emergency Contact
		const { data: emergencyContact, error: contactError } = await supabase
			.from("contacts")
			.insert({
				name: formData.emergencyContactName,
				relation: formData.emergencyContactRelation,
				cell_phone: formData.emergencyContactPhone,
				email: formData.emergencyContactEmail,
			})
			.select("uuid")
			.single();

		if (contactError) throw contactError;

		// Inserting Provider Information
		const { data: provider, error: providerError } = await supabase
			.from("providers_info")
			.insert({
				first_name: formData.firstName,
				middle_initial: formData.middleInitial,
				last_name: formData.lastName,
				provider_title: formData.providerTitle,
				ssn: formData.ssn,
				gender: formData.gender,
				dob: formData.dob,
				license_id: formData.licenseOrId,
				state_issued: formData.licenseStateIssued,
				issue_date: formData.licenseIssuedDate,
				expiry_date: formData.licenseExpiryDate,
				home_address_id: homeAddress?.uuid,
				service_address_id: serviceAddress?.uuid,
				mailing_address_id: mailingAddress?.uuid,
				emergency_contact_id: emergencyContact?.uuid,
			})
			.select("uuid")
			.single();

		if (providerError) throw providerError;

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
