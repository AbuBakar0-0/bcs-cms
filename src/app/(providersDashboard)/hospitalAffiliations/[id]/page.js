"use client";

import Button from "@/components/ui/Button";
import HeadingLine from "@/components/ui/HeadingLine";
import Dropdown from "@/components/ui/inputFields/DropDown";
import TextInput from "@/components/ui/inputFields/TextInput";
import ZipCodeInput from "@/components/ui/inputFields/ZipcodeInput";
import NavBottom from "@/components/ui/NavBottom";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-hot-toast";
import { BarLoader, ClipLoader } from "react-spinners";
import { useParams } from "next/navigation";

const initialFormState = {
	hospital_name: "",
	address_line_1: "",
	address_line_2: "",
	city: "",
	state: "",
	zip_code: "",
};

function HospitalAffiliations() {
	const [loading, setLoading] = useState(true);
	const [hospitalData, setHospitalData] = useState([]);
	const [showAffiliationForm, setShowAffiliationForm] = useState(false);
	const [showArrangementsForm, setShowArrangementsForm] = useState(false);
	const [affiliationForm, setAffiliationForm] = useState(initialFormState);
	const [arrangementsForm, setArrangementsForm] = useState(initialFormState);
	const [editingId, setEditingId] = useState(null);
	const { id: provider_id } = useParams();
	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				`/api/hospital-affiliation?provider_id=${provider_id}`
			);
			const data = await response.json();
			setHospitalData(data.result);
		} catch (error) {
			console.error("Error fetching hospital data:", error);
			toast.error("Failed to fetch hospital data");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleInputChange = (formType) => (e) => {
		const { name, value } = e.target;
		if (["Select State"].includes(value)) return;
		const formSetter =
			formType === "affiliation" ? setAffiliationForm : setArrangementsForm;

		formSetter((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const validateForm = (formData) => {
		if (!formData.hospital_name.trim()) {
			toast.error("Hospital name is required");
			return false;
		}
		if (!formData.address_line_1.trim()) {
			toast.error("Address is required");
			return false;
		}
		if (!formData.city.trim()) {
			toast.error("City is required");
			return false;
		}
		if (!formData.state) {
			toast.error("State is required");
			return false;
		}
		if (!formData.zip_code.trim()) {
			toast.error("Zip code is required");
			return false;
		} else if (!/^\d{5}(-\d{4})?$/.test(formData.zip_code)) {
			toast.error("Invalid zip code format");
			return false;
		}

		return true;
	};

	const handleSubmit = async (type) => {
		const formData =
			type === "affiliation" ? affiliationForm : arrangementsForm;

		if (!validateForm(formData)) {
			return;
		}

		const loadingToast = toast.loading(
			editingId
				? "Updating hospital affiliation..."
				: "Adding hospital affiliation..."
		);

		try {
			const payload = {
				...formData,
				type: type === "affiliation" ? "admitting" : "hospital",

				country: "US",
			};

			const response = await fetch("/api/hospital-affiliation", {
				method: editingId ? "PUT" : "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...payload,
					uuid: editingId,
					provider_id: provider_id,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Submission failed");
			}

			if (type === "affiliation") {
				setAffiliationForm(initialFormState);
				setShowAffiliationForm(false);
			} else {
				setArrangementsForm(initialFormState);
				setShowArrangementsForm(false);
			}

			setEditingId(null);
			await fetchData();

			toast.dismiss(loadingToast);
			toast.success(
				editingId
					? "Hospital affiliation updated successfully"
					: "Hospital affiliation added successfully"
			);
		} catch (error) {
			console.error("Error submitting form:", error);
			toast.dismiss(loadingToast);
			toast.error(error.message || "Failed to submit form");
		}
	};

	const handleEdit = (hospital) => {
		const formData = {
			hospital_name: hospital.hospital_name,
			address_line_1: hospital.address.address_line_1,
			address_line_2: hospital.address.address_line_2 || "",
			city: hospital.address.city,
			state: hospital.address.state,
			zip_code: hospital.address.zip_code,
		};
		if (hospital.type === "admitting") {
			setAffiliationForm(formData);
			setShowAffiliationForm(true);
		} else {
			setArrangementsForm(formData);
			setShowArrangementsForm(true);
		}
		setEditingId(hospital.uuid);
	};

	const handleDelete = async (uuid) => {
		if (!window.confirm("Are you sure you want to delete this entry?")) return;

		const loadingToast = toast.loading("Deleting hospital affiliation...");

		try {
			const response = await fetch(`/api/hospital-affiliation?uuid=${uuid}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Delete failed");
			}

			toast.dismiss(loadingToast);
			toast.success("Hospital affiliation deleted successfully");
			await fetchData();
		} catch (error) {
			console.error("Error deleting entry:", error);
			toast.dismiss(loadingToast);
			toast.error(error.message || "Failed to delete entry");
		}
	};

	const getHospitalsByType = (type) => {
		return hospitalData?.filter((hospital) => {
			if (type === "Admitting Privilages") {
				return hospital.type === "admitting";
			}
			if (type === "Admitting Arrangements") {
				return hospital.type === "hospital";
			}
			return false;
		});
	};

	if (loading) {
		return <div className="w-full flex justify-center items-center"><BarLoader /></div>;
	}

	const renderForm = (type, formData, onChange) => (
		<div className="w-full min-h-20 shadow-xl rounded-lg border-l-8 border-primary flex flex-col justify-start items-center gap-4 p-10">
			<div className="w-full flex flex-wrap justify-start gap-4 items-start">
				<TextInput
					title="Hospital Name"
					width="w-full"
					name="hospital_name"
					value={formData.hospital_name}
					onChange={onChange}
				/>
				<TextInput
					title="Address 1"
					width="w-[35%]"
					name="address_line_1"
					value={formData.address_line_1}
					onChange={onChange}
				/>
				<TextInput
					title="Address 2"
					width="w-[25%]"
					name="address_line_2"
					value={formData.address_line_2}
					onChange={onChange}
					required={false}
				/>
				<TextInput
					title="City"
					width="w-[10%]"
					name="city"
					value={formData.city}
					onChange={onChange}
				/>
				<Dropdown
					title="State"
					options={stateAbbreviations}
					width="w-[8%]"
					name="state"
					value={formData.state}
					onChange={onChange}
				/>
				<ZipCodeInput
					title="ZipCode"
					width="w-[8%]"
					name="zip_code"
					value={formData.zip_code}
					onChange={onChange}
				/>
			</div>
			<div className="flex gap-4">
				<Button
					title="Cancel"
					onClick={() => {
						type === "affiliation"
							? setShowAffiliationForm(false)
							: setShowArrangementsForm(false);
						setEditingId(null);
						type === "affiliation"
							? setAffiliationForm(initialFormState)
							: setArrangementsForm(initialFormState);
					}}
				/>
				<Button
					title={editingId ? "Update" : "Submit"}
					onClick={() => handleSubmit(type)}
				/>
			</div>
		</div>
	);

	const renderHospitalCard = (hospital) => (
		<div
			key={hospital.uuid}
			className="w-full h-24 shadow-xl rounded-lg border-l-8 border-primary flex flex-row justify-between items-center gap-4 p-10"
		>
			<p>{hospital.hospital_name}</p>
			<div className="flex flex-col justify-center items-start">
				<p>{hospital.address.address_line_1}</p>
				<p>
					{hospital.address.city}, {hospital.address.state}{" "}
					{hospital.address.zip}
				</p>
			</div>
			<div className="flex flex-row justify-center items-center gap-4">
				<CiEdit
					className="size-6 text-primary cursor-pointer"
					onClick={() => handleEdit(hospital)}
				/>
				<MdDeleteOutline
					className="size-6 text-red-400 cursor-pointer"
					onClick={() => handleDelete(hospital.uuid)}
				/>
			</div>
		</div>
	);

	return (
		<div className="w-full flex flex-col justify-center items-center gap-4">
			<HeadingLine title="Hospital Affiliations" />
			<p className="w-full">
				<span className="text-red-400">*</span> Required all fields are marked
				with red asterisk
			</p>

			{/* Admitting Privileges Section */}
			<div className="w-full flex flex-row justify-between items-center">
				<p className="w-full text-lg">Admitting Privileges</p>
				<Button
					title="Add"
					icon={<IoAddCircleOutline className="size-6" />}
					onClick={() => setShowAffiliationForm(!showAffiliationForm)}
				/>
			</div>

			<div className="w-full flex flex-col justify-center items-center gap-4">
				{showAffiliationForm
					? renderForm(
							"affiliation",
							affiliationForm,
							handleInputChange("affiliation")
					  )
					: getHospitalsByType("Admitting Privilages")?.map(renderHospitalCard)}
			</div>

			{/* Admitting Arrangements Section */}
			<div className="w-full flex flex-row justify-between items-center mt-10">
				<p className="w-full text-lg">Admitting Arrangements</p>
				<Button
					title="Add"
					icon={<IoAddCircleOutline className="size-6" />}
					onClick={() => setShowArrangementsForm(!showArrangementsForm)}
				/>
			</div>

			<div className="w-full flex flex-col justify-center items-center gap-4">
				{showArrangementsForm
					? renderForm(
							"arrangements",
							arrangementsForm,
							handleInputChange("arrangements")
					  )
					: getHospitalsByType("Admitting Arrangements")?.map(
							renderHospitalCard
					  )}
			</div>

			<NavBottom />
		</div>
	);
}

export default HospitalAffiliations;
