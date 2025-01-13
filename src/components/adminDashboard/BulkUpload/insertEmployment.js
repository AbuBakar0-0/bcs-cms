import { supabase } from "@/lib/supabase";
import useBulkUpload from "./useBulkUpload";

export const InsertEmployment = async ({ providerId, row }) => {
  const { insertAddress, insertContact } = useBulkUpload();

  const {
    employment_legal_employer_name,
    employment_doing_business_name,
    employee_speciality,
    employment_address_line_1,
    employment_address_line_2,
    employment_country,
    employment_city,
    employment_state,
    employment_zip_code,
    employer_cell_phone,
    employer_fax,
    employment_start_date,
    employment_end_date,
  } = row;

  const address = await insertAddress({
    address_line_1: employment_address_line_1,
    address_line_2: employment_address_line_2,
    country: employment_country,
    city: employment_city,
    state: employment_state,
    zip_code: employment_zip_code,
  });

  const contact = await insertContact({
    cell_phone: employer_cell_phone,
    fax: employer_fax,
  });

  if (employment_legal_employer_name != "") {
    const { data: employmentData, error: employmentError } = await supabase
      .from("employment_informations")
      .insert({
        provider_id: providerId,
        legal_employer_name: employment_legal_employer_name,
        doing_business_name: employment_doing_business_name,
        department_speciality: employee_speciality,
        address_id: address.uuid,
        contact_id: contact.uuid,
        start_date: employment_start_date,
        end_date: employment_end_date,
        is_current_employer:employment_end_date!=""
      })
      .select()
      .single();

    if (employmentError) throw new Error(employmentError.message);
    return employmentData;
  }
};
