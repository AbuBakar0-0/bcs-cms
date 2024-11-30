import { supabase } from "@/lib/supabase";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const provider_id = searchParams.get("provider_id");
    console.log(provider_id);

    // Validate providerId
    if (!provider_id) {
      throw new Error("Provider ID is required.");
    }

    // Query education data and join with addresses table
    const { data, error } = await supabase
      .from("educations") // Assuming you have an 'education' table
      .select(
        `
                *,
                address_id:addresses (
                    state,
                    country
                )
            `
      )
      .eq("provider_id", provider_id);

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
    const body = await request.json();

    const address = {
      country: body.country,
      state: body.state,
    };

    const { data: addressData, error: addressError } = await supabase
      .from("addresses")
      .insert(address)
      .single().select("uuid"); // single ensures we get the inserted address object back

    if (addressError) {
      throw new Error(addressError.message);
    }

    // 2. Insert education data into the education table, including the reference to the address

	const education = {
      provider_id: body.provider_id,
      type: body.type,
      professional_school: body.professional_school,
      degree: body.degree,
      start_date: body.start_date,
      end_date: body.end_date,
      address_id: addressData.uuid,
    };
	console.log(education);


    const { data: educationResult, error: educationError } = await supabase
      .from("educations")
      .insert(education).select("uuid");

    if (educationError) {
      throw new Error(educationError.message);
    }

    // Return success response
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
      .from("educations")
      .delete()
      .eq("uuid", id);

    if (deleteEducationError) throw deleteEducationError;

    const { data: addressUsage, error: addressUsageError } = await supabase
      .from("educations")
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
