import { supabase } from "@/lib/supabase";
import insertAddress from "../util";

export async function POST(request) {
	try {
		const formData = await request.json();

		const homeAddress = await insertAddress(formData,"Location");

		// Inserting Provider Information
		const { data: speciality, error: specialityError } = await supabase
			.from("speciality")
			.insert({
                name: formData.speciality,
                is_board_certified:formData.is_board_certified,
                name_of_board:formData.name_of_board,
                address_id: homeAddress?.uuid,
                effective_date:formData.effective_date,
                expiry_date:formData.expiry_date,
                type:formData.type
			})
			.select("uuid")
			.single();

		if (specialityError) throw specialityError;
		console.log(speciality);
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
    // Fetching all specialities from the 'speciality' table
    const { data, error } = await supabase
      .from("speciality")
      .select("uuid, name, is_board_certified, name_of_board, effective_date, expiry_date, type, address_id")

    if (error) throw error;

    // Check if the data is an array
    if (!Array.isArray(data)) {
      return new Response(
        JSON.stringify({
          message: "Expected an array of specialities, but received something else.",
          data: data,
        }),
        { status: 500 }
      );
    }

    // You can now safely map through the array
    const specialities = data.map(item => ({
      id: item.uuid,
      name: item.name,
      isBoardCertified: item.is_board_certified,
      boardName: item.name_of_board,
      effectiveDate: item.effective_date,
      expiryDate: item.expiry_date,
      type: item.type,
      addressId: item.address_id,
    }));

    // Returning the fetched and mapped data
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

