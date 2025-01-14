import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Extract the provider_id parameter from the request URL
    const searchParams = request.nextUrl.searchParams;
    const provider_id = searchParams.get("uuid");

    if (!provider_id) {
      return NextResponse.json(
        { error: "Missing required parameter: provider_id" },
        { status: 400 }
      );
    }

    // Query the provider_documents table
    const { data, error } = await supabase
      .from("users")
      .select("*") // Select all columns
      .eq("added_by", provider_id)
      .is("deleted_at", null);

    if (error) throw error;

    // Check if data is empty
    if (!data || data.length === 0) {
      return NextResponse.json([]);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in GET handler:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Extract JSON body from the request
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      role,
      is_verified = true,
      added_by,
      admin_dashboard,
      provider_dashboard,
      organization_management,
      document_center,
      credentialing_status,
      payers,
      user_management,
      hr_hiring,
      reporting,
      providers_information,
      professiona_ids,
      education_training,
      specialities,
      practice_profiles,
      practice_location,
      hospital_affiliations,
      payers_setup,
      credentialing_contacts,
      employment_information,
      professional_references,
      documents,
    } = body;

    // Validate the required fields
    if (!firstName || !lastName || !email || !password || !role) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: firstName, lastName, email, password, role",
        },
        { status: 400 }
      );
    }

    // Insert into the users table
    const { data, error } = await supabase.from("users").insert([
      {
        first_name: firstName,
        last_name: lastName,
        email,
        password, // Assuming the password is hashed before being sent here
        phone,
        role,
        is_verified,
        added_by,
        admin_dashboard,
        provider_dashboard,
        organization_management,
        document_center,
        credentialing_status,
        payers,
        user_management,
        hr_hiring,
        reporting,
        providers_information,
        professiona_ids,
        education_training,
        specialities,
        practice_profiles,
        practice_location,
        hospital_affiliations,
        payers_setup,
        credentialing_contacts,
        employment_information,
        professional_references,
        documents,
      },
    ]);

    if (error) throw error;

    return NextResponse.json(
      { message: "User added successfully", user: data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST handler:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    // Extract the provider_id parameter from the request URL
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("uuid");

    if (!userId) {
      return NextResponse.json(
        { error: "Missing required parameter: provider_id" },
        { status: 400 }
      );
    }

    // Soft-delete users associated with the provider_id
    const { error } = await supabase
      .from("users")
      .update({ deleted_at: new Date().toISOString() }) // Set deleted_at timestamp for soft delete
      .eq("uuid", userId)
      .is("deleted_at", null); // Ensure only non-deleted rows are affected

    if (error) throw error;

    return NextResponse.json(
      { message: "Users successfully deleted." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE handler:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    // Extract the UUID from the request URL and the body data
    const searchParams = request.nextUrl.searchParams;
    const provider_id = searchParams.get("uuid");

    if (!provider_id) {
      return NextResponse.json(
        { error: "Missing required parameter: uuid" },
        { status: 400 }
      );
    }

    // Parse the incoming request body (form data)
    const requestData = await request.json();

    // Validate the input data
    if (!requestData.firstName || !requestData.lastName || !requestData.email) {
      return NextResponse.json(
        { error: "Missing required fields: firstName, lastName, email" },
        { status: 400 }
      );
    }

    // Update the user data in the 'users' table
    const { data, error } = await supabase
      .from("users")
      .update({
        first_name: requestData.firstName,
        last_name: requestData.lastName,
        email: requestData.email,
        phone: requestData.phone,
        password: requestData.password,
        role: requestData.role,
        admin_dashboard: requestData.admin_dashboard,
        provider_dashboard: requestData.provider_dashboard,
        organization_management: requestData.organization_management,
        document_center: requestData.document_center,
        credentialing_status: requestData.credentialing_status,
        payers: requestData.payers,
        user_management: requestData.user_management,
        hr_hiring: requestData.hr_hiring,
        reporting: requestData.reporting,
        providers_information: requestData.providers_information,
        professiona_ids: requestData.professiona_ids,
        education_training: requestData.education_training,
        specialities: requestData.specialities,
        practice_profiles: requestData.practice_profiles,
        practice_location: requestData.practice_location,
        hospital_affiliations: requestData.hospital_affiliations,
        payers_setup: requestData.payers_setup,
        credentialing_contacts: requestData.credentialing_contacts,
        employment_information: requestData.employment_information,
        professional_references: requestData.professional_references,
        documents: requestData.documents,
      })
      .eq("uuid", provider_id) // Update the user with the matching uuid
      .is("deleted_at", null); // Ensure the user is not marked as deleted

    if (error) throw error;

    // Return the updated data
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in PUT handler:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
