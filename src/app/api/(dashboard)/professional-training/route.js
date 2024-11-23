import { supabase } from "@/lib/supabase";

export async function GET() {
	try {
		const { data: trainingData, error: trainingError } = await supabase.from(
			"professional_training"
		).select(`
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

		if (trainingError) throw trainingError;

		const formattedData = trainingData.map((training) => ({
			...training,
			country: training.addresses?.country,
			state: training.addresses?.state,
			county: training.addresses?.county,
			addresses: undefined,
		}));

		return new Response(JSON.stringify(formattedData), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Error fetching professional training:", error);
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
			})
			.select()
			.single();

		if (error) throw error;

		return new Response(JSON.stringify(data), { status: 201 });
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

		const { data: addressUsage, error: addressUsageError } = await supabase
			.from("professional_training")
			.select("uuid")
			.eq("address_id", trainingData.address_id);

		if (addressUsageError) throw addressUsageError;

		const { error: addressDeleteError } = await supabase
			.from("addresses")
			.delete()
			.eq("uuid", trainingData.address_id);

		if (addressDeleteError) throw addressDeleteError;

		const { error: deleteError } = await supabase
			.from("professional_training")
			.delete()
			.eq("uuid", id);

		if (deleteError) throw deleteError;

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
			.select()
			.single();

		if (error) throw error;

		return new Response(JSON.stringify(data), { status: 200 });
	} catch (error) {
		console.error("Error updating entry:", error);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
		});
	}
}
