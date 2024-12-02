// hooks/useProfessionalReferences.js
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import { medicalTitles } from "@/data/medicalTitles";
import getData from "@/hooks/getData";
import { useParams } from "next/navigation";

const initialFormState = {
	provider_type: "",
	first_name: "",
	middle_initial: "",
	last_name: "",
	address_line_1: "",
	address_line_2: "",
	country: "USA",
	city: "",
	state: "",
	zip_code: "",
	cell_phone: "",
	fax: "",
	email: "",
};

export const useProfessionalReferences = () => {
	const [reference, setReference] = useState(false);
	const [references, setReferences] = useState([]);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState(initialFormState);
	const [editingId, setEditingId] = useState(null);
	const { id: provider_id } = useParams();
	const validators = {
		provider_type: (value) => {
			if (!value || value === "Select Title") {
				return "Provider Type is required";
			}
			if (!medicalTitles.includes(value)) {
				return "Invalid Provider Type";
			}
		},
		first_name: (value) => {
			if (!value?.trim()) return "First Name is required";
			if (value.length < 2) return "First Name must be at least 2 characters";
		},
		middle_initial: (value) => {
			if (value && value.length > 2)
				return "Middle Initial should be a two characters";
		},
		last_name: (value) => {
			if (!value?.trim()) return "Last Name is required";
			if (value.length < 2) return "Last Name must be at least 2 characters";
		},
		address_line_1: (value) => {
			if (!value?.trim()) return "Address Line 1 is required";
		},
		city: (value) => {
			if (!value?.trim()) return "City is required";
		},
		state: (value) => {
			if (!value || value === "Select State") return "State is required";
			if (!stateAbbreviations.includes(value)) return "Invalid State";
		},
		zip_code: (value) => {
			if (!value) return "ZIP Code is required";
			if (!/^\d{5}(-\d{4})?$/.test(value)) return "Invalid ZIP Code format";
		},
		cell_phone: (value) => {
			if (!value) return "Cell Phone is required";
			if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(value))
				return "Invalid phone number format";
		},
		fax: (value) => {
			if (value && !/^\(\d{3}\) \d{3}-\d{4}$/.test(value))
				return "Invalid fax number format";
		},
		email: (value) => {
			if (!value) return "Email is required";
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
				return "Invalid email format";
		},
	};

	const validateForm = () => {
		const errors = [];

		for (const [field, validator] of Object.entries(validators)) {
			const error = validator(formData[field]);
			if (error) errors.push(error);
		}

		return errors;
	};

	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await getData(
				`/api/professional-references?provider_id=${provider_id}`
			);
			if (response.data) {
				setReferences(response.data);
			}
		} catch (error) {
			toast.error("Error fetching references");
			console.error("Error:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleReference = () => {
		setReference(!reference);
		if (!reference) {
			setFormData(initialFormState);
			setEditingId(null);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (value === "Select State" || value === "Select Title") return;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const errors = validateForm();
		if (errors.length > 0) {
			toast.error(errors.join("\n"));
			return;
		}

		setLoading(true);
		try {
			const url = editingId
				? `/api/professional-references/${editingId}`
				: "/api/professional-references";

			const response = await fetch(url, {
				method: editingId ? "PUT" : "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...formData, provider_id }),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || "Failed to save reference");
			}

			toast.success(
				editingId
					? "Reference updated successfully"
					: "Reference added successfully"
			);

			setFormData(initialFormState);
			setReference(false);
			setEditingId(null);
			fetchData();
		} catch (error) {
			toast.error(error.message || "Error saving reference");
			console.error("Error:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = (ref) => {
		setFormData({
			provider_type: ref.provider_type || "",
			first_name: ref.first_name || "",
			middle_initial: ref.middle_initial.trim() || "",
			last_name: ref.last_name || "",
			address_line_1: ref.address_line_1 || "",
			address_line_2: ref.address_line_2 || "",
			country: ref.country || "USA",
			city: ref.city || "",
			state: ref.state || "",
			zip_code: ref.zip_code || "",
			cell_phone: ref.cell_phone || "",
			fax: ref.fax || "",
			email: ref.email || "",
		});
		setEditingId(ref.uuid);
		setReference(true);
	};

	const handleDelete = async (uuid) => {
		if (!confirm("Are you sure you want to delete this reference?")) {
			return;
		}

		setLoading(true);
		try {
			const response = await fetch(`/api/professional-references/${uuid}`, {
				method: "DELETE",
			});

			if (response.ok) {
				toast.success("Reference deleted successfully");
				fetchData();
			} else {
				const error = await response.json();
				throw new Error(error.message || "Error deleting reference");
			}
		} catch (error) {
			toast.error(error.message || "Error deleting reference");
			console.error("Error:", error);
		} finally {
			setLoading(false);
		}
	};

	return {
		reference,
		references,
		loading,
		formData,
		editingId,
		handleReference,
		handleInputChange,
		handleSubmit,
		handleEdit,
		handleDelete,
	};
};
