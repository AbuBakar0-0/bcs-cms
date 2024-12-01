import { format, parse } from "date-fns";

export const formatSSN = (value) => {
	value = value.replace(/\D/g, ""); // Remove all non-numeric characters
	const length = value.length;

	// Hide all but the last 4 digits with *
	if (length > 8) {
		return `***-**-${value.slice(-4)}`;
	}

	// If the length is less than or equal to 4, return the input as is
	return value;
};

export const formatDOB = (value) => {
	value = value.replace(/\D/g, "");
	if (value.length > 8) value = value.slice(0, 8);
	if (value.length > 2 && value.length <= 4) {
		return `${value.slice(0, 2)}/${value.slice(2)}`;
	} else if (value.length > 4) {
		return `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
	}
	return value;
};

export const formatZip = (value) => {
	value = value.replace(/\D/g, "");
	return value.length > 5 ? `${value.slice(0, 5)}-${value.slice(5, 9)}` : value;
};

export const formatPhoneNumber = (value) => {
	value = value.replace(/\D/g, ""); // Remove non-digits
	if (value.length > 10) value = value.slice(0, 10); // Limit to 10 digits

	if (value.length > 3 && value.length <= 6) {
		return `(${value.slice(0, 3)}) ${value.slice(3)}`;
	} else if (value.length > 6) {
		return `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
	}
	return value;
};

export function formatDate(date) {
	const parsedDate = parse(date, "yyyy-MM-dd", new Date());

	const formattedValue = format(parsedDate, "MM/dd/yyyy");
	return formattedValue;
}
