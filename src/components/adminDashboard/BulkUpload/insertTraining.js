import { supabase } from "@/lib/supabase";
import useBulkUpload from "./useBulkUpload";

export const InsertTraining = async ({ providerId, row }) => {
  const { insertAddress } = useBulkUpload();

  const {
    training_type,
    training_country,
    training_state,
    training_county,
    hospital_name,
    affiliated_university,
    training_email,
    training_start_date,
    training_end_date,
    type_of_program,
    training_department,
    training_speciality,
    is_training_completed,
  } = row;

  const address = await insertAddress({
    state: training_state,
    country: training_country,
    county: training_county,
  });

  if (training_type != "") {
    const { data: trainingData, error: trainingError } = await supabase
      .from("professional_trainings")
      .insert({
        provider_id: providerId,
        training_type: training_type || "",
        address_id: address.uuid,
        hospital_name: hospital_name || "",
        affiliated_university: affiliated_university || "",
        email: training_email || "",
        start_date: training_start_date || "",
        end_date: training_end_date || "",
        type_of_program: type_of_program || "",
        department: training_department || "",
        speciality: training_speciality || "",
        is_completed: is_training_completed || "",
      })
      .select()
      .single();

    if (trainingError) throw new Error(trainingError.message);
    return trainingData;
  }
};
