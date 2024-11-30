import { supabase } from "@/lib/supabase";

export async function PUT(request, { params }) {
	try {
		const body = await request.json();
		const { id } = params;

		const { data, error } = await supabase
			.from("payer_setup")
			.update(body)
			.eq("uuid", id)
			.select();

		if (error) throw error;

		return Response.json(data[0]);
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
}

export async function DELETE(request, { params }) {
	try {
		const { id } = params;

		const { error } = await supabase
			.from("payer_setup")
			.delete()
			.eq("uuid", id);

		if (error) throw error;

		return Response.json({ success: true });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
}
