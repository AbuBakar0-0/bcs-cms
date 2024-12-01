import { supabase } from "@/lib/supabase";

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);
		const provider_id = searchParams.get("provider_id");

		// Validate provider_id
		if (!provider_id) {
			throw new Error("Provider ID is required.");
		}

		const { data: educationData, error: educationError } = await supabase
			.from("professional_trainings")
			.select(
				`
		  *,
		  addresses (
			country,
			state,
			county
		  )
		  `
			)
			.eq("provider_id", provider_id)
			.is("deleted_at", null);

		// Handle any errors from the Supabase query
		if (educationError) {
			throw new Error(educationError.message);
		}

		// Return the fetched data as JSON
		return new Response(JSON.stringify(educationData), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
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
		// Parse the incoming JSON request body
		const body = await request.json();

		const address = {
			country: body.country,
			state: body.state,
			county: body.county,
		};
		// Insert address data first and get the generated address_id
		const { data: addressInsertData, error: addressInsertError } =
			await supabase.from("addresses").insert(address).select("uuid").single();

		if (addressInsertError) {
			throw new Error(
				`Failed to insert address: ${addressInsertError.message}`
			);
		}

		const address_id = addressInsertData.uuid;

		const training = {
			training_type: body.training_type,
			hospital_name: body.hospital_name,
			affiliated_university: body.affiliated_university,
			email: body.email,
			start_date: body.start_date,
			end_date: body.end_date,
			type_of_program: body.type_of_program,
			department: body.department,
			speciality: body.speciality,
			is_completed: body.is_completed,
			provider_id: body.provider_id,
			address_id: address_id,
		};

		// Insert professional training data with the linked address_id
		const { data: trainingInsertData, error: trainingInsertError } =
			await supabase
				.from("professional_trainings")
				.insert(training)
				.select()
				.single();

		if (trainingInsertError) {
			throw new Error(
				`Failed to insert professional training: ${trainingInsertError.message}`
			);
		}

		return new Response(JSON.stringify(trainingInsertData), {
			status: 201, // Status 201 for created
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		// Return the error message as a JSON response
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}

export async function DELETE(request) {
	try {
		const { id } = await request.json();
		const currentTimestamp = new Date().toISOString();

		// Check if training exists and isn't already deleted
		const { data: trainingData, error: trainingError } = await supabase
			.from("professional_trainings")
			.select("uuid, address_id")
			.eq("uuid", id)
			.is("deleted_at", null)
			.single();

		if (trainingError || !trainingData) {
			return new Response(
				JSON.stringify({
					error: "Training entry not found or already deleted",
				}),
				{ status: 404 }
			);
		}

		// Soft delete the training entry
		const { error: softDeleteError } = await supabase
			.from("professional_trainings")
			.update({ deleted_at: currentTimestamp })
			.eq("uuid", id);

		if (softDeleteError) throw softDeleteError;

		// Check if address is still being used by other non-deleted training entries
		const { data: addressUsage, error: addressUsageError } = await supabase
			.from("professional_trainings")
			.select("uuid")
			.eq("address_id", trainingData.address_id)
			.is("deleted_at", null);

		if (addressUsageError) throw addressUsageError;

		// Check if address is being used by non-deleted education entries
		const { data: educationAddressUsage, error: educationAddressError } =
			await supabase
				.from("educations")
				.select("uuid")
				.eq("address_id", trainingData.address_id)
				.is("deleted_at", null);

		if (educationAddressError) throw educationAddressError;

		if (addressUsage.length === 0 && educationAddressUsage.length === 0) {
			const { error: addressSoftDeleteError } = await supabase
				.from("addresses")
				.update({ deleted_at: currentTimestamp })
				.eq("uuid", trainingData.address_id);
			if (addressSoftDeleteError) throw addressSoftDeleteError;
		}

		return new Response(
			JSON.stringify({
				message: "Training entry and related data soft deleted successfully",
			}),
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error soft deleting entry:", error);
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
