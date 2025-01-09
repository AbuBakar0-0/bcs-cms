import { supabase } from "@/lib/supabase";
import useBulkUpload from "./useBulkUpload";

export const InsertProfessionalIds = async ({ providerData, row }) => {
  const {
    insertInfoNumbers,
    insertMalpracticeInfo,
    insertWebPortals,
  } = useBulkUpload();

  const {
    npi_1,
    npi_2,
    tax_id,
    upin,

    //medicare and other numbers
    medicare_ptan_no,
    medicare_issue_state,
    medicare_effective_date,
    medicare_expiry_date,
    medicaid_no,
    medicaid_issue_state,
    medicaid_effective_date,
    medicaid_expiry_date,
    state_license_no,
    state_license_issue_state,
    state_license_effective_date,
    state_license_expiry_date,
    clia_no,
    clia_issue_state,
    clia_effective_date,
    clia_expiry_date,
    dea_no,
    dea_issue_state,
    dea_effective_date,
    dea_expiry_date,
    cds_no,
    cds_issue_state,
    cds_effective_date,
    cds_expiry_date,

    //insurances
    professional_insurance_name,
    professional_policy_number,
    professional_policy_effective_date,
    professional_policy_expiry_date,
    professional_policy_aggregate,
    general_insurance_name,
    general_policy_number,
    general_policy_effective_date,
    general_policy_expiry_date,
    general_policy_aggregate,

    //web_portal info
    pecos_username,
    pecos_password,
    uhc_username,
    uhc_password,
    optum_username,
    optum_password,
    availity_username,
    availity_password,
    medicaid_username,
    medicaid_password,
    echo_username,
    echo_password,
    payspan_username,
    payspan_password,
    billing_software_username,
    billing_software_password,
    edi_username,
    edi_password,
    fax_username,
    fax_password,
    molina_username,
    molina_password,
    caqh_user_id,
    caqh_username,
    caqh_password,
    caqh_reattestation_date,
    bank_name,
    bank_username,
    bank_password,
  } = row;

  const { data: professionalData, error: professionalError } = await supabase
    .from("professional_ids")
    .insert({
      provider_id: providerData.uuid,
      npi_1: npi_1 || "",
      npi_2: npi_2 || "",
      tax_id: tax_id,
      upin: upin,
    })
    .select()
    .single();

  if (professionalError) throw new Error(professionalError.message);
  //MEDICARE AND OTHER NUMBERS

  const medicareInfo = await insertInfoNumbers({
    professional_id: professionalData.uuid,
    type: "medicare",
    value: medicare_ptan_no,
    issue_state: medicare_issue_state,
    effective_date: medicare_effective_date,
    expiry_date: medicare_expiry_date,
  });

  const medicaidInfo = await insertInfoNumbers({
    professional_id: professionalData.uuid,
    type: "medicaid",
    value: medicaid_no,
    issue_state: medicaid_issue_state,
    effective_date: medicaid_effective_date,
    expiry_date: medicaid_expiry_date,
  });

  const stateLicenseInfo = await insertInfoNumbers({
    professional_id: professionalData.uuid,
    type: "state_license",
    value: state_license_no,
    issue_state: state_license_issue_state,
    effective_date: state_license_effective_date,
    expiry_date: state_license_expiry_date,
  });

  const cliaInfo = await insertInfoNumbers({
    professional_id: professionalData.uuid,
    type: "clia",
    value: clia_no,
    issue_state: clia_issue_state,
    effective_date: clia_effective_date,
    expiry_date: clia_expiry_date,
  });

  const deaInfo = await insertInfoNumbers({
    professional_id: professionalData.uuid,
    type: "dea",
    value: dea_no,
    issue_state: dea_issue_state,
    effective_date: dea_effective_date,
    expiry_date: dea_expiry_date,
  });

  const cdsInfo = await insertInfoNumbers({
    professional_id: professionalData.uuid,
    type: "cds",
    value: cds_no,
    issue_state: cds_issue_state,
    effective_date: cds_effective_date,
    expiry_date: cds_expiry_date,
  });

  //MALPRACTICE INFO INSERTION

  const professionalMalpractice = await insertMalpracticeInfo({
    insurance_name: professional_insurance_name,
    policy_number: professional_policy_number,
    effective_date: professional_policy_effective_date,
    expiry_date: professional_policy_expiry_date,
    aggregate: professional_policy_aggregate,
    professional_id: professionalData.uuid,
    type: "professional",
  });

  const generalMalpractice = await insertMalpracticeInfo({
    insurance_name: general_insurance_name,
    policy_number: general_policy_number,
    effective_date: general_policy_effective_date,
    expiry_date: general_policy_expiry_date,
    aggregate: general_policy_aggregate,
    professional_id: professionalData.uuid,
    type: "general",
  });

  const pecosPortalData = await insertWebPortals({
    professional_id: professionalData.uuid,
    username: pecos_username,
    password: pecos_password,
    type: "pecos",
  });

  const uhcPortalData = await insertWebPortals({
    professional_id: professionalData.uuid,
    username: uhc_username,
    password: uhc_password,
    type: "uhc",
  });

  const optumPortalData = await insertWebPortals({
    professional_id: professionalData.uuid,
    username: optum_username,
    password: optum_password,
    type: "optum",
  });

  const availityPortalData = await insertWebPortals({
    professional_id: professionalData.uuid,
    username: availity_username,
    password: availity_password,
    type: "availity",
  });

  const medicaidPortalData = await insertWebPortals({
    professional_id: professionalData.uuid,
    username: medicaid_username,
    password: medicaid_password,
    type: "medicaid",
  });

  const echoPortalData = await insertWebPortals({
    professional_id: professionalData.uuid,
    username: echo_username,
    password: echo_password,
    type: "echo",
  });

  const payspanPortalData = await insertWebPortals({
    professional_id: professionalData.uuid,
    username: payspan_username,
    password: payspan_password,
    type: "payspan",
  });

  const billingPortalData = await insertWebPortals({
    professional_id: professionalData.uuid,
    username: billing_software_username,
    password: billing_software_password,
    type: "billing",
  });

  const ediPortalData = await insertWebPortals({
    professional_id: professionalData.uuid,
    username: edi_username,
    password: edi_password,
    type: "edi",
  });

  const faxPortalData = await insertWebPortals({
    professional_id: professionalData.uuid,
    username: fax_username,
    password: fax_password,
    type: "fax",
  });

  const molinaPortalData = await insertWebPortals({
    professional_id: professionalData.uuid,
    username: molina_username,
    password: molina_password,
    type: "molina",
  });

  const caqhPortalData = await insertWebPortals({
    professional_id: professionalData.uuid,
    user_id: caqh_user_id,
    username: caqh_username,
    password: caqh_password,
    expiry_date: caqh_reattestation_date,
    type: "caqh",
  });

  const bankPortalData = await insertWebPortals({
    professional_id: professionalData.uuid,
    platform_name: bank_name,
    username: bank_username,
    password: bank_password,
    type: "bankLogin",
  });
};
