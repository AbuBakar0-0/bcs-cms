import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request) {
	try {
		const requestData = await request.json();

		const { data: authData, error: authError } = await supabase.auth.signUp({
			email: requestData.email,
			password: requestData.password,
		});

		if (authError) {
			return NextResponse.json({ error: authError.message }, { status: 400 });
		}
		console.log(authData);
		// Create user profile
		const { error: profileError } = await supabase.from("users").insert({
			uuid: authData.user.id,
			first_name: requestData.firstName,
			last_name: requestData.lastName,
			email: requestData.email,
			phone_number: requestData.phoneNumber,
		});

		if (profileError) {
			await supabase.auth.admin.deleteUser(authData.user.id);
			return NextResponse.json(
				{ error: profileError.message },
				{ status: 400 }
			);
		}

		return NextResponse.json({
			success: true,
			user: authData.user,
		});
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
