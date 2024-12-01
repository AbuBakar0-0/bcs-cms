import { supabase } from "@/lib/supabase";

export async function PUT(request, { params }) {
	try {
		const { id: uuid } = params;
		const formData = await request.json();

		const { data: existingReference, error: referenceError } = await supabase
			.from("professional_references")
			.select("address_id, contact_id")
			.eq("uuid", uuid)
			.single();

		if (referenceError) throw referenceError;

		if (existingReference.address_id) {
			const { error: addressError } = await supabase
				.from("addresses")
				.update({
					address_line_1: formData.address_line_1,
					address_line_2: formData.address_line_2,
					city: formData.city,
					state: formData.state,
					zip_code: formData.zip_code,
					country: formData.country || "USA",
				})
				.eq("uuid", existingReference.address_id);

			if (addressError) throw addressError;
		} else {
			const homeAddress = await insertAddress(formData, "Location");
			existingReference.address_id = homeAddress?.uuid;
		}

		if (existingReference.contact_id) {
			const { error: contactError } = await supabase
				.from("contacts")
				.update({
					cell_phone: formData.cell_phone,
					fax: formData.fax,
					email: formData.email,
				})
				.eq("uuid", existingReference.contact_id);

			if (contactError) throw contactError;
		} else {
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
			existingReference.contact_id = contact?.uuid;
		}

		const { error: updateReferenceError } = await supabase
			.from("professional_references")
			.update({
				provider_type: formData.provider_type,
				first_name: formData.first_name,
				middle_initial: formData.middle_initial,
				last_name: formData.last_name,
				address_id: existingReference.address_id,
				contact_id: existingReference.contact_id,
			})
			.eq("uuid", uuid);

		if (updateReferenceError) throw updateReferenceError;

		return new Response(
			JSON.stringify({
				message: "Reference updated successfully",
			}),
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating reference:", error);
		return new Response(
			JSON.stringify({
				message: "Error updating reference",
				error: error.message,
			}),
			{ status: 500 }
		);
	}
}

export async function DELETE(request, { params }) {
	try {
		const { id: uuid } = params;

		const { data: existingReference, error: checkError } = await supabase
			.from("professional_references")
			.select("address_id, contact_id, deleted_at")
			.eq("uuid", uuid)
			.single();

		if (checkError) throw checkError;

		if (!existingReference) {
			return new Response(
				JSON.stringify({
					error: "Reference not found",
				}),
				{ status: 404 }
			);
		}

		if (existingReference.deleted_at) {
			return new Response(
				JSON.stringify({
					error: "Reference is already deleted",
				}),
				{ status: 400 }
			);
		}

		const currentTime = new Date().toISOString();

		const { error: deleteReferenceError } = await supabase
			.from("professional_references")
			.update({ deleted_at: currentTime })
			.eq("uuid", uuid);

		if (deleteReferenceError) throw deleteReferenceError;

		if (existingReference.address_id) {
			await supabase
				.from("addresses")
				.update({ deleted_at: currentTime })
				.eq("uuid", existingReference.address_id);
		}

		if (existingReference.contact_id) {
			await supabase
				.from("contacts")
				.update({ deleted_at: currentTime })
				.eq("uuid", existingReference.contact_id);
		}

		return new Response(
			JSON.stringify({
				message: "Reference soft deleted successfully",
			}),
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error deleting reference:", error);
		return new Response(
			JSON.stringify({
				message: "Error deleting reference",
				error: error.message,
			}),
			{ status: 500 }
		);
	}
}
