import { supabase } from "@/lib/supabase";

export const InsertPayers= async ({ providerId, row }) => {

  const {
    payer_state,
    payer_plan_type,
    payer_business,
    payer_name,
    application_status,
    application_date,
    application_notes,
  } = row;

  if (payer_state != "") {
    const { data: payerData, error: payerError } = await supabase
      .from("payers_setup")
      .insert({
        provider_id:providerId,
        payer_name:payer_name,
        state:payer_state,
        plan_type:payer_plan_type,
        business:payer_business,
        status:application_status,
        application_date:application_date,
        note:application_notes,
      })
      .select()
      .single();

    if (payerError) throw new Error(payerError.message);
    return payerData;
  }
};
