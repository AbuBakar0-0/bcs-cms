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
	  password:requestData.password,
      phone: requestData.phoneNumber,
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
