import { useEffect, useState } from "react";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import toast from "react-hot-toast";
import { validateForm } from "./utilis";
import { useParams } from "next/navigation";
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const defaultState = {
	hasNPI: "Select Option",
	npi1: "",
	npi2: "",
	taxId: "",
	upin: "",

	medicare: [
		{
			number: "",
			state: "",
			effectiveDate: "",
			expiryDate: "",
			hasMedicare: "Select Option",
		},
	],
	medicaid: [
		{
			number: "",
			state: "",
			effectiveDate: "",
			expiryDate: "",
			hasMedicaid: "Select Option",
		},
	],
	stateLicense: [
		{
			number: "",
			state: "",
			effectiveDate: "",
			expiryDate: "",
			hasStateLicense: "Select Option",
		},
	],
	clia: [
		{
			number: "",
			state: "",
			effectiveDate: "",
			expiryDate: "",
			hasClia: "Select Option",
		},
	],
	dea: [
		{
			number: "",
			state: "",
			effectiveDate: "",
			expiryDate: "",
			hasDea: "Select Option",
		},
	],
	cds: [
		{
			number: "",
			state: "",
			effectiveDate: "",
			expiryDate: "",
			hasCds: "Select Option",
		},
	],

	// Insurance fields
	professionalLiabilityPolicyName: "",
	professionalLiabilityPolicyNumber: "",
	professionalLiabilityEffectiveDate: "",
	professionalLiabilityExpiryDate: "",
	professionalLiabilityAggregate: "",

	generalLiabilityPolicyName: "",
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

	bankLoginUsername: "",
	bankLoginPassword: "",

	echoUsername: "",
	echoPassword: "",

	payspanUsername: "",
	payspanPassword: "",

	billingUsername: "",
	billingPassword: "",

	ediUsername: "",
	ediPassword: "",

	faxUsername: "",
	faxPassword: "",

	molinaUsername: "",
	molinaPassword: "",

	otherPlatformName: "",
	otherUsername: "",
	otherPassword: "",
};
export const useProfessionalIdsForm = () => {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState(defaultState);
	const { id: provider_id } = useParams();
	const arrayFields = [
		"medicare",
		"medicaid",
		"stateLicense",
		"clia",
		"dea",
		"cds",
	];

	useEffect(() => {
		const fetchData = async () => {
			if (!provider_id) return;

			setLoading(true);
			try {
				const response = await fetch(
					`/api/professional-ids?provider_id=${provider_id}`
				);
				if (!response.ok) {
					if (response.status === 404) {
						setFormData(defaultState);
						return;
					}
					throw new Error("Failed to fetch data");
				}

				const data = await response.json();
				setFormData((prev) => ({
					...defaultState,
					...data,
				}));
			} catch (error) {
				console.error("Error fetching data:", error);
				toast.error("Failed to load provider information");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [provider_id]);

	const handleChange = (e, index, field) => {
		const { name, value } = e.target;
		if (["Select State", "Select Aggregate", "Select Option"].includes(name))
			return;
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
			toast.loading("Adding Entry");
			const response = await fetch("/api/professional-ids", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...formData, provider_id }),
			});

			if (!response.ok) {
				throw new Error("Failed to save professional information");
			}

			const data = await response.json();
			toast.dismiss();
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
