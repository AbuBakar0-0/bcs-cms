import { capitalize } from "./useProffesionalIds";

export const validateForm = (formData) => {
	const missingFields = [];

	if (formData.hasNPI === "Yes") {
		if (!formData.npi1 && !formData.npi2) {
			missingFields.push("NPI");
		}
		if (!formData.taxId) {
			missingFields.push("Tax ID");
		}
	}

	const arrayFieldsToValidate = [
		"medicare",
		"medicaid",
		"stateLicense",
		"clia",
		"dea",
		"cds",
	];

	arrayFieldsToValidate.forEach((field) => {
		formData[field].forEach((item, index) => {
			if (item[`has${capitalize(field)}`] === "Yes") {
				if (!item.number) {
					missingFields.push(
						`${capitalize(field)} Number (Entry ${index + 1})`
					);
				}
				if (!item.state) {
					missingFields.push(`${capitalize(field)} State (Entry ${index + 1})`);
				}
			}
		});
	});

	const insuranceFields = [
		"professionalLiabilityPolicyNumber",
		"generalLiabilityPolicyNumber",
	];

	insuranceFields.forEach((field) => {
		if (!formData[field]) {
			missingFields.push(
				field
					.replace(/([A-Z])/g, " $1")
					.replace(/^./, (str) => str.toUpperCase())
			);
		}
	});

	const portalFields = [
		"caqh",
		"pecos",
		"uhc",
		"optum",
		"availity",
		"medicaid",
	];

	portalFields.forEach((portal) => {
		const username = formData[`${portal}Username`];
		const password = formData[`${portal}Password`];

		if (username && !password) {
			missingFields.push(`${capitalize(portal)} Password`);
		}
	});

	return missingFields;
};
