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

		const { error: deleteEducationError } = await supabase
			.from("education")
			.delete()
			.eq("uuid", id);

		if (deleteEducationError) throw deleteEducationError;

		const { data: addressUsage, error: addressUsageError } = await supabase
			.from("education")
			.select("uuid")
			.eq("address_id", educationData.address_id);

		if (addressUsageError) throw addressUsageError;

		if (addressUsage.length === 0) {
			const { error: addressDeleteError } = await supabase
				.from("addresses")
				.delete()
				.eq("uuid", educationData.address_id);

			if (addressDeleteError) throw addressDeleteError;
		}

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

export async function PUT(request) {
	try {
		const body = await request.json();
		const { id, state, country, county, ...educationData } = body;

		const { data: currentEducation, error: fetchError } = await supabase
			.from("education")
			.select("address_id")
			.eq("uuid", id)
			.single();

		if (fetchError) throw fetchError;
		if (!currentEducation) {
			return new Response(
				JSON.stringify({ error: "Education entry not found" }),
				{ status: 404 }
			);
		}

		const { data: addressData, error: addressError } = await supabase
			.from("addresses")
			.update({ state, country, county })
			.eq("uuid", currentEducation.address_id)
			.select()
			.single();

		if (addressError) throw addressError;

		const { data: updatedEducation, error: educationError } = await supabase
			.from("education")
			.update({
				type: educationData.type,
				professional_school: educationData.professional_school,
				degree: educationData.degree,
				start_date: educationData.start_date,
				end_date: educationData.end_date,
			})
			.eq("uuid", id)
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
			.single();

		if (educationError) throw educationError;

		const formattedResponse = {
			...updatedEducation,
			country: updatedEducation.addresses?.country,
			state: updatedEducation.addresses?.state,
			county: updatedEducation.addresses?.county,
			addresses: undefined,
		};

		return new Response(JSON.stringify(formattedResponse), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Error updating education:", error);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
		});
	}
}
