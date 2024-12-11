import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
	documentsList,
	initialFormData,
	providerOptions,
	statusOptions,
} from "./utilis";
import { useParams } from "next/navigation";
import { useProviders } from "@/hooks/useProvider";
import { format, parse } from "date-fns";

export function formatDate(date) {
	const parsedDate = parse(date, "yyyy-MM-dd", new Date());

	const formattedValue = format(parsedDate, "MM/dd/yyyy");
	return formattedValue;
}

export const useDocuments = () => {
	const [showForm, setShowForm] = useState(false);
	const [documents, setDocuments] = useState([]);
	const [formData, setFormData] = useState(initialFormData);
	const [isEditing, setIsEditing] = useState(false);
	const [loading, setLoading] = useState(false);
	const { id: provider_id } = useParams();

	const { getProviderByName } = useProviders();

	const validators = {
		title: (value) => {
			if (!value || value === "Select Document")
				return "Document Type is required";
			if (!documentsList.includes(value)) return "Invalid Document Type";
		},
		provider: (value) => {
			if (!value || value === "Select Provider") return "Provider is required";
		},
		status: (value) => {
			if (!value || value === "Select Status") return "Status is required";
			if (!statusOptions.includes(value)) return "Invalid Status";
		},
		
	};

	const validateForm = () => {
		const errors = [];

		for (const [field, validator] of Object.entries(validators)) {
			const error = validator(formData[field]);
			if (error) errors.push(error);
		}
		console.log(errors);
		return errors;
	};

	const fetchDocuments = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				`/api/documents?uuid=${localStorage.getItem("user_uuid")}`
			);
			if (!response.ok) throw new Error("Failed to fetch documents");
			const data = await response.json();
			setDocuments(data);
		} catch (error) {
			console.error("Error fetching documents:", error);
			toast.error("Failed to fetch documents");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchDocuments();
	}, []);

	const resetForm = () => {
		setFormData(initialFormData);
		setIsEditing(false);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (
			["Select Provider", "Select Document", "Select Status"].includes(value)
		) {
			return;
		}
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
		toast.loading("Please Wait");
		setLoading(true);
		try {
			const formDataToSend = new FormData();
			Object.entries(formData).forEach(([key, value]) => {
				if (value !== null && value !== "") {
					if (key === "provider") {
						const provider = getProviderByName(value);
						formDataToSend.append("provider_id", provider.uuid);
					} else {
						formDataToSend.append(key, value);
					}
				}
			});
			const response = await fetch("/api/documents", {
				method: isEditing ? "PUT" : "POST",
				body: formDataToSend,
			});

			if (!response.ok) throw new Error("Failed to save document");
			toast.dismiss();
			await fetchDocuments();
			setShowForm(false);
			resetForm();
			toast.success(
				`Document ${isEditing ? "updated" : "created"} successfully`
			);
		} catch (error) {
			console.error("Error saving document:", error);
			toast.error("Failed to save document");
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = (doc) => {
		console.log(doc)
		setFormData({
			title: doc.title || "",
			provider: doc.providers_info.first_name+" "+doc.providers_info.last_name || "",
			status: doc.status || "",
			effective_date: doc.effective_date || "",
			expiry_date: doc.expiry_date || "",
			file: doc.url || "",
			existing_url: doc.url || "",
			existing_file_public_id: doc.file_public_id || "",
			uuid: doc.uuid || "",
		});
		setIsEditing(true);
		setShowForm(true);
	};

	const handleDelete = async (doc) => {
		if (!window.confirm("Are you sure you want to delete this document?")) {
			return;
		}

		setLoading(true);
		try {
			const response = await fetch("/api/documents", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					uuid: doc.uuid,
					file_public_id: doc.file_public_id,
				}),
			});

			if (!response.ok) throw new Error("Failed to delete document");

			await fetchDocuments();
			toast.success("Document deleted successfully");
		} catch (error) {
			console.error("Error deleting document:", error);
			toast.error("Failed to delete document");
		} finally {
			setLoading(false);
		}
	};
	
	const handleView = (doc) => {
		if (!doc.url) {
			toast.error("No document file available");
			return;
		}

		if (doc.url.endsWith(".pdf")) {
			const urlParts = doc.url.split("/");
			const docId = urlParts[urlParts.length - 1].replace(".pdf", "");
			const folder = urlParts[urlParts.length - 2];
			const viewUrl = `https://res.cloudinary.com/db7z9hknv/image/upload/f_auto,q_auto/v1/${folder}/${docId}`;
			window.open(viewUrl, "_blank");
		} else {
			window.open(doc.url, "_blank");
		}
	};

	const toggleForm = () => {
		setShowForm(!showForm);
		if (!showForm) {
			resetForm();
		}
	};

	return {
		showForm,
		documents,
		formData,
		isEditing,
		loading,
		handleChange,
		handleSubmit,
		handleEdit,
		handleDelete,
		handleView,
		toggleForm,
		resetForm,
	};
};
