"use client";

import Button from "@/components/ui/Button";
import DateInput from "@/components/ui/inputFields/DateInput";
import Dropdown from "@/components/ui/inputFields/DropDown";
import PhoneInput from "@/components/ui/inputFields/PhoneInput";
import RadioButton from "@/components/ui/inputFields/RadioButtons";
import TextInput from "@/components/ui/inputFields/TextInput";
import ZipCodeInput from "@/components/ui/inputFields/ZipcodeInput";
import NavBottom from "@/components/ui/NavBottom";
import { medicalTitles } from "@/data/medicalTitles";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast"; // Assuming you're using react-hot-toast for notifications
import { CiEdit } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { BarLoader } from "react-spinners";

function EmploymentInformation() {
	const [loading, setLoading] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [employmentData, setEmploymentData] = useState([]);
	const [editingId, setEditingId] = useState(null);
	const [formData, setFormData] = useState({
		legal_employer_name: "",
		doing_business_name: "",
		department_speciality: "",
		address_line_1: "",
		address_line_2: "",
		country: "USA",
		city: "",
		state: "",
		zip_code: "",
		cell_phone: "",
		fax: "",
		start_date: "",
		end_date: "",
		current_employer: "No",
	});
	const { id: provider_id } = useParams();
	const fetchEmploymentData = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				`/api/employment-information?provider_id=${provider_id}`
			);
			const result = await response.json();
			if (result.data) {
				setEmploymentData(result.data);
			}
		} catch (error) {
			toast.error("Error fetching employment data");
			console.error("Error:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchEmploymentData();
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const resetForm = () => {
		setFormData({
			legal_employer_name: "",
			doing_business_name: "",
			department_speciality: "",
			address_line_1: "",
			address_line_2: "",
			country: "USA",
			city: "",
			state: "",
			zip_code: "",
			cell_phone: "",
			fax: "",
			start_date: "",
			end_date: "",
			current_employer: "No",
		});
		setEditingId(null);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const url =
				"/api/employment-information" + (editingId ? `?id=${editingId}` : "");
			const method = editingId ? "PUT" : "POST";

			const response = await fetch(url, {
				method: method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...formData, provider_id: provider_id }),
			});

			const result = await response.json();

			if (response.ok) {
				toast.success(
					editingId
						? "Employment information updated successfully"
						: "Employment information saved successfully"
				);
				setShowForm(false);
				resetForm();
				fetchEmploymentData();
			} else {
				throw new Error(result.message || "Error saving data");
			}
		} catch (error) {
			toast.error(error.message || "Error saving employment information");
			console.error("Error:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (uuid) => {
		if (!confirm("Are you sure you want to delete this employment record?")) {
			return;
		}

		setLoading(true);
		try {
			const response = await fetch(`/api/employment-information?id=${uuid}`, {
				method: "DELETE",
			});

			const result = await response.json();

			if (response.ok) {
				setEmploymentData((prevData) =>
					prevData.filter((item) => item.uuid !== uuid)
				);
				toast.success("Employment record deleted successfully");
			} else {
				throw new Error(result.message || "Error deleting data");
			}
		} catch (error) {
			toast.error(error.message || "Error deleting employment record");
			console.error("Error:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = (employment) => {
		setFormData({
			legal_employer_name: employment.legal_employer_name,
			doing_business_name: employment.doing_business_name,
			department_speciality: employment.department_speciality,
			address_line_1: employment.address?.address_line_1 || "",
			address_line_2: employment.address?.address_line_2 || "",
			country: employment.address?.country || "USA",
			city: employment.address?.city || "",
			state: employment.address?.state || "",
			zip_code: employment.address?.zip_code || "",
			cell_phone: employment.contact?.cell_phone || "",
			fax: employment.contact?.fax || "",
			start_date: employment.start_date,
			end_date: employment.end_date,
			current_employer: employment.current_employer ? "Yes" : "No",
		});
		setEditingId(employment.uuid);
		setShowForm(true);
	};

	return (
		<div className="w-full flex flex-col justify-center items-center gap-4">
			<div className="w-full flex flex-row justify-between items-center">
				<p className="w-full text-lg">Employment Information</p>
				<Button
					title={showForm ? "Cancel" : "Add"}
					icon={<IoAddCircleOutline className="size-6" />}
					onClick={() => {
						setShowForm(!showForm);
						if (!showForm) resetForm();
					}}
				/>
			</div>

			{showForm && (
				<form
					onSubmit={handleSubmit}
					className="w-full min-h-20 shadow-xl rounded-lg border-l-8 border-primary flex flex-col justify-start items-center gap-4 p-10"
				>
					<div className="w-full flex flex-wrap justify-start gap-4 items-start">
						<TextInput
							title="Legal Employer Name"
							width="w-[35%]"
							name="legal_employer_name"
							value={formData.legal_employer_name}
							onChange={handleInputChange}
						/>
						<TextInput
							title="Doing Business Name"
							width="w-[35%]"
							name="doing_business_name"
							value={formData.doing_business_name}
							onChange={handleInputChange}
						/>
						<Dropdown
							title="Department / Speciality"
							options={medicalTitles}
							name="department_speciality"
							value={formData.department_speciality}
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
								options={["USA", "Canada", "Other"]}
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
								title="Cell Phone"
								name="cell_phone"
								value={formData.cell_phone}
								onChange={handleInputChange}
							/>
							<PhoneInput
								title="Fax No."
								required={false}
								name="fax"
								value={formData.fax}
								onChange={handleInputChange}
							/>
							<DateInput
								title="Start Date"
								name="start_date"
								value={formData.start_date}
								onChange={handleInputChange}
							/>
							<DateInput
								title="End Date"
								name="end_date"
								value={formData.end_date}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="w-full flex flex-col justify-center items-start gap-4">
						<RadioButton
							title="Is this your Current Employer?"
							options={["Yes", "No"]}
							name="current_employer"
							value={formData.current_employer}
							onChange={handleInputChange}
						/>
					</div>
					<button
						type="submit"
						disabled={loading}
						className="border-4 border-primary rounded-lg px-6 py-2 font-semibold disabled:opacity-50"
					>
						{loading ? <BarLoader /> : editingId ? "Update" : "Submit"}
					</button>
				</form>
			)}

			{loading && !showForm ? (
				<div className="flex justify-center items-center py-6">
					<BarLoader />
				</div>
			) : (
				<div className="w-full space-y-4">
					{employmentData.map((item) => (
						<div
							key={item.uuid}
							className="w-full shadow-xl rounded-lg border-l-8 border-primary flex flex-row justify-between items-center gap-4 p-6"
						>
							<div className="flex-1">
								<h3 className="font-medium">{item.legal_employer_name}</h3>
								<p className="text-sm text-gray-600">
									{item.doing_business_name}
								</p>
								<p className="text-sm text-gray-500">
									{item.start_date} - {item.end_date}
								</p>
							</div>

							<div className="flex flex-col text-sm text-gray-600">
								<p>{item.address?.address_line_1}</p>
								<p>
									{item.address?.city}, {item.address?.state}
									{item.address?.zip_code}
								</p>
								<p>{item.contact?.cell_phone}</p>
							</div>

							<div className="flex gap-3">
								<button
									onClick={() => handleEdit(item)}
									className="p-2 hover:bg-gray-100 rounded-full"
								>
									<CiEdit className="size-6 text-primary" />
								</button>
								<button
									onClick={() => handleDelete(item.uuid)}
									className="p-2 hover:bg-gray-100 rounded-full"
								>
									<MdDeleteOutline className="size-6 text-red-400" />
								</button>
							</div>
						</div>
					))}
				</div>
			)}

			<NavBottom />
		</div>
	);
}

export default EmploymentInformation;
