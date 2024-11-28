import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request) {
	try {
		const { email, password } = await request.json();

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 400 });
		}

		const { data: userData, error: userError } = await supabase
			.from("users")
			.select()
			.eq("uuid", data.user.id)
			.single();

		if (userError) {
			return NextResponse.json({ error: userError.message }, { status: 400 });
		}

		return NextResponse.json({
			success: true,
			user: { ...data.user, ...userData },
		});
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
