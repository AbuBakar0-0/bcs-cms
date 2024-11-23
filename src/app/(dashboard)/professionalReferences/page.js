"use client";

import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/inputFields/DropDown";
import EmailInput from "@/components/ui/inputFields/EmailInput";
import PhoneInput from "@/components/ui/inputFields/PhoneInput";
import TextInput from "@/components/ui/inputFields/TextInput";
import ZipCodeInput from "@/components/ui/inputFields/ZipcodeInput";
import NavBottom from "@/components/ui/NavBottom";
import Spinner from "@/components/ui/spinner";
import SubmitButton from "@/components/ui/SubmitButton";
import { medicalTitles } from "@/data/medicalTitles";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import getData from "@/hooks/getData";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-hot-toast";

function ProfessionalReferences() {
	const [reference, setReference] = useState(false);
	const [references, setReferences] = useState([]);
	const [loading, setLoading] = useState(false);
	const [editingId, setEditingId] = useState(null);

	// Form state
	const initialFormState = {
		provider_type: "",
		first_name: "",
		middle_initial: "",
		last_name: "",
		address_line_1: "",
		address_line_2: "",
		country: "USA",
		city: "",
		state: stateAbbreviations[0],
		zip_code: "",
		cell_phone: "",
		fax: "",
		email: "",
	};

	const [formData, setFormData] = useState(initialFormState);

	const handleReference = () => {
		setReference(!reference);
		if (!reference) {
			setFormData(initialFormState);
			setEditingId(null);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await getData("/api/professional-references");
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const url = editingId
				? `/api/professional-references/${editingId}`
				: "/api/professional-references";

			const response = await fetch(url, {
				method: editingId ? "PUT" : "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const result = await response.json();

			if (response.ok) {
				toast.success(
					editingId
						? "Reference updated successfully"
						: "Reference added successfully"
				);
				setFormData(initialFormState);
				setReference(false);
				setEditingId(null);
				fetchData();
			} else {
				throw new Error(result.message || "Error saving data");
			}
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
			middle_initial: ref.middle_initial || "",
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

	const ReferenceCard = ({ ref }) => (
		<div className="w-full shadow-xl rounded-lg border-l-8 border-primary flex flex-row justify-between items-center gap-4 p-6">
			<div className="flex-1">
				<h3 className="font-medium">{ref.provider_type}</h3>
				<p className="text-sm text-gray-600">
					{`${ref.first_name} ${
						ref.middle_initial ? ref.middle_initial + "." : ""
					} ${ref.last_name}`}
				</p>
			</div>

			<div className="flex flex-col text-sm text-gray-600">
				<p>{ref.address_line_1}</p>
				{ref.address_line_2 && <p>{ref.address_line_2}</p>}
				<p>
					{ref.city}, {ref.state} {ref.zip_code}
				</p>
				<p>{ref.cell_phone}</p>
			</div>

			<div className="flex gap-3">
				<button
					onClick={() => handleEdit(ref)}
					className="p-2 hover:bg-gray-100 rounded-full"
				>
					<CiEdit className="size-6 text-primary" />
				</button>
				<button
					onClick={() => handleDelete(ref.uuid)}
					className="p-2 hover:bg-gray-100 rounded-full"
				>
					<MdDeleteOutline className="size-6 text-red-400" />
				</button>
			</div>
		</div>
	);

	return (
		<>
			<div className="w-full flex flex-col justify-center items-center gap-4">
				<div className="w-full flex flex-row justify-between items-center">
					<p className="w-full text-lg">Professional References</p>
					<Button
						title={reference ? "Cancel" : "Add"}
						icon={<IoAddCircleOutline className="size-6" />}
						onClick={handleReference}
					/>
				</div>

				<div className="w-full flex flex-col justify-center items-center gap-4">
					{reference && (
						<form
							onSubmit={handleSubmit}
							className="w-full min-h-20 shadow-xl rounded-lg border-l-8 border-primary flex flex-col justify-start items-center gap-4 p-10"
						>
							<div className="w-full flex flex-wrap justify-start gap-4 items-start">
								<Dropdown
									title="Provider Type"
									options={medicalTitles}
									name="provider_type"
									value={formData.provider_type}
									onChange={handleInputChange}
								/>
								<TextInput
									title="First Name"
									width="w-1/3"
									required={true}
									name="first_name"
									value={formData.first_name}
									onChange={handleInputChange}
								/>
								<TextInput
									title="Middle Initial"
									required={false}
									width="w-[8%]"
									name="middle_initial"
									value={formData.middle_initial}
									onChange={handleInputChange}
								/>
								<TextInput
									title="Last Name"
									width="w-1/3"
									required={true}
									name="last_name"
									value={formData.last_name}
									onChange={handleInputChange}
								/>
								<div className="w-full flex flex-wrap justify-start gap-4 items-start">
									<TextInput
										title="Address Line 1"
										width="w-[25%]"
										name="address_line_1"
										value={formData.address_line_1}
										onChange={handleInputChange}
									/>
									<TextInput
										title="Address Line 2"
										width="w-[25%]"
										required={false}
										name="address_line_2"
										value={formData.address_line_2}
										onChange={handleInputChange}
									/>
									<Dropdown
										title="Country"
										options={["USA"]}
										width="w-[13%]"
										name="country"
										value={formData.country}
										onChange={handleInputChange}
									/>
									<TextInput
										title="City"
										width="w-[10%]"
										name="city"
										value={formData.city}
										onChange={handleInputChange}
									/>
									<Dropdown
										title="State"
										options={stateAbbreviations}
										width="w-[8%]"
										name="state"
										value={formData.state}
										onChange={handleInputChange}
									/>
									<ZipCodeInput
										title="ZipCode"
										width="w-[8%]"
										name="zip_code"
										value={formData.zip_code}
										onChange={handleInputChange}
									/>
									<PhoneInput
										title="Cell Ph."
										name="cell_phone"
										value={formData.cell_phone}
										onChange={handleInputChange}
									/>
									<PhoneInput
										title="Fax No."
										name="fax"
										value={formData.fax}
										onChange={handleInputChange}
									/>
									<EmailInput
										title="Email Address"
										name="email"
										value={formData.email}
										onChange={handleInputChange}
									/>
								</div>
							</div>
							<SubmitButton
								loading={loading}
								text={editingId ? "Update" : "Submit"}
							/>
						</form>
					)}
				</div>

				{loading && !reference ? (
					<div className="w-full flex justify-center items-center my-10">
						<Spinner />
					</div>
				) : references.length === 0 ? (
					<div className="w-full text-center py-8">
						<p className="text-gray-500">No professional references found.</p>
						<p className="text-gray-500">Click the Add button to create one.</p>
					</div>
				) : (
					references.map((ref) => <ReferenceCard key={ref.uuid} ref={ref} />)
				)}

				<NavBottom />
			</div>
		</>
	);
}

export default ProfessionalReferences;
