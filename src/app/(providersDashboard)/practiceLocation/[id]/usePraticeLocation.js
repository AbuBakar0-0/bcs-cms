import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const DEFAULT_STATE = {
	legal_business_name: "",
	doing_business_name: "",
	npi_2: "",
	tax_id: "",
	taxonomy_code_1: "",
	taxonomy_code_2: "",
	service_address_1: "",
	service_address_2: "",
	service_city: "",
	service_state: "",
	service_zip: "",
	service_phone: "",
	service_fax: "",
	service_email: "",
	service_appointment_phone: "",
	mailing_address_1: "",
	mailing_address_2: "",
	mailing_city: "",
	mailing_state: "",
	mailing_zip: "",
	mailing_phone: "",
	mailing_fax: "",
	mailing_email: "",
	correspondence_address_1: "",
	correspondence_address_2: "",
	correspondence_city: "",
	correspondence_state: "",
	correspondence_zip: "",
	correspondence_phone: "",
	correspondence_fax: "",
	correspondence_email: "",
	practice_contact_name: "",
	practice_contact_email: "",
	practice_contact_work_phone: "",
	practice_contact_cell_phone: "",
	practice_contact_type: "",
	ptan_medicare_number: "",
	medicaid_number: "",
};

export const usePracticeLocations = () => {
	const [locations, setLocations] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showLocationForm, setShowLocationForm] = useState(false);
	const [editingId, setEditingId] = useState(null);
	const [formData, setFormData] = useState(DEFAULT_STATE);
	const { id: provider_id } = useParams();
	useEffect(() => {
		fetchLocations();
	}, []);

	const fetchLocations = async () => {
		try {
			const response = await fetch("/api/practice-location");
			if (!response.ok) throw new Error("Failed to fetch");
			const { data } = await response.json();
			setLocations(data || []);
		} catch (error) {
			console.error("Error fetching locations:", error);
		} finally {
			setLoading(false);
		}
	};

	const validateForm = () => {
		// Check required fields
		if (!formData.legal_business_name?.trim()) {
			toast.error("Legal Business Name is required");
			return false;
		}

		if (!formData.service_address_1?.trim()) {
			toast.error("Service Address is required");
			return false;
		}

		if (!formData.service_city?.trim()) {
			toast.error("Service City is required");
			return false;
		}

		if (!formData.service_state) {
			toast.error("Service State is required");
			return false;
		}

		if (!formData.service_phone) {
			toast.error("Service Phone is required");
			return false;
		}

		if (
			!formData.practice_contact_type ||
			formData.practice_contact_type === "Select Person"
		) {
			toast.error("Practice Contact Person is required");
			return false;
		}

		if (!formData.practice_contact_name?.trim()) {
			toast.error("Practice Contact Name is required");
			return false;
		}

		if (formData.service_zip) {
			if (!validateNumber(formData.service_zip, 5, "Service Zip Code")) {
				return false;
			}
		}

		if (formData.npi_2) {
			if (!validateNumber(formData.npi_2, 10, "NPI")) {
				return false;
			}
		}

		if (formData.tax_id) {
			if (!validateNumber(formData.tax_id, 9, "Tax ID")) {
				return false;
			}
		}

		if (formData.ptan_medicare_number) {
			if (
				!validateAlphanumeric(
					formData.ptan_medicare_number,
					10,
					"PTAN/Medicare number"
				)
			) {
				return false;
			}
		}

		if (formData.medicaid_number) {
			if (
				!validateAlphanumeric(formData.medicaid_number, 10, "Medicaid number")
			) {
				return false;
			}
		}

		const phoneFields = [
			{ value: formData.service_phone, name: "Service Phone" },
			{ value: formData.service_appointment_phone, name: "Appointment Phone" },
			{ value: formData.practice_contact_work_phone, name: "Work Phone" },
			{ value: formData.practice_contact_cell_phone, name: "Cell Phone" },
		];

		for (const field of phoneFields) {
			if (field.value && !validateNumber(field.value, 10, field.name)) {
				return false;
			}
		}

		const zipFields = [
			{ value: formData.service_zip, name: "Service Zip" },
			{ value: formData.mailing_zip, name: "Mailing Zip" },
			{ value: formData.correspondence_zip, name: "Correspondence Zip" },
		];

		for (const field of zipFields) {
			if (field.value && !validateNumber(field.value, 5, field.name)) {
				return false;
			}
		}
		return true;
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (["Select Code", "Select State", "Select Person"].includes(value))
			return;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const resetForm = () => {
		setFormData(DEFAULT_STATE);
		setEditingId(null);
	};

	const handleLocation = () => {
		resetForm();
		setShowLocationForm(!showLocationForm);
	};

	const handleEdit = (locationId) => {
		const locationToEdit = locations.find((loc) => loc.uuid === locationId);
		if (locationToEdit) {
			setEditingId(locationId);
			setFormData({
				legal_business_name: locationToEdit.legal_business_name,
				doing_business_name: locationToEdit.doing_business_name,
				npi_2: locationToEdit.npi_2,
				tax_id: locationToEdit.tax_id,
				taxonomy_code_1: locationToEdit.taxonomy_code_1,
				taxonomy_code_2: locationToEdit.taxonomy_code_2,

				service_address_1: locationToEdit.service_address_1,
				service_address_2: locationToEdit.service_address_2,
				service_city: locationToEdit.service_city,
				service_state: locationToEdit.service_state,
				service_zip: locationToEdit.service_zip,
				service_phone: locationToEdit.service_phone,
				service_fax: locationToEdit.service_fax,
				service_email: locationToEdit.service_email,
				service_appointment_phone: locationToEdit.service_appointment_phone,

				mailing_address_1: locationToEdit.mailing_address_1,
				mailing_address_2: locationToEdit.mailing_address_2,
				mailing_city: locationToEdit.mailing_city,
				mailing_state: locationToEdit.mailing_state,
				mailing_zip: locationToEdit.mailing_zip,
				mailing_phone: locationToEdit.mailing_phone,
				mailing_fax: locationToEdit.mailing_fax,
				mailing_email: locationToEdit.mailing_email,

				correspondence_address_1: locationToEdit.correspondence_address_1,
				correspondence_address_2: locationToEdit.correspondence_address_2,
				correspondence_city: locationToEdit.correspondence_city,
				correspondence_state: locationToEdit.correspondence_state,
				correspondence_zip: locationToEdit.correspondence_zip,
				correspondence_phone: locationToEdit.correspondence_phone,
				correspondence_fax: locationToEdit.correspondence_fax,
				correspondence_email: locationToEdit.correspondence_email,

				practice_contact_name: locationToEdit.practice_contact_name,
				practice_contact_email: locationToEdit.practice_contact_email,
				practice_contact_work_phone: locationToEdit.practice_contact_work_phone,
				practice_contact_cell_phone: locationToEdit.practice_contact_cell_phone,
				practice_contact_type: locationToEdit.practice_contact_type,

				ptan_medicare_number: locationToEdit.ptan_medicare_number,
				medicaid_number: locationToEdit.medicaid_number,
			});
			setShowLocationForm(true);
		}
	};

	const handleDelete = async (locationId) => {
		if (window.confirm("Are you sure you want to delete this location?")) {
			try {
				const response = await fetch(`/api/practice-location/${locationId}`, {
					method: "DELETE",
				});

				if (!response.ok) throw new Error("Failed to delete");

				setLocations((prev) => prev.filter((loc) => loc.uuid !== locationId));
				alert("Location deleted successfully");
			} catch (error) {
				console.error("Error deleting location:", error);
				alert("Failed to delete location");
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (!validateForm()) {
			return;
		}

		try {
			const url = editingId
				? `/api/practice-location/${editingId}`
				: "/api/practice-location";

			const response = await fetch(url, {
				method: editingId ? "PUT" : "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...formData, provider_id }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.details || "Failed to save location");
			}

			await fetchLocations();
			resetForm();
			setShowLocationForm(false);
			alert(`Location ${editingId ? "updated" : "added"} successfully`);
		} catch (error) {
			console.error("Error saving location:", error);
			alert(error.message || "Failed to save location");
		} finally {
			setLoading(false);
		}
	};

	const copyServiceToMailing = () => {
		setFormData((prev) => ({
			...prev,
			mailing_address_1: prev.service_address_1,
			mailing_address_2: prev.service_address_2,
			mailing_city: prev.service_city,
			mailing_state: prev.service_state,
			mailing_zip: prev.service_zip,
			mailing_phone: prev.service_phone,
			mailing_fax: prev.service_fax,
			mailing_email: prev.service_email,
		}));
	};

	const copyMailingToCorrespondence = () => {
		setFormData((prev) => ({
			...prev,
			correspondence_address_1: prev.mailing_address_1,
			correspondence_address_2: prev.mailing_address_2,
			correspondence_city: prev.mailing_city,
			correspondence_state: prev.mailing_state,
			correspondence_zip: prev.mailing_zip,
			correspondence_phone: prev.mailing_phone,
			correspondence_fax: prev.mailing_fax,
			correspondence_email: prev.mailing_email,
		}));
	};

	return {
		locations,
		loading,
		showLocationForm,
		formData,
		editingId,
		handleInputChange,
		handleLocation,
		handleEdit,
		handleDelete,
		handleSubmit,
		copyServiceToMailing,
		copyMailingToCorrespondence,
	};
};
