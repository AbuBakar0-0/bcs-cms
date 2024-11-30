// app/api/specialities/[id]/route.js

import { supabase } from "@/lib/supabase";

export async function DELETE(request, { params }) {
	try {
		const { id } = params;

		const { data: speciality } = await supabase
			.from("speciality")
			.select("address_id")
			.eq("uuid", id)
			.single();

		if (speciality?.address_id) {
			const { error: addressError } = await supabase
				.from("addresses")
				.delete()
				.eq("uuid", speciality.address_id);

			if (addressError) throw addressError;
		}

		const { error: specialityError } = await supabase
			.from("speciality")
			.delete()
			.eq("uuid", id);

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
			}),
			{ status: 500 }
		);
	}
}

export async function PUT(request, { params }) {
	try {
		const { id } = params;
		const formData = await request.json();

		if (formData.address_line_1) {
			const { data: speciality } = await supabase
				.from("speciality")
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
			}
		}

		const { error: specialityError } = await supabase
			.from("speciality")
			.update({
				name: formData.speciality,
				is_board_certified: formData.is_board_certified,
				name_of_board: formData.name_of_board,
				effective_date: formData.start_date,
				expiry_date: formData.end_date,
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
			}),
			{ status: 500 }
		);
	}
}
