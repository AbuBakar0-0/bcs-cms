import { useState } from "react";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import toast from "react-hot-toast";
import { validateForm } from "./utilis";
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const useProfessionalIdsForm = () => {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		hasNPI: "No",
		npi1: "",
		npi2: "",
		taxId: "",
		upin: "",

		medicare: [
			{
				number: "",
				state: stateAbbreviations[0] || "",
				effectiveDate: "",
				expiryDate: "",
				hasMedicare: "No",
			},
		],
		medicaid: [
			{
				number: "",
				state: stateAbbreviations[0] || "",
				effectiveDate: "",
				expiryDate: "",
				hasMedica: "No",
			},
		],
		stateLicense: [
			{
				number: "",
				state: stateAbbreviations[0] || "",
				effectiveDate: "",
				expiryDate: "",
				hasStateLicense: "No",
			},
		],
		clia: [
			{
				number: "",
				state: stateAbbreviations[0] || "",
				effectiveDate: "",
				expiryDate: "",
				hasClia: "No",
			},
		],
		dea: [
			{
				number: "",
				state: stateAbbreviations[0] || "",
				effectiveDate: "",
				expiryDate: "",
				hasDea: "No",
			},
		],
		cds: [
			{
				number: "",
				state: stateAbbreviations[0] || "",
				effectiveDate: "",
				expiryDate: "",
				hasCds: "No",
			},
		],

		// Insurance fields
		professionalLiabilityPolicyNumber: "",
		professionalLiabilityEffectiveDate: "",
		professionalLiabilityExpiryDate: "",
		professionalLiabilityAggregate: "",

		generalLiabilityPolicyNumber: "",
		generalLiabilityEffectiveDate: "",
		generalLiabilityExpiryDate: "",
		generalLiabilityAggregate: "",

		// Portal credentials
		caqhUserId: "",
		caqhUsername: "",
		caqhPassword: "",

		pecosUsername: "",
		pecosPassword: "",

		uhcUsername: "",
		uhcPassword: "",

		optumUsername: "",
		optumPassword: "",

		availityUsername: "",
		availityPassword: "",

		medicaidUsername: "",
		medicaidPassword: "",
	});

	const arrayFields = [
		"medicare",
		"medicaid",
		"stateLicense",
		"clia",
		"dea",
		"cds",
	];

	const handleChange = (e, index, field) => {
		const { name, value } = e.target;
		console.log(name, value);
		if (arrayFields.includes(field)) {
			setFormData((prev) => {
				const updatedField = [...prev[field]];
				updatedField[index] = { ...updatedField[index], [name]: value };
				if (name === `has${capitalize(field)}`) {
					updatedField[index].readonly = value === "No";
				}

				return { ...prev, [field]: updatedField };
			});
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const handleAddField = (field) => {
		if (!arrayFields.includes(field)) return;

		const newEntry = {
			number: "",
			state: stateAbbreviations[0] || "",
			effectiveDate: "",
			expiryDate: "",
		};

		setFormData((prev) => ({
			...prev,
			[field]: [...prev[field], newEntry],
		}));
	};

	const handleRemoveField = (field, index) => {
		if (!arrayFields.includes(field)) return;

		setFormData((prev) => {
			const updatedField = [...prev[field]];
			updatedField.splice(index, 1);
			return { ...prev, [field]: updatedField };
		});
	};

	const handleSubmit = async () => {
		const missingFields = validateForm(formData);
		console.log(formData);
		if (missingFields.length > 0) {
			toast.error(
				`Please fill in the required fields: ${missingFields.join(", ")}`
			);
			return;
		}

		try {
			setLoading(true);
			const response = await fetch("/api/professional-ids", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error("Failed to save professional information");
			}

			const data = await response.json();
			toast.success("Professional information saved successfully!");
			return data;
		} catch (error) {
			console.error("Error:", error);
			toast.error("Failed to save professional information. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return {
		formData,
		handleChange,
		handleAddField,
		handleRemoveField,
		handleSubmit,
		loading,
	};
};
