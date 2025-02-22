import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const requestData = await request.json();

    // Insert the user data directly into the users table
    const { data, error } = await supabase.from("users").insert({
      first_name: requestData.firstName,
      last_name: requestData.lastName,
      email: requestData.email,
      password: requestData.password,
      phone: requestData.phoneNumber,
      admin_dashboard: true,
      provider_dashboard: true,
      organization_management: true,
      document_center: true,
      credentialing_status: true,
      payers: true,
      user_management: true,
      hr_hiring: true,
      reporting: true,
      providers_information: true,
      professiona_ids: true,
      education_training: true,
      specialities: true,
      practice_profiles: true,
      practice_location: true,
      hospital_affiliations: true,
      payers_setup: true,
      credentialing_contacts: true,
      employment_information: true,
      professional_references: true,
      documents: true,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      user: data, // Return the inserted user data
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
