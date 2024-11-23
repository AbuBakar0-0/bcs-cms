import { supabase } from "@/lib/supabase";

export async function GET() {
	try {
		const { data, error } = await supabase
			.from("payer_setup")
			.select("*")
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
			.insert([body])
			.select();

		if (error) throw error;

		return Response.json(data[0]);
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
}