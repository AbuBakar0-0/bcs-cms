import insertAddress from "@/hooks/insertAddress";
import { supabase } from "@/lib/supabase";

export async function POST(request) {
    try {
        const formData = await request.json();

        const address = await insertAddress(formData);

        const { data: speciality, error: specialityError } = await supabase
            .from("specialities")
            .insert({
                name: formData.speciality,
                is_board_certified: formData.is_board_certified,
                name_of_board: formData.name_of_board,
                address_id: address?.uuid,
                effective_date: formData.effective_date,
                expiry_date: formData.expiry_date || null, // Use null instead of an empty string
                type: formData.type,
                provider_id: formData.provider_id,
                deleted_at: null,
            })
            .select("uuid")
            .single();

        if (specialityError) throw specialityError;

        return new Response(
            JSON.stringify({
                message: "Speciality saved successfully",
                speciality_id: speciality?.uuid,
            }),
            { status: 201 }
        );
    } catch (error) {
        console.error("Error saving Speciality:", error);
        return new Response(
            JSON.stringify({
                message: "Error Saving Speciality",
            }),
            { status: 500 }
        );
    }
}



export async function GET(request) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const provider_id = searchParams.get("provider_id");

		const { data, error } = await supabase
			.from("specialities")
			.select(
				`
		  uuid,
		  name,
		  is_board_certified,
		  name_of_board,
		  effective_date,
		  expiry_date,
		  type,
		  address_id,
		  location:address_id (
			uuid,
			address_line_1,
			address_line_2,
			city,
			state,
			zip_code,
			country,
			deleted_at
		  )
		`
			)
			.eq("provider_id", provider_id)
			.is("deleted_at", null);

		if (error) throw error;

		if (!Array.isArray(data)) {
			return new Response(
				JSON.stringify({
					message:
						"Expected an array of specialities, but received something else.",
					data: data,
				}),
				{ status: 500 }
			);
		}

		const specialities = data.map((item) => ({
			uuid: item.uuid,
			name: item.name,
			isBoardCertified: item.is_board_certified,
			boardName: item.name_of_board,
			effectiveDate: item.effective_date,
			expiryDate: item.expiry_date,
			type: item.type,
			addressId: item.address_id,
			address:
				item.location && !item.location.deleted_at
					? {
							id: item.location.uuid,
							addressLine1: item.location.address_line_1,
							addressLine2: item.location.address_line_2,
							city: item.location.city,
							state: item.location.state,
							zipCode: item.location.zip_code,
							country: item.location.country,
					  }
					: null,
		}));

		return new Response(
			JSON.stringify({
				message: "Specialities fetched successfully",
				data: specialities,
			}),
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching Specialities:", error);
		return new Response(
			JSON.stringify({
				message: "Error Fetching Specialities",
			}),
			{ status: 500 }
		);
	}
}
