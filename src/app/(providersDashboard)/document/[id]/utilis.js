export const documentsList = [
	"IRS Letter (It could be your SS-4, CP 575 or 147C)",
	"Professional State License or Business License",
	"State Release",
	"Professional Liability Insurance Certificate (Malpractice COI)",
	"General Liability Insurance (if applicable)",
	"Voided Check or Bank Letter (Must contain Exact Name as it is on IRS Letter)",
	"Board Certification (if applicable)",
	"DEA Certification (if applicable)",
	"DEA Waiver (if applicable)",
	"CLIA Certification (if applicable)",
	"Business Registration (Article of Incorporation if applicable)",
	"Lease Agreement",
	"Utility bill",
	"W9 Form",
	"Professional Degree",
	"Provider Resume in MM/YYYY format",
	"Hospital Affiliation",
	"Hospital Privileges Letter (if applicable)",
	"Pharmacy Certificate (if applicable)",
	"BLC Certificate",
	"Accreditation (if applicable)",
	"Background Screening (if applicable)",
];

export const providerOptions = [
	"Adnan Qamar",
	"John Doe",
	"John Wick",
	"Zanjeel Malik",
];

export const statusOptions = [
	"Active",
	"Missing",
	"Expiring",
	"Expired",
	"On File",
	"Requested Provider",
];

export const initialFormData = {
	documentTitle: documentsList[0],
	provider: providerOptions[0],
	status: statusOptions[0],
	issueDate: "",
	expiryDate: "",
	file: null,
};
