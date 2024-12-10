import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

//e9a05727-1f57-4447-b985-b0beecaebd6a
export async function GET(request) {
	try {
		console.log("CALLED");

		// Extract the added_by parameter from the request URL
		const searchParams = request.nextUrl.searchParams;
		const added_by = searchParams.get("uuid");

		if (!added_by) {
			return NextResponse.json({ error: "Missing required parameter: added_by" }, { status: 400 });
		}

		const { data, error } = await supabase
			.from("payers_setup")
			.select("*, providers_info(*)") // Include related data
			.is("deleted_at", null) // WHERE deleted_at IS NULL
			.eq("providers_info.added_by", added_by); // Filter on related table's column

		if (error) throw error;

		console.log(data);	
		// Check if data is empty
		if (!data || data.length === 0) {
			return NextResponse.json([], { status: 200 });
		}

		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
