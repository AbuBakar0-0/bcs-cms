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
      .from("provider_documents")
      .select("*") // Select all columns
      .eq("provider_id", provider_id)
      .is('deleted_at',null);
      
    if (error) throw error;


    // Check if data is empty
    if (!data || data.length === 0) {
      return NextResponse.json({ message: "No Data Found" }, { status: 200 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in GET handler:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
