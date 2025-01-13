import { supabase } from "@/lib/supabase";
import useBulkUpload from "./useBulkUpload";

export const InsertCredentialingContacts = async ({ providerId, row }) => {
  const { insertAddress,insertContact } = useBulkUpload();

  const {
    credentialing_title,credentialing_first_name,credentialing_middle_initial,credentialing_last_name,credentialing_mailing_address_line_1,credentialing_mailing_address_line_2,credentialing_mailing_city,credentialing_mailing_state,credentialing_mailing_zip_code,credentialing_work_phone,credentialing_cell_phone,credentialing_fax,credentialing_work_email

  } = row;

  const address = await insertAddress({
    address_line_1:credentialing_mailing_address_line_1,
    address_line_2:credentialing_mailing_address_line_2,
    city:credentialing_mailing_city,
    state: credentialing_mailing_state,
    zip_code:credentialing_mailing_zip_code
  });


  const contact = await insertContact({
    home_phone:credentialing_work_phone,
    cell_phone:credentialing_cell_phone,
    fax:credentialing_fax,
    work_email:credentialing_work_email,
  });

  if (credentialing_title != "") {
    const { data: credentialingData, error: credentialingError } = await supabase
      .from("credentialing_contacts")
      .insert({
        provider_id: providerId,
        mailing_address_id:address.uuid,
        contact_id:contact.uuid,
        title:credentialing_title,
        first_name:credentialing_first_name,
        middle_initial:credentialing_middle_initial,
        last_name:credentialing_last_name
      })
      .select()
      .single();

    if (credentialingError) throw new Error(credentialingError.message);
    return credentialingData;
  }
};
