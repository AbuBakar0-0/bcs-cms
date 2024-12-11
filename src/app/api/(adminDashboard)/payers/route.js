import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        console.log("CALLED");

        // Extract the added_by parameter from the request URL
        const searchParams = request.nextUrl.searchParams;
        const added_by = searchParams.get("uuid");

        if (!added_by) {
            return NextResponse.json({ error: "Missing required parameter: added_by" }, { status: 400 });
        }

        // Perform the join query
        const { data, error } = await supabase
            .from("payers_setup")
            .select(`
                *,
                providers_info(*)
            `)
            .eq("providers_info.added_by", added_by) // Filter where providers_info.added_by matches
            .eq("providers_info.provider_id", "payers_setup.provider_id"); // Join condition

        if (error) throw error;

        console.log(data);

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