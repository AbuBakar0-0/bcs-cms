import { supabase } from "@/lib/supabase";
import useBulkUpload from "./useBulkUpload";

export const InsertEducation = async ({ providerId, row }) => {
  const { insertAddress } = useBulkUpload();

  const {
    education_type,
    professional_school,
    degree,
    education_start_date,
    education_end_date,
    education_state,
    education_country,
  } = row;

  const address = await insertAddress({
    state: education_state,
    country: education_country,
  });

  if (education_type != "") {
    const { data: educationData, error: educationError } = await supabase
      .from("educations")
      .insert({
        provider_id: providerId,
        type: education_type || "",
        professional_school: professional_school || "",
        degree: degree || "",
        start_date: education_start_date || "",
        end_date: education_end_date || "",
        address_id: address.uuid,
      })
      .select()
      .single();

    if (educationError) throw new Error(educationError.message);
    return educationData;
  }
};
