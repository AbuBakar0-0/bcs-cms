import { supabase } from "@/lib/supabase";

export async function PUT(request, { params }) {
	try {
		const body = await request.json();
		const { id } = params;
		console.log(body);
		const { data, error } = await supabase
			.from("payers_setup")
			.update({
				state: body.state,
				plan_type: body.plan_type,
				business: body.business,
				provider_id: body.provider_id,
				payer_name: body.payer_name,
				status: body.status,
				application_date: body.application_date,
				note: body.note,
			})
			.eq("uuid", id)
			.select();
		console.log(error);
		if (error) throw error;

		return Response.json(data[0]);
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
}

export async function DELETE(request, { params }) {
	try {
		const { id } = params;
		const { data: existingPayer, error: checkError } = await supabase
			.from("payers_setup")
			.select("deleted_at")
			.eq("uuid", id)
			.single();

		if (checkError) throw checkError;

		if (!existingPayer) {
			return Response.json(
				{
					success: false,
					error: "Payer not found",
				},
				{
					status: 404,
				}
			);
		}

		if (existingPayer.deleted_at) {
			return Response.json(
				{
					success: false,
					error: "Payer is already deleted",
				},
				{
					status: 400,
				}
			);
		}

		const { error: deleteError } = await supabase
			.from("payers_setup")
			.update({
				deleted_at: new Date().toISOString(),
			})
			.eq("uuid", id);

		if (deleteError) throw deleteError;

		return Response.json({
			success: true,
			message: "Payer soft deleted successfully",
		});
	} catch (error) {
		console.error("Error deleting payer:", error);
		return Response.json(
			{
				success: false,
				error: error.message,
			},
			{
				status: 500,
			}
		);
	}
}
