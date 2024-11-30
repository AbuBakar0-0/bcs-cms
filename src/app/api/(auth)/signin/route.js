import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Query the users table to find the user with the provided email
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single(); // Assuming you only expect one user with this email

    if (userError || !userData) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
    }

    // Directly compare the entered password with the stored password
    if (userData.password !== password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
    }

    // If password is valid, return user data (without the password field)
    const { password: _, ...userWithoutPassword } = userData; // Destructure to remove password field

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
