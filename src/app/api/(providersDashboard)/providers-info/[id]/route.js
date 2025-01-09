import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
	try {
		const { id } = params;
		let formData = await request.formData();
		const file = formData.get("picture");
		formData = Object.fromEntries(formData);

		// Get existing provider data for IDs of table like addresses and contacts
		const { data: existingData } = await supabase
			.from("providers_info")
			.select(
				`
          home_address_id,
          service_location_address_id,
          mailing_address_id,
          contact_id,
          emergency_contact_id
        `
			)
			.eq("uuid", id)
			.single();

		// Handle picture upload
		let pictureData = {};
		if (file && file.size > 0) {
			const fileBuffer = await file.arrayBuffer();
			const buffer = Buffer.from(fileBuffer);
			const base64File = buffer.toString("base64");
			const dataURI = `data:${file.type};base64,${base64File}`;

			const uploadResponse = await cloudinary.uploader.upload(dataURI, {
				folder: "providers-profiles",
				resource_type: "auto",
			});

			pictureData = {
				picture_url: uploadResponse.secure_url,
				picture_public_id: uploadResponse.public_id,
			};
		}

		// Update all related records
		const updates = await Promise.all([
			// Update addresses
			supabase
				.from("addresses")
				.update({
					address_line_1: formData.homeAddress1,
					address_line_2: formData.homeAddress2,
					city: formData.homeCity,
					state: formData.homeState,
					zip_code: formData.homeZipCode,
				})
				.eq("uuid", existingData.home_address_id),

			supabase
				.from("addresses")
				.update({
					address_line_1: formData.serviceAddress1,
					address_line_2: formData.serviceAddress2,
					city: formData.serviceCity,
					state: formData.serviceState,
					zip_code: formData.serviceZipCode,
				})
				.eq("uuid", existingData.service_location_address_id),

			supabase
				.from("addresses")
				.update({
					address_line_1: formData.mailingAddress1,
					address_line_2: formData.mailingAddress2,
					city: formData.mailingCity,
					state: formData.mailingState,
					zip_code: formData.mailingZipCode,
				})
				.eq("uuid", existingData.mailing_address_id),

			// Update contacts
			supabase
				.from("contacts")
				.update({
					home_phone: formData.homePhone,
					cell_phone: formData.cellPhone,
					email: formData.personalEmail,
					work_email: formData.workEmail,
				})
				.eq("uuid", existingData.contact_id),

			supabase
				.from("contacts")
				.update({
					contact_name: formData.emergencyContactName,
					relation: formData.emergencyContactRelation,
					cell_phone: formData.emergencyContactPhone,
					email: formData.emergencyContactEmail,
				})
				.eq("uuid", existingData.emergency_contact_id),
		]);

		// Update provider info
		const { data: provider, error } = await supabase
			.from("providers_info")
			.update({
				first_name: formData.firstName,
				middle_initial: formData.middleInitial,
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
				...pictureData,
			})
			.eq("uuid", id)
			.select()
			.single();

		if (error) throw error;

		return NextResponse.json({
			message: "Provider updated successfully",
			provider_id: provider.uuid,
		});
	} catch (error) {
		console.error("Update error:", error);
		return NextResponse.json(
			{
				error: "Failed to update provider",
				details: error.message,
			},
			{ status: 500 }
		);
	}
}
