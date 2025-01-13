import { supabase } from "@/lib/supabase";
import useBulkUpload from "./useBulkUpload";

export const InsertSpeciality = async ({ providerId, row }) => {
  const { insertAddress } = useBulkUpload();

  const {
    speciality_name,
    speciality_type,
    speciality_is_board_certified,
    name_of_board,
    speciality_effective_date,
    speciality_expiry_date,
    speciality_address_line_1,
    speciality_address_line_2,
    speciality_country,
    speciality_city,
    speciality_state,
    speciality_zip_code,
  } = row;

  const address = await insertAddress({
    address_line_1:speciality_address_line_1,
    address_line_2:speciality_address_line_2,
    country: speciality_country,
    city:speciality_city,
    state:speciality_state,
    zip_code:speciality_zip_code,
  });

  if (speciality_name != "") {
    const { data: specialityData, error: specialityError } = await supabase
      .from("specialities")
      .insert({
        provider_id: providerId,
        address_id: address.uuid,
        name:speciality_name,
        type:speciality_type.toLowerCase(),
        is_board_certified:speciality_is_board_certified,
        name_of_board:name_of_board,
        effective_date:speciality_effective_date,
        expiry_date:speciality_expiry_date||null,
      })
      .select()
      .single();

    if (specialityError) throw new Error(specialityError.message);
    return specialityData;
  }
};
