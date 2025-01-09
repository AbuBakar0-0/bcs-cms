export const documentsList = [
  "IRS Letter (It could be your SS-4, CP 575 or 147C)",
  "Professional State License or Business License",
  "State Release",
  "Professional Liability Insurance Certificate (Malpractice COI)",
  "General Liability Insurance",
  "Voided Check or Bank Letter (Must contain Exact Name as it is on IRS Letter)",
  "Board Certification",
  "DEA Certification",
  "DEA Waiver",
  "CLIA Certification",
  "Business Registration",
  "Lease Agreement",
  "Utility bill",
  "W9 Form",
  "Professional Degree",
  "Provider Resume in MM/YYYY format",
  "Hospital Affiliation",
  "Hospital Privileges Letter",
  "Pharmacy Certificate",
  "BLC Certificate",
  "Accreditation",
  "Background Screening",
];

export const initialFormData = {
  documentTitle: documentsList[0],
  provider: "",
  status: "",
  issueDate: "",
  expiryDate: "",
  file: null,
};

export const statusOptions = [
  "Active",
  "Missing",
  "Expiring",
  "Expired",
  "On File",
  "Requested Provider",
];