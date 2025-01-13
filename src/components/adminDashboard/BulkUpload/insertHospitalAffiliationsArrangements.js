import { supabase } from "@/lib/supabase";
import useBulkUpload from "./useBulkUpload";

export const InsertHospitalAffiliationsArrangements = async ({
  providerId,
  row,
}) => {
  const { insertAddress } = useBulkUpload();

  const {
    hospital_affiliation_arrangements_hospital_name,
    hospital_affiliation_arrangements_address_line_1,
    hospital_affiliation_arrangements_address_line_2,
    hospital_affiliation_arrangements_city,
    hospital_affiliation_arrangements_state,
    hospital_affiliation_arrangements_zip_code,
  } = row;

  const address = await insertAddress({
    address_line_1: hospital_affiliation_arrangements_address_line_1,
    address_line_2: hospital_affiliation_arrangements_address_line_2,
    city: hospital_affiliation_arrangements_city,
    state: hospital_affiliation_arrangements_state,
    zip_code: hospital_affiliation_arrangements_zip_code,
  });
  
  if (hospital_affiliation_arrangements_hospital_name != "") {
    const { data: affiliationData, error: affiliationError } = await supabase
      .from("hospital_admittings")
      .insert({
        provider_id: providerId,
        address_id: address.uuid,
        hospital_name: hospital_affiliation_arrangements_hospital_name,
        type: "hospital",
      })
      .select()
      .single();
    if (affiliationError) throw new Error(affiliationError.message);
    return affiliationData;
  }
};
