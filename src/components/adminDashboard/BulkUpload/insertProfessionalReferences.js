import { supabase } from "@/lib/supabase";
import useBulkUpload from "./useBulkUpload";

export const InsertProfessionalReferences = async ({ providerId, row }) => {
  const { insertAddress, insertContact } = useBulkUpload();

  const {
    professional_reference_provider_type,
    professional_reference_first_name,
    professional_reference_middle_initial,
    professional_reference_last_name,
    professional_reference_address_line_1,
    professional_reference_address_line_2,
    professional_reference_city,
    professional_reference_state,
    professional_reference_zip_code,
    professional_reference_cell_phone,
    professional_reference_fax,
    professional_reference_email,
  } = row;

  const address = await insertAddress({
    address_line_1: professional_reference_address_line_1,
    address_line_2: professional_reference_address_line_2,
    city: professional_reference_city,
    state: professional_reference_state,
    zip_code: professional_reference_zip_code,
  });

  const contact = await insertContact({
    cell_phone: professional_reference_cell_phone,
    fax: professional_reference_fax,
    email: professional_reference_email,
  });

  if (professional_reference_provider_type != "") {
    const { data: professionalData, error: professionalError } = await supabase
      .from("professional_references")
      .insert({
        provider_id: providerId,
        address_id: address.uuid,
        contact_id: contact.uuid,
        provider_type: professional_reference_provider_type,
        first_name: professional_reference_first_name,
        middle_initial: professional_reference_middle_initial,
        last_name: professional_reference_last_name,
      })
      .select()
      .single();

    if (professionalError) throw new Error(professionalError.message);
    return professionalData;
  }
};
