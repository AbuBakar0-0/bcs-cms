import insertAddress from "@/hooks/insertAddress";
import { supabase } from "@/lib/supabase";

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);
		const provider_id = searchParams.get("provider_id");
		console.log("pprovider_id---", provider_id);

		// Validate providerId
		if (!provider_id) {
			throw new Error("Provider ID is required.");
		}

		const { data, error } = await supabase
			.from("educations")
			.select(
				`
                *,
                address_id:addresses (
                    state,
                    country
                )
            `
			)
			.eq("provider_id", provider_id)
			.is("deleted_at", null);

		// Handle any errors from Supabase
		if (error) {
			throw new Error(error.message);
		}

		// Return the result
		return new Response(JSON.stringify(data), {
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}
}

export async function POST(request) {
	try {
		const formData = await request.json();

		const address = await insertAddress(formData);

		const education = {
			provider_id: formData.provider_id,
			type: formData.type,
			professional_school: formData.professional_school,
			degree: formData.degree,
			start_date: formData.start_date,
			end_date: formData.end_date,
			address_id: address?.uuid,
			deleted_at: null,
		};

		const { data: educationResult, error: educationError } = await supabase
			.from("educations")
			.insert(education)
			.select("uuid");

		if (educationError) {
			throw new Error(educationError.message);
		}

		return new Response(
			JSON.stringify({
				message: "Education added successfully",
				education: educationResult,
			}),
			{
				status: 201,
				headers: { "Content-Type": "application/json" },
			}
		);
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}
}

export async function DELETE(request) {
	try {
		const { id } = await request.json();

		const { data: educationData, error: educationError } = await supabase
			.from("educations")
			.select("uuid")
			.eq("uuid", id)
			.is("deleted_at", null)
			.single();

		if (educationError || !educationData) {
			return new Response(
				JSON.stringify({
					error: "Education entry not found or already deleted",
				}),
				{ status: 404 }
			);
		}

		const { error: softDeleteError } = await supabase
			.from("educations")
			.update({ deleted_at: new Date().toISOString() })
			.eq("uuid", id);

		if (softDeleteError) throw softDeleteError;

		return new Response(
			JSON.stringify({ message: "Education entry soft deleted successfully" }),
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
		const { id, state, country, county, ...educationData } = body;

		const { data: currentEducation, error: fetchError } = await supabase
			.from("educations")
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
			.from("educations")
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
