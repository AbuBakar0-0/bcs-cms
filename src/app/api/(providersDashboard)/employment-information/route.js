import { supabase } from "@/lib/supabase";
import insertAddress from "../util";

export async function POST(request) {
	try {
		const formData = await request.json();
		if(formData.end_date==''){
			formData.end_date='1950-01-01';
		}
		console.log(formData);
		const { provider_id } = formData;
		const homeAddress = await insertAddress(formData, "Location");
		const { data: contact, error: contactError } = await supabase
			.from("contacts")
			.insert({
				cell_phone: formData.cell_phone,
				fax: formData.fax,
			})
			.select("uuid")
			.single();
		if (contactError) throw contactError;

		const { data: employmentInformation, error: employmentError } =
			await supabase
				.from("employment_informations")
				.insert({
					provider_id,
					legal_employer_name: formData.legal_employer_name,
					doing_business_name: formData.doing_business_name,
					department_speciality: formData.department_speciality,
					address_id: homeAddress?.uuid,
					contact_id: contact?.uuid,
					start_date: formData.start_date,
					end_date: formData.end_date,
					is_current_employer: formData.current_employer,
				})
				.select("uuid")
				.single();

		if (employmentError) throw employmentError;
		return new Response(
			JSON.stringify({
				message: "Data saved successfully",
				employment_id: employmentInformation?.uuid,
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

		const { data: contacts, error: contactError } = await supabase
			.from("contacts")
			.select("uuid, cell_phone, fax");

		if (contactError) throw contactError;

		const { data: employmentInformation, error: employmentError } =
			await supabase
				.from("employment_informations")
				.select(
					"uuid, legal_employer_name, doing_business_name, department_speciality, start_date, end_date, is_current_employer, contact_id, address_id"
				)
				.eq("provider_id", provider_id)
				.is("deleted_at", null);

		if (employmentError) throw employmentError;

		const { data: addresses, error: addressError } = await supabase
			.from("addresses")
			.select(
				"uuid, address_line_1, address_line_2, country, city, state, zip_code"
			);

		if (addressError) throw addressError;

		const fullData = employmentInformation.map((employment) => {
			const contact = contacts.find(
				(contact) => contact.uuid === employment.contact_id
			);
			const address = addresses.find(
				(address) => address.uuid === employment.address_id
			);

			return {
				...employment,
				contact: contact ? contact : null,
				address: address ? address : null,
			};
		});

		return new Response(
			JSON.stringify({
				message: "Data fetched successfully",
				data: fullData,
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
export async function DELETE(request) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");

		if (!id) {
			return Response.json({ message: "ID is required" }, { status: 400 });
		}

		const { data: employment, error: fetchError } = await supabase
			.from("employment_informations")
			.select("uuid, contact_id, address_id, deleted_at")
			.eq("uuid", id)
			.single();

		if (fetchError) throw fetchError;

		if (!employment) {
			return Response.json(
				{ message: "Employment record not found" },
				{ status: 404 }
			);
		}

		if (employment.deleted_at) {
			return Response.json(
				{ message: "Employment record is already deleted" },
				{ status: 400 }
			);
		}

		const currentTime = new Date().toISOString();

		const updates = [];

		updates.push(
			supabase
				.from("employment_informations")
				.update({ deleted_at: currentTime })
				.eq("uuid", id)
		);

		if (employment.contact_id) {
			updates.push(
				supabase
					.from("contacts")
					.update({ deleted_at: currentTime })
					.eq("uuid", employment.contact_id)
			);
		}

		if (employment.address_id) {
			updates.push(
				supabase
					.from("addresses")
					.update({ deleted_at: currentTime })
					.eq("uuid", employment.address_id)
			);
		}

		const results = await Promise.all(updates);

		const errors = results.filter((result) => result.error);
		if (errors.length > 0) {
			throw new Error(
				`Error in batch updates: ${errors
					.map((e) => e.error.message)
					.join(", ")}`
			);
		}

		return Response.json(
			{
				message: "Employment record and related data soft deleted successfully",
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error deleting employment record:", error);
		return Response.json(
			{ message: "Error deleting employment record", error: error.message },
			{ status: 500 }
		);
	}
}

export async function PUT(request) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");
		const formData = await request.json();

		if (!id) {
			return Response.json({ message: "ID is required" }, { status: 400 });
		}

		const { data: existing, error: fetchError } = await supabase
			.from("employment_informations")
			.select("contact_id, address_id")
			.eq("uuid", id)
			.single();

		if (fetchError) throw fetchError;

		const { error: addressError } = await supabase
			.from("addresses")
			.update({
				address_line_1: formData.address_line_1,
				address_line_2: formData.address_line_2,
				country: formData.country,
				city: formData.city,
				state: formData.state,
				zip_code: formData.zip_code,
			})
			.eq("uuid", existing.address_id);

		if (addressError) throw addressError;

		const { error: contactError } = await supabase
			.from("contacts")
			.update({
				cell_phone: formData.cell_phone,
				fax: formData.fax,
			})
			.eq("uuid", existing.contact_id);

		if (contactError) throw contactError;

		const { data: employment, error: employmentError } = await supabase
			.from("employment_informations")
			.update({
				legal_employer_name: formData.legal_employer_name,
				doing_business_name: formData.doing_business_name,
				department_speciality: formData.department_speciality,
				start_date: formData.start_date,
				end_date: formData.end_date,
				is_current_employer: formData.current_employer === "Yes",
			})
			.eq("uuid", id)
			.select()
			.single();

		if (employmentError) throw employmentError;

		return Response.json(
			{
				message: "Employment record updated successfully",
				data: employment,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating employment record:", error);
		return Response.json(
			{ message: "Error updating employment record" },
			{ status: 500 }
		);
	}
}
