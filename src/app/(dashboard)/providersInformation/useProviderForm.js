import { useState } from "react";
import { requiredFields } from "./utilis";
import toast from "react-hot-toast";

export const useProviderForm = () => {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		// Personal Information
		firstName: "",
		middleInitial: "",
		lastName: "",
		providerTitle: "",
		ssn: "",
		gender: "",
		dob: "",
		birthCity: "",
		birthState: "",
		birthCountry: "",
		licenseOrId: "",
		licenseStateIssued: "",
		licenseIssuedDate: "",
		licenseExpiryDate: "",

		// Home Address
		homeAddress1: "",
		homeAddress2: "",
		homeCity: "",
		homeState: "",
		homeZipCode: "",

		// Service Location Address
		serviceAddress1: "",
		serviceAddress2: "",
		serviceCity: "",
		serviceState: "",
		serviceZipCode: "",

		// Mailing Address
		mailingAddress1: "",
		mailingAddress2: "",
		mailingCity: "",
		mailingState: "",
		mailingZipCode: "",

		// Contact Information
		homePhone: "",
		cellPhone: "",
		personalEmail: "",
		workEmail: "",

		// Emergency Contact Information
		emergencyContactName: "",
		emergencyContactRelation: "",
		emergencyContactPhone: "",
		emergencyContactEmail: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleReadonly = (fieldGroup) => {
		console.log(fieldGroup);
		if (fieldGroup === "serviceAddress") {
			setFormData((prev) => ({
				...prev,
				serviceAddress1: formData.homeAddress1,
				serviceAddress2: formData.homeAddress2,
				serviceCity: formData.homeCity,
				serviceState: formData.homeState,
				serviceZipCode: formData.homeZipCode,
			}));
		} else if (fieldGroup === "mailingAddress") {
			setFormData((prev) => ({
				...prev,
				mailingAddress1: formData.serviceAddress1,
				mailingAddress2: formData.serviceAddress2,
				mailingCity: formData.serviceCity,
				mailingState: formData.serviceState,
				mailingZipCode: formData.serviceZipCode,
			}));
		}
	};

	const handleSubmit = async () => {
		const missingFields = requiredFields.filter((field) => !formData[field]);

		if (missingFields.length > 0) {
			alert(`Please fill in the required fields: ${missingFields.join(", ")}`);
			toast.error(`Please fill in the required fields.`);
			return;
		}
		// console.log("Form Data:", formData);
		setLoading(true);
		try {
			const response = await fetch("/api/providers-info", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error("Failed to save provider information");
			}

			const data = await response.json();
			toast.success("Provider information saved successfully!");
			return data;
		} catch (error) {
			console.error("Error:", error);
			toast.error("Failed to save provider information. Please try again.");
		}
		setFormData(formData);
	};

	return {
		formData,
		handleChange,
		handleReadonly,
		handleSubmit,
		loading,
	};
};
