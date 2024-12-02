import { isEqual, validateAlphanumeric, validateNumber } from "@/utils/utility";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const DEFAULT_STATE = {
	// Practice Information
	type: "",
	type_of_service_provided: "",
	credentialing_type: "",
	npi_2: "",
	tax_id: "",
	legal_business_name: "",
	doing_business_name: "",
	taxonomy_code_1: "",
	taxonomy_code_2: "",

	// Service Address
	service_address1: "",
	service_address2: "",
	service_city: "",
	service_state: "",
	service_zipcode: "",
	service_phone: "",
	service_appointment_phone: "",
	service_fax: "",
	service_email: "",

	// Mailing Address
	mailing_address1: "",
	mailing_address2: "",
	mailing_city: "",
	mailing_state: "",
	mailing_zipcode: "",
	mailing_phone: "",
	mailing_fax: "",
	mailing_email: "",

	// Correspondence Address
	correspondence_address1: "",
	correspondence_address2: "",
	correspondence_city: "",
	correspondence_state: "",
	correspondence_zipcode: "",
	correspondence_phone: "",
	correspondence_fax: "",
	correspondence_email: "",

	// Additional Information
	ptan_medicare_number: "",
	medicaid_number: "",
	start_date: "",

	// Practice Contact
	practice_contact_role: "",
	practice_contact_name: "",
	practice_contact_email: "",
	practice_contact_work_phone: "",
	practice_contact_cell_phone: "",
};
export const usePracticeProfile = () => {
	const [formData, setFormData] = useState(DEFAULT_STATE);
	const { id: provider_id } = useParams();

	const validateForm = () => {
		if (isEqual(formData.type, "Select Type") || !formData.type) {
			toast.error("Please select a Practice Type");
			return false;
		}

		if (
			isEqual(formData.type_of_service_provided, "Select Service") ||
			!formData.type_of_service_provided
		) {
			toast.error("Please select a Service Type");
			return false;
		}

		if (
			isEqual(formData.credentialing_type, "Select Type") ||
			!formData.credentialing_type
		) {
			toast.error("Please select a Credentialing Type");
			return false;
		}

		if (
			isEqual(formData.practice_contact_role, "Select Role") ||
			!formData.practice_contact_role
		) {
			toast.error("Please select a Contact Role");
			return false;
		}

		// Validate numbers
		if (formData.npi_2 && !validateNumber(formData.npi_2, 10, "NPI 2")) {
			return false;
		}

		if (formData.tax_id && !validateNumber(formData.tax_id, 9, "Tax ID")) {
			return false;
		}

		// Validate Practice Names
		if (
			!validateAlphanumeric(
				formData.legal_business_name,
				50,
				"Legal Business Name"
			)
		) {
			return false;
		}

		if (
			formData.doing_business_name &&
			!validateAlphanumeric(
				formData.doing_business_name,
				50,
				"Doing Business Name"
			)
		) {
			return false;
		}

		// Validate Required Addresses
		const validateAddress = (prefix, required = true) => {
			if (required || formData[`${prefix}_address1`]) {
				if (!formData[`${prefix}_address1`]) {
					toast.error(
						`${
							prefix.charAt(0).toUpperCase() + prefix.slice(1)
						} Address 1 is required`
					);
					return true;
				}
				if (!formData[`${prefix}_city`]) {
					toast.error(
						`${
							prefix.charAt(0).toUpperCase() + prefix.slice(1)
						} City is required`
					);
					return true;
				}
				if (!formData[`${prefix}_state`]) {
					toast.error(
						`${
							prefix.charAt(0).toUpperCase() + prefix.slice(1)
						} State is required`
					);
					return true;
				}
				if (
					!validateNumber(
						formData[`${prefix}_zipcode`],
						5,
						`${prefix.charAt(0).toUpperCase() + prefix.slice(1)} Zipcode`
					)
				) {
					return true;
				}
				if (!formData[`${prefix}_phone`]) {
					toast.error(
						`${
							prefix.charAt(0).toUpperCase() + prefix.slice(1)
						} Phone is required`
					);
					return true;
				}
			}
			return false;
		};

		if (validateAddress("service")) return false;
		if (validateAddress("mailing")) return false;
		if (validateAddress("correspondence")) return false;

		// Validate Contact Information
		if (!formData.practice_contact_name) {
			toast.error("Practice Contact Name is required");
			return false;
		}

		if (!formData.practice_contact_email) {
			toast.error("Practice Contact Email is required");
			return false;
		} else {
			const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailPattern.test(formData.practice_contact_email)) {
				toast.error("Invalid email format");
				return false;
			}
		}

		if (!formData.practice_contact_work_phone) {
			toast.error("Practice Contact Work Phone is required");
			return false;
		}

		return true;
	};

	// Handle all input changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (["Select Type", "Select Service", "Select Role"].includes(value))
			return;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Copy service address to mailing address
	const copyServiceAddress = (e) => {
		if (e.target.checked) {
			const fieldsToUpdate = {
				mailing_address1: formData.service_address1,
				mailing_address2: formData.service_address2,
				mailing_city: formData.service_city,
				mailing_state: formData.service_state,
				mailing_zipcode: formData.service_zipcode,
				mailing_phone: formData.service_phone,
				mailing_fax: formData.service_fax,
				mailing_email: formData.service_email,
			};

			setFormData((prev) => ({
				...prev,
				...fieldsToUpdate,
			}));
		}
	};

	// Copy mailing address to correspondence address
	const copyMailingAddress = (e) => {
		if (e.target.checked) {
			const fieldsToUpdate = {
				correspondence_address1: formData.mailing_address1,
				correspondence_address2: formData.mailing_address2,
				correspondence_city: formData.mailing_city,
				correspondence_state: formData.mailing_state,
				correspondence_zipcode: formData.mailing_zipcode,
				correspondence_phone: formData.mailing_phone,
				correspondence_fax: formData.mailing_fax,
				correspondence_email: formData.mailing_email,
			};

			setFormData((prev) => ({
				...prev,
				...fieldsToUpdate,
			}));
		}
	};

	// Form submission handler
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) {
			return;
		}
		const loadingToastId = toast.loading("Saving practice profile...");

		try {
			const response = await fetch("/api/practice-profile", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...formData, provider_id }),
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const result = await response.json();
			toast.success("Practice profile saved successfully!", {
				id: loadingToastId,
			});
			setFormData(DEFAULT_STATE);
		} catch (error) {
			console.error("Error:", error);
			toast.error("Error saving practice profile", error.message, {
				id: loadingToastId,
			});
		}
	};

	const PRACTICE_TYPES = [
		"Select Type",
		"Medical",
		"Dental",
		"Behavioural Health",
		"Vision",
		"Multi Speciality",
	];

	const SERVICE_TYPES = [
		"Select Service",
		"Solo Primary Care",
		"Solo Speciality Care",
		"Solo SPE / PCP",
		"Group Primary Care",
		"Group Speciality Care",
		"Group of Multi-Speciality",
	];

	const CREDENTIALING_TYPES = [
		"Select Type",
		"Initial Credentialing",
		"Demographic Updates",
		"Re Credentialing",
		"Medical Licensure",
		"Individual Practitioner",
		"Group Practice Facility",
		"Member as a Group",
		"Location Add",
	];

	const CONTACT_ROLES = [
		"Select Role",
		"CFO( Chief Financial Officer)",
		"CTO (Chief Technology Officer)",
		"CEO ( Chief Executive Officer)",
		"Owner",
		"Administrator",
		"Office Manager",
		"Contractor",
	];

	return {
		formData,
		handleInputChange,
		copyServiceAddress,
		copyMailingAddress,
		handleSubmit,
		PRACTICE_TYPES,
		SERVICE_TYPES,
		CREDENTIALING_TYPES,
		CONTACT_ROLES,
	};
};
