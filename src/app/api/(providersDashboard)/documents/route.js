import { supabase } from "@/lib/supabase";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});


export async function GET(request) {
	try {
	  // Extract optional filters, if any
	  const searchParams = request.nextUrl.searchParams;
	  const addedBy = searchParams.get("uuid"); // Filter based on added_by
  
	  // Build the query without aliases
	  let query = supabase
		.from("provider_documents")
		.select(`
		  *,
		  providers_info(*)
		`)
		.eq("providers_info.added_by", addedBy); // Filtering by added_by
  
	  // Execute the query
	  const { data, error } = await query;
  
	  // Handle potential query errors
	  if (error) {
		throw new Error(`Failed to retrieve data: ${error.message}`);
	  }
  
	  // Check if no data was found
	  if (!data || data.length === 0) {
		return new Response(
		  JSON.stringify({
			success: false,
			message: "No records found",
		  }),
		  {
			headers: { "Content-Type": "application/json" },
			status: 404,
		  }
		);
	  }
  
	  // Return the data as a list
	  return new Response(
		JSON.stringify(data),
		{
		  headers: { "Content-Type": "application/json" },
		}
	  );
	} catch (error) {
	  // Handle general errors
	  console.error("Error in GET handler:", error);
	  return new Response(
		JSON.stringify({
		  error: "Failed to retrieve data",
		  details: error.message,
		}),
		{
		  headers: { "Content-Type": "application/json" },
		  status: 500,
		}
	  );
	}
  }

export async function POST(req) {
	try {
		const formData = await req.formData();
		const provider_id = formData.get("provider_id");
		const file = formData.get("file");
		if (!file || file.size === 0) {
			return Response.json({ error: "File is required" }, { status: 400 });
		}

		let url = null;
		let file_public_id = null;

		try {
			const fileBuffer = await file.arrayBuffer();
			const buffer = Buffer.from(fileBuffer);
			const base64File = buffer.toString("base64");
			const mimeType = file.type;
			const dataURI = `data:${mimeType};base64,${base64File}`;

			const uploadResponse = await cloudinary.uploader.upload(dataURI, {
				folder: "documents",
				resource_type: "auto",
			});

			url = uploadResponse.secure_url;
			file_public_id = uploadResponse.public_id;
		} catch (uploadError) {
			console.error("File upload error:", uploadError);
			return Response.json({ error: "Failed to upload file" }, { status: 500 });
		}

		const title = formData.get("title");
		const status = formData.get("status");

		if (!title || !provider_id || !status) {
			if (file_public_id) {
				await cloudinary.uploader.destroy(file_public_id);
			}
			return Response.json(
				{ error: "Title, provider, and status are required" },
				{ status: 400 }
			);
		}

		const { error } = await supabase.from("provider_documents").insert({
			title,
			status,
			effective_date: formData.get("effective_date") || null,
			expiry_date: formData.get("expiry_date") || null,
			url,
			file_public_id,
			provider_id,
		});

		console.log(error);
		if (error) {
			if (file_public_id) {
				await cloudinary.uploader.destroy(file_public_id);
			}
			throw error;
		}

		return Response.json({ message: "Document created successfully" });
	} catch (error) {
		console.error("POST document error:", error);
		return Response.json({ error: error.message }, { status: 500 });
	}
}
export async function DELETE(req) {
	try {
		const { uuid } = await req.json();

		const { data: existingDoc, error: checkError } = await supabase
			.from("provider_documents")
			.select("deleted_at")
			.match({ uuid })
			.single();

		if (checkError) throw checkError;

		if (!existingDoc) {
			return Response.json({ error: "Document not found" }, { status: 404 });
		}

		if (existingDoc.deleted_at) {
			return Response.json(
				{ error: "Document is already deleted" },
				{ status: 400 }
			);
		}

		const { error } = await supabase
			.from("provider_documents")
			.update({
				deleted_at: new Date().toISOString(),
			})
			.match({ uuid });

		if (error) throw error;

		return Response.json({ message: "Document soft deleted successfully" });
	} catch (error) {
		console.error("DELETE document error:", error);
		return Response.json({ error: error.message }, { status: 500 });
	}
}
export async function PUT(req) {
	try {
		const formData = await req.formData();
		const uuid = formData.get("uuid");

		let url = formData.get("existing_url") || null;
		let file_public_id = formData.get("existing_file_public_id") || null;
		const file = formData.get("file");

		if (file && file.size > 0) {
			if (file_public_id) {
				await cloudinary.uploader.destroy(file_public_id);
			}

			const fileBuffer = await file.arrayBuffer();
			const buffer = Buffer.from(fileBuffer);
			const base64File = buffer.toString("base64");
			const mimeType = file.type;
			const dataURI = `data:${mimeType};base64,${base64File}`;

			const uploadResponse = await cloudinary.uploader.upload(dataURI, {
				folder: "documents",
				resource_type: "auto",
			});

			url = uploadResponse.secure_url;
			file_public_id = uploadResponse.public_id;
		}

		const { error } = await supabase
			.from("provider_documents")
			.update({
				title: formData.get("title"),
				provider: formData.get("provider"),
				status: formData.get("status"),
				effective_date: formData.get("effective_date") || null,
				expiry_date: formData.get("expiry_date") || null,
				url,
				file_public_id,
			})
			.match({ uuid });

		if (error) throw error;

		return Response.json({ message: "Document updated successfully" });
	} catch (error) {
		console.error("PUT document error:", error);
		return Response.json({ error: error.message }, { status: 500 });
	}
}
