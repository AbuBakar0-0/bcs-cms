import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Extract the user_uuid from the query parameters
    const searchParams = request.nextUrl.searchParams;
    const user_uuid = searchParams.get("uuid");

    if (!user_uuid) {
      return NextResponse.json(
        { error: "Missing required parameter: uuid" },
        { status: 400 },
      );
    }

    // Query the users table to get the user data
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("uuid", user_uuid)
      .single(); // Assuming you are fetching one user based on uuid

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
