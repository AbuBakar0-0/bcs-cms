import { specialities } from "@/data/specialities";

export const degrees = [
	"MD - Doctor of Medicine",
	"DO - Doctor of Osteopathy",
	"DDS - Doctor of Dental Surgery",
	"DMD - Doctor of Dental Medicine",
	"DPM - Doctor of Podiatric Medicine",
	"DC - Doctor of Chiropractic",
	"ND - Doctor of Naturopathic Medicine",
	"OD - Doctor of Optometry",
	"DPT - Doctor of Physical Therapy",
	"DNP - Doctor of Nursing Practice",
	"PhD - Doctor of Philosophy (in healthcare-related fields)",
	"PsyD - Doctor of Psychology",
	"MSN - Master of Science in Nursing",
	"MPH - Master of Public Health",
	"MSW - Master of Social Work",
	"PA - Physician Assistant, Certified",
	"FNP - Family Nurse Practitioner",
	"NP - Nurse Practitioner",
	"CRNA - Certified Registered Nurse Anesthetist",
	"LCSW - Licensed Clinical Social Worker",
	"LMFT - Licensed Marriage and Family Therapist",
	"LPC - Licensed Professional Counselor",
	"RD - Registered Dietitian",
	"RPh - Registered Pharmacist",
];

export const eduOptions = [
	"Internship",
	"Residency",
	"Undergraduate",
	"Professional School",
	"Fifth Pathway",
];

export const DEFAULT_TRAINING = {
	uuid: null,
	training_type: "Residency",
	country: "",
	state: "",
	county: "",
	hospital_name: "",
	affiliated_university: "",
	email: "",
	start_date: "",
	end_date: "",
	type_of_program: "",
	department: "",
	speciality: specialities[0] || "",
	is_completed: "",
};
export const DEFAULT_EDUCATION = {
	uuid: null,
	type: "Internship",
	country: "",
	state: "",
	county: "",
	professional_school: "",
	degree: degrees[0] || "",
	start_date: "",
	end_date: "",
};
