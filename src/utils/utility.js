import { toast } from "react-hot-toast";
export const validateNumber = (value, length, fieldName) => {
	const numberPattern = new RegExp(`^\\d{${length}}$`);
	if (!numberPattern.test(value)) {
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
