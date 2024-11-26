import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { formatDate } from "../../educationTraining/[id]/useEducationTraning";
import { isEqual, validateAlphanumeric, validateNumber } from "@/utils/utility";
import { useParams } from "next/navigation";

export const useSpecialities = () => {
	const defaultState = {
		speciality: "",
		type: "",
		is_board_certified: "",
		name_of_board: "",
		address_line_1: "",
		address_line_2: "",
		country: "USA",
		city: "",
		state: "",
		zip_code: "",
		effective_date: "",
		expiry_date: "",
	};

	const [loading, setLoading] = useState(false);
	const [specialitiesData, setSpecialitiesData] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [specialityType, setSpecialityType] = useState("");
	const [formData, setFormData] = useState(defaultState);
	const [isEditing, setIsEditing] = useState(false);
	const [editingId, setEditingId] = useState(null);

	const { id: provider_id } = useParams();

	const validateForm = () => {
		let isValid = true;

		if (isEqual(formData.speciality, "Select Speciality")) {
			toast.error("Please select a speciality");
			isValid = false;
		}

		if (!formData.is_board_certified) {
			toast.error("Please select board certification status");
			isValid = false;
		}

		if (
			formData.is_board_certified === "Yes" &&
			isEqual(formData.name_of_board, "Select Board")
		) {
			toast.error("Please select certifying board");
			isValid = false;
		}

		// Validate address fields
		if (!validateAlphanumeric(formData.address_line_1, 100, "Address Line 1")) {
			isValid = false;
		}

		if (
			formData.address_line_2 &&
			!validateAlphanumeric(formData.address_line_2, 100, "Address Line 2")
		) {
			isValid = false;
		}

		if (!validateAlphanumeric(formData.city, 50, "City")) {
			isValid = false;
		}

		if (isEqual(formData.state, "Select State")) {
			toast.error("Please select a state");
			isValid = false;
		}

		if (!validateNumber(formData.zip_code, 5, "Zip Code")) {
			isValid = false;
		}

		if (!formData.effective_date) {
			toast.error("Effective date is required");
			isValid = false;
		}

		if (!formData.expiry_date) {
			toast.error("Expiry date is required");
			isValid = false;
		}

		return isValid;
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (["Select State", "Select Board", "Select Speciality"].includes(value))
			return;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handlePrimarySpeciality = () => {
		setShowForm(true);
		setSpecialityType("primary");
		setFormData((prev) => ({
			...prev,
			type: "primary",
		}));
	};

	const handleSecondarySpeciality = () => {
		setShowForm(true);
		setSpecialityType("secondary");
		setFormData((prev) => ({
			...prev,
			type: "secondary",
		}));
	};

	const fetchSpecialities = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				`/api/specialities?provider_id=${provider_id}`
			);
			const data = await response.json();
			setSpecialitiesData(data.data);
		} catch (error) {
			console.error("Error fetching specialities:", error);
			toast.error("Failed to fetch specialities");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchSpecialities();
	}, []);

	const handleEdit = (speciality) => {
		setIsEditing(true);
		setEditingId(speciality.id);
		setShowForm(true);
		setSpecialityType(speciality.type);

		setFormData({
			speciality: speciality.name,
			type: speciality.type,
			is_board_certified: speciality.isBoardCertified,
			name_of_board: speciality.boardName,
			address_line_1: speciality.address?.addressLine1 || "",
			address_line_2: speciality.address?.addressLine2 || "",
			country: speciality.address?.country || "USA",
			city: speciality.address?.city || "",
			state: speciality.address?.state || "",
			zip_code: speciality.address?.zipCode || "",
			effective_date: formatDate(speciality.effectiveDate),
			expiry_date: formatDate(speciality.expiryDate),
		});
	};

	const handleDelete = async (id) => {
		if (window.confirm("Are you sure you want to delete this speciality?")) {
			try {
				const response = await fetch(`/api/specialities/${id}`, {
					method: "DELETE",
				});

				if (response.ok) {
					toast.success("Speciality deleted successfully");
					if (editingId === id) {
						setEditingId(null);
						setFormData(defaultState);
					}
					setSpecialitiesData((prev) =>
						prev.filter((speciality) => speciality.id !== id)
					);
				} else {
					throw new Error("Failed to delete speciality");
				}
			} catch (error) {
				console.error("Error deleting speciality:", error);
				toast.error("Failed to delete speciality");
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		try {
			const url = isEditing
				? `/api/specialities/${editingId}`
				: "/api/specialities";

			const method = isEditing ? "PUT" : "POST";

			const response = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...formData, provider_id }),
			});

			if (response.ok) {
				toast.success(
					`Speciality ${isEditing ? "updated" : "added"} successfully`
				);
				setFormData(defaultState);
				setShowForm(false);
				setIsEditing(false);
				setEditingId(null);
				fetchSpecialities();
			} else {
				throw new Error(`Failed to ${isEditing ? "update" : "add"} speciality`);
			}
		} catch (error) {
			console.error(
				`Error ${isEditing ? "updating" : "submitting"} form:`,
				error
			);
			toast.error(`Failed to ${isEditing ? "update" : "add"} speciality`);
		}
	};

	return {
		loading,
		specialitiesData,
		showForm,
		specialityType,
		formData,
		isEditing,
		handleInputChange,
		handlePrimarySpeciality,
		handleSecondarySpeciality,
		handleEdit,
		handleDelete,
		handleSubmit,
	};
};
