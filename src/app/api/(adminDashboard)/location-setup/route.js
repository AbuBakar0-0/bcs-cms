import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Extract provider_id (uuid) from the request URL
    const searchParams = request.nextUrl.searchParams;
    const provider_id = searchParams.get("uuid");

    if (!provider_id) {
      return NextResponse.json({ error: "Missing required parameter: uuid" }, { status: 400 });
    }

    console.log("Fetching practice locations for provider_id:", provider_id);

    // Fetch data from the practice_locations table where provider_id matches
    const { data, error } = await supabase
      .from("practice_locations")
      .select("*") // Select all columns
      .eq("provider_id", provider_id); // Filter by provider_id

    if (error) throw error;

    console.log(data);

    // Check if data is empty
    if (!data || data.length === 0) {
      return NextResponse.json({ message: "No Data Found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
