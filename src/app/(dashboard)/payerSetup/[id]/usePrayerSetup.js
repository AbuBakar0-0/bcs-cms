import { useState, useEffect } from "react";
import { format, parse } from "date-fns";
import { defaultFormData } from "./utilis";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";

export const usePayerSetup = () => {
	const [application, setShowApplication] = useState(false);
	const [payerSetups, setPayerSetups] = useState([]);
	const [formData, setFormData] = useState(defaultFormData);
	const [isEditing, setIsEditing] = useState(false);
	const [editingId, setEditingId] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const { id: provider_id } = useParams();
	useEffect(() => {
		fetchPayerSetups();
	}, []);

	const resetForm = () => {
		setFormData(defaultFormData);
		setIsEditing(false);
		setEditingId(null);
		setError(null);
	};

	const toggleApplication = () => {
		setShowApplication((prev) => !prev);
		if (!application) {
			resetForm();
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		if (
			[
				"Select State",
				"Select Status",
				"Select Business",
				"Select Plan",
				"Select Provider",
			].includes(value)
		)
			return;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		setError(null);
	};

	const validateForm = () => {
		const requiredFields = Object.keys(defaultFormData);
		const missingFields = requiredFields.filter((field) => !formData[field]);

		if (missingFields.length > 0) {
			toast.error(
				`Please fill in all required fields: ${missingFields.join(", ")}`
			);
			return false;
		}
		return true;
	};

	const fetchPayerSetups = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch(
				`/api/payer-setup?provider_id=${provider_id}`
			);
			if (!response.ok) {
				throw new Error(
					`Failed to fetch payer setups. Status: ${response.status}`
				);
			}
			const data = await response.json();
			setPayerSetups(data);
		} catch (error) {
			setError(error.message);
			console.error("Error fetching payer setups:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async () => {
		setLoading(true);
		setError(null);
		try {
			if (!validateForm()) return;

			const url = isEditing
				? `/api/payer-setup/${editingId}`
				: "/api/payer-setup";
			const method = isEditing ? "PUT" : "POST";

			const response = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...formData, provider_id }),
			});

			if (!response.ok) {
				throw new Error(
					`Failed to ${isEditing ? "update" : "create"} payer setup. Status: ${
						response.status
					}`
				);
			}

			await fetchPayerSetups();
			setShowApplication(false);
			resetForm();
		} catch (error) {
			setError(error.message);
			console.error("Error submitting form:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = (setup) => {
		setError(null);
		try {
			const parsedDate = parse(setup.date, "yyyy-MM-dd", new Date());
			const formattedDate = format(parsedDate, "MM/dd/yyyy");

			setFormData({
				state: setup.state,
				plan_type: setup.plan_type,
				business: setup.business,
				provider: setup.provider,
				payer_name: setup.payer_name,
				status: setup.status,
				date: formattedDate,
				notes: setup.notes,
			});

			setIsEditing(true);
			setEditingId(setup.uuid);
			setShowApplication(true);
		} catch (error) {
			setError("Error processing date format");
			console.error("Error editing payer setup:", error);
		}
	};

	const handleDelete = async (uuid) => {
		setLoading(true);
		setError(null);

		try {
			if (
				!window.confirm("Are you sure you want to delete this payer setup?")
			) {
				return;
			}

			const response = await fetch(`/api/payer-setup/${uuid}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error(
					`Failed to delete payer setup. Status: ${response.status}`
				);
			}
			if (editingId === uuid) {
				resetForm();
			}
			await fetchPayerSetups();
		} catch (error) {
			setError(error.message);
			console.error("Error deleting payer setup:", error);
		} finally {
			setLoading(false);
		}
	};

	return {
		// State
		application,
		payerSetups,
		formData,
		isEditing,
		loading,
		error,

		// handle
		toggleApplication,
		handleChange,
		handleSubmit,
		handleEdit,
		handleDelete,
	};
};
