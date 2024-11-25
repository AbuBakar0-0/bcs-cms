import payers from "@/data/payers";
import { stateAbbreviations } from "@/data/stateAbbreviations";

export const DROPDOWN_OPTIONS = {
	planTypes: [
		"All",
		"EPO",
		"HMO",
		"PPO",
		"HMO/P/OS combined",
		"PPO/EPO combined",
		"HSA",
		"HDHP",
		"MCO",
		"Medigap",
	],
	businesses: [
		"CHN Medical Support",
		"Home Health Care",
		"Pharmacy",
		"Urgent Care",
	],
	providers: ["Adnan Qamar", "John Doe", "John Wick", "Zanjeel Malik"],
	statuses: [
		"Submitted",
		"In-Progress",
		"Approved",
		"Rejected",
		"Panel Closed",
		"Missing Information",
	],
};
export const defaultFormData = {
	state: stateAbbreviations[0],
	plan_type: DROPDOWN_OPTIONS.planTypes[0],
	business: DROPDOWN_OPTIONS.businesses[0],
	provider: DROPDOWN_OPTIONS.providers[0],
	payer_name: payers[0],
	status: DROPDOWN_OPTIONS.statuses[0],
	date: "",
	notes: "",
};
