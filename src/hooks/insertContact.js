import { supabase } from "@/lib/supabase";

export default async function insertContact(formData) {
  const contact = {
    home_phone: formData.home_phone || "",
    cell_phone: formData.cell_phone || "",
    fax: formData.fax || "",
    email: formData.email || "",
    work_email: formData.work_email || "",
    contact_name: formData.contact_name || "",
    relation: formData.relation || "",
  };

  const { data: contactData, error: addressError } = await supabase
    .from("contacts")
    .insert(contact)
    .single()
    .select(); // single ensures we get the inserted address object back

  if (addressError) {
    throw new Error(addressError.message);
  }

  return contactData;
}
