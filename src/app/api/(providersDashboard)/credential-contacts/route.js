import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data: credentialingContacts, error: credentialingError } =
      await supabase
        .from("credentialing_contacts")
        .select(
          `
		  uuid,
		  title,
		  first_name,
		  middle_initial,
		  last_name,
		  contact_id,
		  emergency_contact_id,
		  mailing_address_id,
		  provider_id
		`
        )
        .is("deleted_at", null);

    if (credentialingError) throw credentialingError;

    const enrichedData = await Promise.all(
      credentialingContacts.map(async (contact) => {
        const { data: mainContact } = await supabase
          .from("contacts")
          .select("*")
          .eq("uuid", contact.contact_id)
          .single();

        const { data: address } = await supabase
          .from("addresses")
          .select("*")
          .eq("uuid", contact.mailing_address_id)
          .single();
        return {
          uuid: contact.uuid,
          credentialingTitle: contact.title,
          firstName: contact.first_name,
          middleInitial: contact.middle_initial,
          lastName: contact.last_name,
          mailingAddress1: address?.address_line_1 || "",
          mailingAddress2: address?.address_line_2 || "",
          mailingCity: address?.city || "",
          mailingState: address?.state || "",
          mailingZipCode: address?.zip_code || "",
          homePhone: mainContact?.home_phone || "",
          fax: mainContact.fax,
          cellPhone: mainContact?.cell_phone || "",
          workEmail: mainContact?.work_email || "",
        };
      })
    );
    return NextResponse.json({ data: enrichedData });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { data: contactData, error: contactError } = await supabase
      .from("contacts")
      .insert({
        home_phone: body.homePhone,
        cell_phone: body.cellPhone,
        work_email: body.workEmail,
        contact_name: `${body.firstName} ${body.lastName}`,
        fax: body.fax,
      })
      .select()
      .single();

    if (contactError) throw contactError;

    // const { data: emergencyContactData, error: emergencyContactError } =
    // 	await supabase
    // 		.from("contacts")
    // 		.insert({
    // 			contact_name: body.emergencyContactName,
    // 			relation: body.emergencyContactRelation,
    // 			cell_phone: body.emergencyContactPhone,
    // 			email: body.emergencyContactEmail,
    // 		})
    // 		.select()
    // 		.single();

    // if (emergencyContactError) throw emergencyContactError;

    const { data: addressData, error: addressError } = await supabase
      .from("addresses")
      .insert({
        address_line_1: body.mailingAddress1,
        address_line_2: body.mailingAddress2,
        city: body.mailingCity,
        state: body.mailingState,
        zip_code: body.mailingZipCode,
        country: "USA",
        type: "mailing",
      })
      .select()
      .single();

    if (addressError) throw addressError;

    const { data: credentialingContact, error: credentialingError } =
      await supabase
        .from("credentialing_contacts")
        .insert({
          title: body.credentialingTitle,
          first_name: body.firstName,
          middle_initial: body.middleInitial,
          last_name: body.lastName,
          mailing_address_id: addressData.uuid,
          contact_id: contactData.uuid,
          provider_id: body.provider_id,
        })
        .select()
        .single();

    if (credentialingError) throw credentialingError;

    return NextResponse.json({ data: credentialingContact });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function PUT(request) {
  try {
    const body = await request.json();
    const { uuid } = body;
    const { data: existing, error: fetchError } = await supabase
      .from("credentialing_contacts")
      .select("*")
      .eq("uuid", uuid)
      .single();

    if (fetchError) throw fetchError;

    const { error: contactError } = await supabase
      .from("contacts")
      .update({
        home_phone: body.homePhone,
        cell_phone: body.cellPhone,
        fax: body.fax,
        work_email: body.workEmail,
        contact_name: `${body.firstName} ${body.lastName}`,
      })
      .eq("uuid", existing.contact_id);

    if (contactError) throw contactError;

    // const { error: emergencyError } = await supabase
    // 	.from("contacts")
    // 	.update({
    // 		contact_name: body.emergencyContactName,
    // 		relation: body.emergencyContactRelation,
    // 		cell_phone: body.emergencyContactPhone,
    // 		email: body.emergencyContactEmail,
    // 	})
    // 	.eq("uuid", existing.emergency_contact_id);

    // if (emergencyError) throw emergencyError;

    const { error: addressError } = await supabase
      .from("addresses")
      .update({
        address_line_1: body.mailingAddress1,
        address_line_2: body.mailingAddress2,
        city: body.mailingCity,
        state: body.mailingState,
        zip_code: body.mailingZipCode,
      })
      .eq("uuid", existing.mailing_address_id);

    if (addressError) throw addressError;

    const { data: updated, error: updateError } = await supabase
      .from("credentialing_contacts")
      .update({
        title: body.credentialingTitle,
        first_name: body.firstName,
        middle_initial: body.middleInitial,
        last_name: body.lastName,
      })
      .eq("uuid", uuid)
      .select()
      .single();

    if (updateError) throw updateError;

    return NextResponse.json({ data: updated });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { uuid } = await request.json();

    const { data: contact, error: fetchError } = await supabase
      .from("credentialing_contacts")
      .select(
        "contact_id, emergency_contact_id, mailing_address_id, deleted_at"
      )
      .eq("uuid", uuid)
      .single();

    if (fetchError) throw fetchError;

    if (!contact) {
      return NextResponse.json(
        { error: "Credentialing contact not found" },
        { status: 200 }
      );
    }

    if (contact.deleted_at) {
      return NextResponse.json(
        { error: "Credentialing contact is already deleted" },
        { status: 400 }
      );
    }

    const currentTime = new Date().toISOString();

    const deleteOperations = [
      supabase
        .from("credentialing_contacts")
        .update({ deleted_at: currentTime })
        .eq("uuid", uuid),
    ];

    if (contact.contact_id) {
      deleteOperations.push(
        supabase
          .from("contacts")
          .update({ deleted_at: currentTime })
          .eq("uuid", contact.contact_id)
      );
    }

    if (contact.emergency_contact_id) {
      deleteOperations.push(
        supabase
          .from("contacts")
          .update({ deleted_at: currentTime })
          .eq("uuid", contact.emergency_contact_id)
      );
    }

    if (contact.mailing_address_id) {
      deleteOperations.push(
        supabase
          .from("addresses")
          .update({ deleted_at: currentTime })
          .eq("uuid", contact.mailing_address_id)
      );
    }

    const results = await Promise.all(deleteOperations);

    const errors = results.filter((result) => result.error);
    if (errors.length > 0) {
      throw new Error(
        `Error in batch updates: ${errors
          .map((e) => e.error.message)
          .join(", ")}`
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Credentialing contact and related records soft deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
