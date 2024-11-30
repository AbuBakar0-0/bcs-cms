import { supabase } from "@/lib/supabase";

async function insertAddress(formData,type) {
  const { data: address, error: addressError } = await supabase
    .from("addresses")
    .insert({
      address_line_1: formData.address_line_1,
      address_line_2: formData.address_line_2,
      city: formData.city,
      state: formData.state,
      country: "USA",
      zip_code: formData.zip_code,
      type: type,
    })
    .select("uuid")
    .single();

  if (addressError) throw addressError;
  return address;
}

export default insertAddress;
