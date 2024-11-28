export const validateCredsContactForm = (data) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (data.credentialingTitle === "Select Title") return "Title is required";

	if (!data.mailingAddress1?.trim()) return "Address is required";

	if (!data.mailingCity?.trim()) return "City is required";

	if (data.mailingState === "Select State") return "State is required";

	if (!data.mailingZipCode?.trim()) return "ZIP code is required";

	if (!data.homePhone?.trim()) return "homePhone phone is required";

	if (!data.cellPhone?.trim()) return "Cell phone is required";

	if (!data.workEmail?.trim()) return "Work email is required";

	if (data.workEmail && !emailRegex.test(data.workEmail))
		return "Invalid work email format";

	if (data.personalEmail && !emailRegex.test(data.personalEmail))
		return "Invalid personal email format";

	if (!data.emergencyContactName?.trim())
		return "Emergency contact name is required";

	if (data.emergencyContactRelation === "Select Relationship")
		return "Relationship is required";

	if (!data.emergencyContactPhone?.trim()) return "Emergency phone is required";

	if (!data.emergencyContactEmail?.trim()) return "Emergency email is required";

	if (
		data.emergencyContactEmail &&
		!emailRegex.test(data.emergencyContactEmail)
	)
		return "Invalid emergency contact email format";

	return "";
};
