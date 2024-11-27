import { supabase } from "@/lib/supabase";

export async function GET(request) {
	try {
		// const searchParams = request.nextUrl.searchParams;
		// const provider_id = searchParams.get("provider_id");
		// console.log("---------------------------- ", provider_id);
		const { data, error } = await supabase
			.from("payer_setup")
			.select("*")
			// .eq("provider_id", provider_id)
			.order("created_at", { ascending: false });

		if (error) throw error;

		return Response.json(data);
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
}

export async function POST(request) {
	try {
		const body = await request.json();

		const { data, error } = await supabase
			.from("payer_setup")
			.insert([...body, provider_id])
			.select();

		if (error) throw error;

		return Response.json(data[0]);
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
}
