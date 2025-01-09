import { supabase } from "@/lib/supabase";

const useBulkUpload = () => {
  const insertAddress = async ({
    address_line_1 = "",
    address_line_2 = "",
    city = "",
    state = "",
    country = "",
    county = "",
    zip_code = "",
  }) => {
    const { data: address, error: addressError } = await supabase
      .from("addresses")
      .insert({
        address_line_1,
        address_line_2,
        city,
        state,
        county,
        country,
        zip_code,
      })
      .select()
      .single();

    if (addressError) throw new Error(addressError.message);

    return address;
  };

  const insertContact = async ({
    home_phone = "",
    cell_phone = "",
    fax = "",
    email = "",
    work_email = "",
    contact_name = "",
    relation = "",
    work_phone = "",
  }) => {
    const { data: contact, error: contactError } = await supabase
      .from("contacts")
      .insert({
        home_phone: home_phone,
        cell_phone: cell_phone,
        fax: fax,
        email: email,
        work_email: work_email,
        contact_name: contact_name,
        relation: relation,
        work_phone: work_phone,
      })
      .select()
      .single();

    if (contactError) throw new Error(contactError.message);
    return contact;
  };

  const insertInfoNumbers = async ({
    professional_id = "",
    type = "",
    value = "",
    issue_state = "",
    effective_date = "",
    expiry_date = "",
  }) => {
    const { data: infoNumberData, error: infoNumberError } = await supabase
      .from("info_numbers")
      .insert({
        professional_id,
        type,
        value,
        issue_state,
        effective_date,
        expiry_date,
      })
      .select()
      .single();

    if (infoNumberError) throw new Error(infoNumberError.message);
    return infoNumberData;
  };

  const insertMalpracticeInfo = async ({
    insurance_name = "",
    policy_number = "",
    effective_date = "",
    expiry_date = "",
    aggregate = "",
    professional_id = "",
    type = "",
  }) => {
    const { data: malpracticeData, error: malpracticeError } = await supabase
      .from("malpractices_info")
      .insert({
        insurance_name,
        policy_number,
        effective_date,
        expiry_date,
        aggregate,
      })
      .select()
      .single();

    if (malpracticeError) throw new Error(malpracticeError.message);

    if (type == "professional") {
      const { error: professionalError } = await supabase
        .from("professional_ids")
        .update({
          professional_malpractice_info: malpracticeData.uuid,
        })
        .eq("uuid", professional_id)
        .select()
        .single();

      if (professionalError) throw new Error(professionalError.message);
    } else {
      const { error: professionalError } = await supabase
        .from("professional_ids")
        .update({
          general_malpractice_info: malpracticeData.uuid,
        })
        .eq("uuid", professional_id)
        .select()
        .single();
      if (professionalError) throw new Error(professionalError.message);
    }

    return malpracticeData;
  };

  const insertWebPortals = async ({
    professional_id = "",
    username = "",
    password = "",
    type = "",
    platform_name = "",
    user_id = "",
    expiry_date = null,
  }) => {
    const { data: webPortalData, error: webPortalError } = await supabase
      .from("web_portals")
      .insert({
        professional_id,
        username,
        password,
        type,
        platform_name,
        user_id,
        expiry_date,
      })
      .select()
      .single();

    if (webPortalError) throw new Error(webPortalError.message);
    return webPortalData;
  };

  return {
    insertAddress,
    insertContact,
    insertInfoNumbers,
    insertMalpracticeInfo,
    insertWebPortals,
  };
};

export default useBulkUpload;
