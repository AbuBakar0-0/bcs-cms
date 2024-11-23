import { supabase } from "@/lib/supabase";

export async function GET() {
	try {
		const { data: educationData, error: educationError } = await supabase.from(
			"education"
		).select(`
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
		`);

		if (educationError) throw educationError;

		const formattedData = educationData.map((education) => ({
			...education,
			country: education.addresses?.country,
			state: education.addresses?.state,
			county: education.addresses?.county,
			addresses: undefined,
		}));

		return new Response(JSON.stringify(formattedData), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
		});
	}
}

export async function POST(request) {
	try {
		const body = await request.json();
		const { state, country, county, ...educationData } = body;

		const { data: addressData, error: addressError } = await supabase
			.from("addresses")
			.insert({ state, country, county })
			.select()
			.single();

		if (addressError) throw addressError;

		const { data, error } = await supabase
			.from("education")
			.insert({
				type: educationData.type,
				professional_school: educationData.professional_school,
				degree: educationData.degree,
				start_date: educationData.start_date,
				end_date: educationData.end_date,
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

		const { data: educationData, error: educationError } = await supabase
			.from("education")
			.select("uuid, address_id")
			.eq("uuid", id)
			.single();

		if (educationError) throw educationError;

		if (!educationData) {
			return new Response(
				JSON.stringify({ error: "Education entry not found" }),
				{ status: 404 }
			);
		}

		const { data: addressUsage, error: addressUsageError } = await supabase
			.from("education")
			.select("uuid")
			.eq("address_id", educationData.address_id);

		if (addressUsageError) throw addressUsageError;

		const { error: addressDeleteError } = await supabase
			.from("addresses")
			.delete()
			.eq("uuid", educationData.address_id);

		if (addressDeleteError) throw addressDeleteError;

		const { error: deleteError } = await supabase
			.from("education")
			.delete()
			.eq("uuid", id);

		if (deleteError) throw deleteError;

		return new Response(
			JSON.stringify({ message: "Education entry deleted successfully" }),
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error deleting entry:", error);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
		});
	}
}
