
export const DROPDOWN_OPTIONS = {
	planTypes: [
		"Select Plan",
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
		"Select Business",
		"CHN Medical Support System",
		"Home Health Care",
		"Pharmacy",
		"Urgent Care",
	],
	providers: [
		"Select Provider",
		"Adnan Qamar",
		"John Doe",
		"John Wick",
		"Zanjeel Malik",
	],
	statuses: [
		"Requested Application",
		"Submitted",
		"In-Progress",
		"Approved",
		"Rejected",
		"Panel Closed",
		"Missing Information",
	],
};
export const defaultFormData = {
	state: "",
	plan_type: "",
	business: "",
	provider: "",
	payer_name: "",
};
