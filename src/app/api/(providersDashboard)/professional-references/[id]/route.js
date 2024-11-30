import { supabase } from "@/lib/supabase";

export async function PUT(request, { params }) {
	try {
		const { id: uuid } = params;
		const formData = await request.json();

		// Get existing reference data
		const { data: existingReference, error: referenceError } = await supabase
			.from("professional_references")
			.select("address_id, contact_id")
			.eq("uuid", uuid)
			.single();

		if (referenceError) throw referenceError;

		// Update or create address
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

		// Update or create contact
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

		// Update professional reference
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

		// Get reference details before deletion
		const { data: reference, error: referenceError } = await supabase
			.from("professional_references")
			.select("address_id, contact_id")
			.eq("uuid", uuid)
			.single();

		if (referenceError) throw referenceError;

		// Delete professional reference
		const { error: deleteReferenceError } = await supabase
			.from("professional_references")
			.delete()
			.eq("uuid", uuid);

		if (deleteReferenceError) throw deleteReferenceError;

		// Delete associated address if exists
		if (reference.address_id) {
			await supabase
				.from("addresses")
				.delete()
				.eq("uuid", reference.address_id);
		}

		// Delete associated contact if exists
		if (reference.contact_id) {
			await supabase.from("contacts").delete().eq("uuid", reference.contact_id);
		}

		return new Response(
			JSON.stringify({
				message: "Reference deleted successfully",
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
