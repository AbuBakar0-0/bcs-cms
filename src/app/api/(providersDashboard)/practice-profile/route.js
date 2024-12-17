import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {

    // Extract the provider_id parameter from the request URL
    const searchParams = request.nextUrl.searchParams;
    const provider_id = searchParams.get("uuid");

    if (!provider_id) {
      return NextResponse.json(
        { error: "Missing required parameter: provider_id" },
        { status: 400 }
      );
    }

    // Query practice_profiles table for basic profile data
    const { data: practiceData, error: practiceError } = await supabase
      .from("practice_profiles")
      .select(`
        uuid,
        provider_id,
        practice_type,
        type_of_service_provided,
        credentialing_type,
        npi_2,
        tax_id,
        legal_business_name,
        doing_business_name,
        taxonomy_code_1,
        taxonomy_code_2,
        ptan_medicare_number,
        medicaid_number,
        start_date,
        service_address_id,
        mailing_address_id,
        correspondance_address_id,
        service_contact_id,
        mailing_contact_id,
        correspondance_contact_id,
		practice_contact_id
      `)
      .eq("provider_id", provider_id);

    if (practiceError) throw practiceError;

    // If practice profile data is empty
    if (!practiceData || practiceData.length === 0) {
      return NextResponse.json({ message: "No Data Found" }, { status: 200 });
    }

    // Get address and contact details
    const profile = practiceData[0]; // Assume single profile is returned

    const addressQueries = [
      supabase.from("addresses").select("*").eq("uuid", profile.service_address_id),
      supabase.from("addresses").select("*").eq("uuid", profile.mailing_address_id),
      supabase.from("addresses").select("*").eq("uuid", profile.correspondance_address_id),
    ];

    const contactQueries = [
      supabase.from("contacts").select("*").eq("uuid", profile.service_contact_id),
      supabase.from("contacts").select("*").eq("uuid", profile.mailing_contact_id),
      supabase.from("contacts").select("*").eq("uuid", profile.correspondance_contact_id),
	  supabase.from("contacts").select("*").eq("uuid", profile.practice_contact_id),
    ];


    // Execute all address and contact queries in parallel
    const [serviceAddress, mailingAddress, correspondenceAddress] = await Promise.all(addressQueries);
    const [serviceContact, mailingContact, correspondenceContact, practiceContact] = await Promise.all(contactQueries);

    if (serviceAddress.error || mailingAddress.error || correspondenceAddress.error) {
      throw new Error("Error fetching address data");
    }
    if (serviceContact.error || mailingContact.error || correspondenceContact.error) {
      throw new Error("Error fetching contact data");
    }

    const responseData = {
      ...profile,
      service_address: serviceAddress.data[0] || null,
      mailing_address: mailingAddress.data[0] || null,
      correspondence_address: correspondenceAddress.data[0] || null,
      service_contact: serviceContact.data[0] || null,
      mailing_contact: mailingContact.data[0] || null,
      correspondence_contact: correspondenceContact.data[0] || null,
	  practice_contact:practiceContact.data[0]||null,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error in GET handler:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
	const formData = await req.json();
	const { provider_id } = formData;
	try {
		const { data: serviceAddress, error: serviceAddressError } = await supabase
			.from("addresses")
			.insert({
				address_line_1: formData.service_address1,
				address_line_2: formData.service_address2,
				city: formData.service_city,
				state: formData.service_state,
				zip_code: formData.service_zipcode,
				type: "service",
			})
			.select("uuid")
			.single();

		if (serviceAddressError) {
			console.error("Service Address Error:", serviceAddressError);
			throw new Error(`Service Address Error: ${serviceAddressError.message}`);
		}
		console.log("Service Address created:", serviceAddress);

		const { data: serviceContact, error: serviceContactError } = await supabase
			.from("contacts")
			.insert({
				contact_name: formData.practice_contact_name,
				home_phone: formData.service_phone,
				cell_phone: formData.service_appointment_phone,
				fax: formData.service_fax,
				email: formData.service_email,
				work_email: formData.service_email,
				relation: "service",
			})
			.select("uuid")
			.single();

		if (serviceContactError) {
			console.error("Service Contact Error:", serviceContactError);
			throw new Error(`Service Contact Error: ${serviceContactError.message}`);
		}
		console.log("Service Contact created:", serviceContact);

		const { data: mailingAddress, error: mailingAddressError } = await supabase
			.from("addresses")
			.insert({
				address_line_1: formData.mailing_address1,
				address_line_2: formData.mailing_address2,
				city: formData.mailing_city,
				state: formData.mailing_state,
				zip_code: formData.mailing_zipcode,
				type: "mailing",
			})
			.select("uuid")
			.single();

		if (mailingAddressError) {
			console.log(mailingAddressError);
			throw mailingAddressError;
		}
		console.log("mailingAddress created:", mailingAddress);

		const { data: mailingContact, error: mailingContactError } = await supabase
			.from("contacts")
			.insert({
				contact_name: formData.practice_contact_name,
				home_phone: formData.mailing_phone,
				fax: formData.mailing_fax,
				email: formData.mailing_email,
				work_email: formData.mailing_email,
				relation: "mailing",
			})
			.select("uuid")
			.single();

		if (mailingContactError) {
			console.log(mailingContactError);
			throw mailingContactError;
		}
		console.log("mailingContact created:", mailingContact);

		const { data: correspondenceAddress, error: correspondenceAddressError } =
			await supabase
				.from("addresses")
				.insert({
					address_line_1: formData.correspondence_address1,
					address_line_2: formData.correspondence_address2,
					city: formData.correspondence_city,
					state: formData.correspondence_state,
					zip_code: formData.correspondence_zipcode,
					type: "correspondence",
				})
				.select("uuid")
				.single();

		if (correspondenceAddressError) {
			console.log(correspondenceAddressError);
			throw correspondenceAddressError;
		}
		console.log("correspondenceAddress created:", correspondenceAddress);

		const { data: correspondenceContact, error: correspondenceContactError } =
			await supabase
				.from("contacts")
				.insert({
					contact_name: formData.practice_contact_name,
					home_phone: formData.correspondence_phone,
					fax: formData.correspondence_fax,
					email: formData.correspondence_email,
					work_email: formData.correspondence_email,
					relation: "correspondence",
				})
				.select("uuid")
				.single();

		if (correspondenceContactError) {
			console.log(correspondenceContactError);
			throw correspondenceContactError;
		}
		console.log("correspondenceContact created:", correspondenceContact);

		const { data: practiceContact, error: practiceContactError } =
			await supabase
				.from("contacts")
				.insert({
					contact_name: formData.practice_contact_name,
					work_email: formData.practice_contact_email,
					home_phone: formData.practice_contact_work_phone,
					cell_phone: formData.practice_contact_cell_phone,
					relation: formData.practice_contact_role,
				})
				.select("uuid")
				.single();

		if (practiceContactError) {
			console.log(practiceContactError);
			throw practiceContactError;
		}
		console.log("practiceContact created:", practiceContact);

		const { data: practiceProfile, error: practiceProfileError } =
			await supabase
				.from("practice_profiles")
				.insert({
					practice_type: formData.type,
					type_of_service_provided: formData.type_of_service_provided,
					credentialing_type: formData.credentialing_type,
					npi_2: formData.npi_2,
					tax_id: formData.tax_id,
					legal_business_name: formData.legal_business_name,
					doing_business_name: formData.doing_business_name,
					taxonomy_code_1: formData.taxonomy_code_1,
					taxonomy_code_2: formData.taxonomy_code_2,
					service_address_id: serviceAddress.uuid,
					service_contact_id: serviceContact.uuid,
					mailing_address_id: mailingAddress.uuid,
					mailing_contact_id: mailingContact.uuid,
					correspondance_address_id: correspondenceAddress.uuid,
					correspondance_contact_id: correspondenceContact.uuid,
					ptan_medicare_number: formData.ptan_medicare_number,
					medicaid_number: formData.medicaid_number,
					start_date: formData.start_date,
					practice_contact_id: practiceContact.uuid,
					provider_id,
				})
				.select("")
				.single();
		console.log(practiceProfileError);
		console.log(practiceProfile);
		if (practiceProfileError) {
			console.log(practiceProfileError);
			throw practiceProfileError;
		}

		return Response.json({
			message: "Practice profile created successfully",
			data: practiceProfile,
		});
	} catch (error) {
		return Response.json(
			{ error: "Error creating practice profile" },
			{ status: 500 }
		);
	}
}
