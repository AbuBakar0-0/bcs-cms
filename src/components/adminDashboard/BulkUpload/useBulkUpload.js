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

  return { insertAddress, insertContact };
};

export default useBulkUpload;
