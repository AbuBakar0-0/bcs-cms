import { toast } from "react-hot-toast";
export const validateNumber = (value, length, fieldName) => {
	if (!value) {
		toast.error(`${fieldName} is required`);
		return false;
	}

	const cleanedValue = value.toString().replace(/[^0-9]/g, "");

	const numberPattern = new RegExp(`^\\d{${length}}$`);
	if (!numberPattern.test(cleanedValue)) {
		toast.error(`${fieldName} must be exactly ${length} digits`);
		return false;
	}

	return true;
};

export const isEqual = (val, val1) =>
	val.toLowerCase().trim() === val1.toLowerCase().trim();

export const validateAlphanumeric = (value, maxLength, fieldName) => {
	const alphanumericPattern = new RegExp(`^[a-zA-Z0-9]{1,${maxLength}}$`);
	if (!alphanumericPattern.test(value)) {
		toast.error(
			`${fieldName} must be alphanumeric and maximum ${maxLength} characters`
		);
		return false;
	}
	return true;
};
