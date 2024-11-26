import { supabase } from "@/lib/supabase";

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);

		const provider_id = searchParams.get("provider_id");

		const { data: educationData, error: educationError } = await supabase
			.from("education")
			.select(
				`
				uuid,
				type,
				professional_school,
				degree,
				start_date,
				end_date,
				address_id,
				addresses (
					country,
					state,
					county
				)
				`
			)
			.eq("provider_id", provider_id);

		// Handle any errors from the Supabase query
		if (educationError) throw educationError;

		// Format the fetched data to include country, state, and county directly
		const formattedData = educationData.map((education) => ({
			...education,
			country: education.addresses?.country,
			state: education.addresses?.state,
			county: education.addresses?.county,
			addresses: undefined, // Remove the nested addresses object
		}));

		// Log formatted data for debugging
		console.log(formattedData);

		// Return the formatted data as a JSON response
		return new Response(JSON.stringify(formattedData), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		// Log the error for debugging
		console.error("Error fetching education data:", error);

		// Return the error message as a JSON response
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}

export async function POST(request) {
	try {
		const body = await request.json();
		const {
			state,
			country,
			county,
			training_type,
			hospital_name,
			affiliated_university,
			email,
			start_date,
			end_date,
			type_of_program,
			department,
			speciality,
			is_completed,
			provider_id,
		} = body;

		const { data: addressData, error: addressError } = await supabase
			.from("addresses")
			.insert({ state, country, county })
			.select()
			.single();

		if (addressError) throw addressError;

		const { data, error } = await supabase
			.from("professional_training")
			.insert({
				training_type,
				hospital_name,
				affiliated_university,
				email,
				start_date,
				end_date,
				type_of_program,
				department,
				speciality,
				is_completed,
				address_id: addressData.uuid,
				provider_id,
			})
			.select().select(`
                uuid,
                training_type,
                address_id,
                hospital_name,
                affiliated_university,
                email,
                start_date,
                end_date,
                type_of_program,
                department,
                speciality,
                is_completed,
                addresses (
                    country,
                    state,
                    county
                )
            `);

		if (error) throw error;

		const formattedResponse = {
			...data,
			country: data.addresses?.country,
			state: data.addresses?.state,
			county: data.addresses?.county,
			addresses: undefined,
		};

		return new Response(JSON.stringify(formattedResponse), { status: 201 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
		});
	}
}

export async function DELETE(request) {
	try {
		const { id } = await request.json();

		const { data: trainingData, error: trainingError } = await supabase
			.from("professional_training")
			.select("uuid, address_id")
			.eq("uuid", id)
			.single();

		if (trainingError) throw trainingError;

		if (!trainingData) {
			return new Response(
				JSON.stringify({ error: "Training entry not found" }),
				{ status: 404 }
			);
		}

		const { error: deleteTrainingError } = await supabase
			.from("professional_training")
			.delete()
			.eq("uuid", id);

		if (deleteTrainingError) throw deleteTrainingError;

		const { data: addressUsage, error: addressUsageError } = await supabase
			.from("professional_training")
			.select("uuid")
			.eq("address_id", trainingData.address_id);

		if (addressUsageError) throw addressUsageError;

		const { data: educationAddressUsage, error: educationAddressError } =
			await supabase
				.from("education")
				.select("uuid")
				.eq("address_id", trainingData.address_id);

		if (educationAddressError) throw educationAddressError;

		if (addressUsage.length === 0 && educationAddressUsage.length === 0) {
			const { error: addressDeleteError } = await supabase
				.from("addresses")
				.delete()
				.eq("uuid", trainingData.address_id);

			if (addressDeleteError) throw addressDeleteError;
		}

		return new Response(
			JSON.stringify({ message: "Training entry deleted successfully" }),
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error deleting entry:", error);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
		});
	}
}

export async function PUT(request) {
	try {
		const body = await request.json();
		const {
			id,
			state,
			country,
			county,
			training_type,
			hospital_name,
			affiliated_university,
			email,
			start_date,
			end_date,
			type_of_program,
			department,
			speciality,
			is_completed,
		} = body;

		const { data: addressData, error: addressError } = await supabase
			.from("addresses")
			.upsert({ uuid: body.address_id, state, country, county })
			.select()
			.single();

		if (addressError) throw addressError;

		const { data, error } = await supabase
			.from("professional_training")
			.update({
				training_type,
				hospital_name,
				affiliated_university,
				email,
				start_date,
				end_date,
				type_of_program,
				department,
				speciality,
				is_completed,
				address_id: addressData.uuid,
			})
			.eq("uuid", id)
			.select(
				`
                uuid,
                training_type,
                address_id,
                hospital_name,
                affiliated_university,
                email,
                start_date,
                end_date,
                type_of_program,
                department,
                speciality,
                is_completed,
                addresses (
                    country,
                    state,
                    county
                )
            `
			)
			.single();

		if (error) throw error;

		const formattedResponse = {
			...data,
			country: data.addresses?.country,
			state: data.addresses?.state,
			county: data.addresses?.county,
			addresses: undefined,
		};

		return new Response(JSON.stringify(formattedResponse), { status: 200 });
	} catch (error) {
		console.error("Error updating entry:", error);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
		});
	}
}
