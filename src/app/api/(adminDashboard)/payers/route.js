import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {

    // Extract the added_by parameter from the request URL
    const searchParams = request.nextUrl.searchParams;
    const added_by = searchParams.get("uuid");

    if (!added_by) {
      return NextResponse.json(
        { error: "Missing required parameter: added_by" },
        { status: 400 }
      );
    }

    // Perform the join query
    const { data, error } = await supabase
      .from("payers_setup")
      .select(
        `
                *,
                providers_info(*)
            `
      )
      .eq("providers_info.added_by", added_by)
      .is("deleted_at", null); // Filter where providers_info.added_by matches

    if (error) throw error;

   

    // Check if data is empty
    if (!data || data.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
