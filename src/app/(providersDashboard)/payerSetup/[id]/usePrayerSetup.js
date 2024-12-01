import { useState, useEffect } from "react";
import { format, parse } from "date-fns";
import { defaultFormData } from "./utilis";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { useProviders } from "@/hooks/useProvider";

export const usePayerSetup = () => {
	const [application, setShowApplication] = useState(false);
	const [payerSetups, setPayerSetups] = useState([]);
	const [formData, setFormData] = useState(defaultFormData);
	const [isEditing, setIsEditing] = useState(false);
	const [editingId, setEditingId] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const { id: provider_id_params } = useParams();

	const { getProviderByName, providers, getProviderNameByUuid } =
		useProviders();

	useEffect(() => {
		fetchPayerSetups();
	}, [providers]);

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
				`/api/payer-setup?provider_id=${provider_id_params}`
				// `/api/payer-setup`
			);
			if (!response.ok) {
				throw new Error(
					`Failed to fetch payer setups. Status: ${response.status}`
				);
			}
			const data = await response.json();
			const formattedData = data.map((record) => ({
				...record,
				provider: getProviderNameByUuid(record.provider_id),
			}));
			setPayerSetups(formattedData);
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
			const providerData = getProviderByName(formData.provider);
			const provider_id = providerData.uuid;
			if (!validateForm()) return;
			const loadingToast = toast.loading(
				isEditing ? "Updating payer setup..." : "Creating new payer setup..."
			);
			const url = isEditing
				? `/api/payer-setup/${editingId}`
				: "/api/payer-setup";
			const method = isEditing ? "PUT" : "POST";

			const response = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...formData,
					provider_id,
				}),
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
			toast.success(
				isEditing
					? "Payer setup updated successfully"
					: "Payer setup created successfully",
				{ id: loadingToast }
			);
		} catch (error) {
			setError(error.message);
			console.error("Error submitting form:", error);
			toast.error(`Error: ${error.message}`, {
				id: loadingToast,
			});
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = (setup) => {
		setError(null);
		try {
			const parsedDate = parse(
				setup.application_date,
				"yyyy-MM-dd",
				new Date()
			);
			const formattedDate = format(parsedDate, "MM/dd/yyyy");
			setFormData({
				state: setup.state,
				plan_type: setup.plan_type,
				business: setup.business,
				provider: setup.provider,
				payer_name: setup.payer_name,
				status: setup.status,
				application_date: formattedDate,
				note: setup.note,
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
		const loadingToast = toast.loading("Deleting payer setup...");

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
			toast.success("Payer setup deleted successfully", {
				id: loadingToast,
			});
		} catch (error) {
			setError(error.message);
			console.error("Error deleting payer setup:", error);
			toast.error(`Error: ${error.message}`, {
				id: loadingToast,
			});
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
