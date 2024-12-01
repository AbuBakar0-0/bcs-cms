import { supabase } from "@/lib/supabase";

export default async function insertAddress(formData) {
	const address = {
		address_line_1: formData.address_line_1 || "",
		address_line_2: formData.address_line_2 || "",
		city: formData.city || "",
		state: formData.state || "",
		county: formData.county || "",
		country: formData.country || "",
		zip_code: formData.zip_code || "",
	};

	const { data: addressData, error: addressError } = await supabase
		.from("addresses")
		.insert(address)
		.single()
		.select();

	if (addressError) {
		throw new Error(addressError.message);
	}

	return addressData;
}
