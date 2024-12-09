import { supabase } from "@/lib/supabase";

export async function DELETE(request, { params }) {
	try {
		const { id } = await params;
		const now = new Date().toISOString();
		console.log("id---------------", id);
		const { data: speciality } = await supabase
			.from("specialities")
			.select("address_id")
			.eq("uuid", id)
			.is("deleted_at", null)
			.single();

		if (speciality?.address_id) {
			const { error: addressError } = await supabase
				.from("addresses")
				.update({ deleted_at: now })
				.eq("uuid", speciality.address_id)
				.is("deleted_at", null);

			if (addressError) throw addressError;
		}

		const { error: specialityError } = await supabase
			.from("specialities")
			.update({ deleted_at: now })
			.eq("uuid", id)
			.is("deleted_at", null);

		if (specialityError) throw specialityError;

		return new Response(
			JSON.stringify({
				message: "Speciality deleted successfully",
			}),
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error deleting speciality:", error);
		return new Response(
			JSON.stringify({
				message: "Error deleting speciality",
				error: error.message,
			}),
			{ status: 500 }
		);
	}
}

export async function PUT(request, { params }) {
	try {
		// Await params before accessing id
		const { id } = await params;
		const formData = await request.json();

		// Handle address
		if (formData.address_line_1) {
			const { data: speciality } = await supabase
				.from("specialities")
				.select("address_id")
				.eq("uuid", id)
				.single();

			if (speciality?.address_id) {
				const { error: addressError } = await supabase
					.from("addresses")
					.update({
						address_line_1: formData.address_line_1,
						address_line_2: formData.address_line_2,
						city: formData.city,
						state: formData.state,
						zip_code: formData.zip_code,
						country: formData.country,
					})
					.eq("uuid", speciality.address_id);

				if (addressError) throw addressError;
			} else {
				// Create new address if none exists
				const { data: newAddress, error: createAddressError } = await supabase
					.from("addresses")
					.insert({
						address_line_1: formData.address_line_1,
						address_line_2: formData.address_line_2,
						city: formData.city,
						state: formData.state,
						zip_code: formData.zip_code,
						country: formData.country,
					})
					.select()
					.single();

				if (createAddressError) throw createAddressError;

				// Update specialty with new address_id
				const { error: addressIdUpdateError } = await supabase
					.from("specialities")
					.update({ address_id: newAddress.uuid })
					.eq("uuid", id);

				if (addressIdUpdateError) throw addressIdUpdateError;
			}
		}

		// Update specialty
		const { error: specialityError } = await supabase
			.from("specialities")
			.update({
				name: formData.speciality,
				is_board_certified: formData.is_board_certified,
				name_of_board: formData.name_of_board,
				effective_date: formData.effective_date,
				expiry_date: formData.expiry_date,
				type: formData.type,
			})
			.eq("uuid", id);

		if (specialityError) throw specialityError;

		return new Response(
			JSON.stringify({
				message: "Speciality updated successfully",
			}),
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating speciality:", error);
		return new Response(
			JSON.stringify({
				message: "Error updating speciality",
				error: error.message,
			}),
			{ status: 500 }
		);
	}
}
