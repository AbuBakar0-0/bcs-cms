import { supabase } from "@/lib/supabase";

export async function GET(request) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const provider_id = searchParams.get("provider_id");
		const { data, error } = await supabase
			.from("payers_setup")
			.select("*")
			.is("deleted_at", null);
			// .eq("provider_id", provider_id)
		// .order("created_at", { ascending: false });
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
			.from("payers_setup")
			.insert([
				{
					state: body.state,
					plan_type: body.plan_type,
					business: body.business,
					provider_id: body.provider_id,
					payer_name: body.payer_name,
					status: body.status,
					application_date: body.application_date,
					note: body.note,
				},
			])
			.select();

		if (error) throw error;

		return Response.json(data[0]);
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
}
