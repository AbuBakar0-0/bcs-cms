import { supabase } from "@/lib/supabase";
import insertAddress from "../util";

export async function POST(request) {
  try {
    const formData = await request.json();

    const homeAddress = await insertAddress(formData, "Location");

    const { data: contact, error: contactError } = await supabase
      .from("contacts")
      .insert({
        cell_phone: formData.cell_phone,
        fax: formData.fax,
        email: formData.email,
      })
      .select("uuid")
      .single();
    if (contactError) throw contactError;

    // Inserting Provider Information
    const { data: professionalReference, error: referenceError } =
      await supabase
        .from("professional_references")
        .insert({
          provider_type: formData.provider_type,
          first_name: formData.first_name,
          middle_initial: formData.middle_initial,
          last_name: formData.last_name,
          address_id: homeAddress?.uuid,
          contact_id: contact?.uuid,
        })
        .select("uuid")
        .single();

    if (referenceError) throw referenceError;
    return new Response(
      JSON.stringify({
        message: "Data saved successfully",
        employment_id: professionalReference?.uuid,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving Data:", error);
    return new Response(
      JSON.stringify({
        message: "Error Saving Data",
      }),
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    // Fetch all professional references with their address and contact data
    const { data: professionalReferences, error: referenceError } =
      await supabase
        .from("professional_references")
        .select("uuid, provider_type, first_name, middle_initial, last_name, address_id, contact_id");

    if (referenceError) throw referenceError;

    // If there are no professional references
    if (!professionalReferences || professionalReferences.length === 0) {
      return new Response(
        JSON.stringify({ message: "No professional references found" }),
        { status: 404 }
      );
    }

    // Fetch addresses and contacts for each professional reference
    const addressPromises = professionalReferences.map((reference) =>
      supabase
        .from("addresses")
        .select("uuid, street, city, state, zip")
        .eq("uuid", reference.address_id)
        .single()
    );

    const contactPromises = professionalReferences.map((reference) =>
      supabase
        .from("contacts")
        .select("uuid, cell_phone, fax, email")
        .eq("uuid", reference.contact_id)
        .single()
    );

    // Wait for all address and contact data to be fetched
    const addressResponses = await Promise.all(addressPromises);
    const contactResponses = await Promise.all(contactPromises);

    // Map the addresses and contacts to the professional reference data
    const responseData = professionalReferences.map((reference, index) => ({
      professionalReference: reference,
      address: addressResponses[index].data || null,
      contact: contactResponses[index].data || null,
    }));

    return new Response(
      JSON.stringify({
        message: "Data retrieved successfully",
        data: responseData,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching Data:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching Data" }),
      { status: 500 }
    );
  }
}

