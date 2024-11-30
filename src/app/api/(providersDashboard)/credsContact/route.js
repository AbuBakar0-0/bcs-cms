import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
	const { data, error } = await supabase
		.from("credentialing_contacts")
		.select("*");
	return NextResponse.json({ data, error });
}

export async function POST(request) {
	const data = await request.json();
	const { error } = await supabase.from("credentialing_contacts").insert(data);
	return NextResponse.json({ error });
}

export async function PUT(request) {
	const { id, ...data } = await request.json();
	const { error } = await supabase
		.from("credentialing_contacts")
		.update(data)
		.eq("id", id);
	return NextResponse.json({ error });
}

export async function DELETE(request) {
	const { id } = await request.json();
	const { error } = await supabase
		.from("credentialing_contacts")
		.delete()
		.eq("id", id);
	return NextResponse.json({ error });
}
