import { supabase } from "@/lib/supabase";
import insertAddress from "../util";

export async function POST(request) {
  try {
    const formData = await request.json();

    const homeAddress = await insertAddress(formData,"Location");

    
    const { data: contact, error: contactError } = await supabase
      .from("contacts")
      .insert({
        cell_phone: formData.cell_phone,
        fax: formData.fax,
      })
      .select("uuid")
      .single();
    if (contactError) throw contactError;
    // Inserting Provider Information
    const { data: employmentInformation, error: employmentError } =
      await supabase
        .from("employment_information")
        .insert({
          legal_employer_name: formData.legal_employer_name,
          doing_business_name: formData.doing_business_name,
          department_speciality: formData.department_speciality,
          address_id: homeAddress?.uuid,
          contact_id: contact?.uuid,
          start_date: formData.start_date,
          end_date: formData.end_date,
          current_employer: formData.current_employer,
        })
        .select("uuid")
        .single();

    if (employmentError) throw employmentError;
    return new Response(
      JSON.stringify({
        message: "Data saved successfully",
        employment_id: employmentInformation?.uuid,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving Data:", error);
    return new Response(
      JSON.stringify({
        message: "Error Saving Data",
      }),
      { status: 500 }
    );
  }
}


export async function GET(request) {
  try {
    // Fetching all records from the "contacts" table
    const { data: contacts, error: contactError } = await supabase
      .from("contacts")
      .select("uuid, cell_phone, fax");

    if (contactError) throw contactError;

    // Fetching all records from the "employment_information" table
    const { data: employmentInformation, error: employmentError } = await supabase
      .from("employment_information")
      .select(
        "uuid, legal_employer_name, doing_business_name, department_speciality, start_date, end_date, current_employer, contact_id, address_id"
      );

    if (employmentError) throw employmentError;

    // Fetching all records from the "Location" (addresses) table
    const { data: addresses, error: addressError } = await supabase
      .from("addresses")
      .select("uuid, address_line_1, address_line_2, country, city, state, zip_code");

    if (addressError) throw addressError;

    // Combine the fetched data
    const fullData = employmentInformation.map((employment) => {
      const contact = contacts.find((contact) => contact.uuid === employment.contact_id);
      const address = addresses.find((address) => address.uuid === employment.address_id);

      return {
        ...employment,
        contact: contact ? contact : null,
        address: address ? address : null,
      };
    });

    return new Response(
      JSON.stringify({
        message: "Data fetched successfully",
        data: fullData,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching Data:", error);
    return new Response(
      JSON.stringify({
        message: "Error Fetching Data",
      }),
      { status: 500 }
    );
  }
}
