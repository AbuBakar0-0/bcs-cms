"use client";

import HeadingLine from "@/components/ui/HeadingLine";
import HeadingLine2 from "@/components/ui/HeadingLine2";
import Dropdown from "@/components/ui/inputFields/DropDown";
import EmailInput from "@/components/ui/inputFields/EmailInput";
import TextInput from "@/components/ui/inputFields/TextInput";
import ZipCodeInput from "@/components/ui/inputFields/ZipcodeInput";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import { useEffect, useRef, useState } from "react";
import taxonomyCodes from "@/data/taxonomyCodes";
import { IoAddCircleOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import NavBottom from "@/components/ui/NavBottom";
import Button from "@/components/ui/Button";
import PhoneInput from "@/components/ui/inputFields/PhoneInput";

function PracticeLocations() {
	const [locations, setLocations] = useState([]);
	const [editingId, setEditingId] = useState(null);
	const [loading, setLoading] = useState(true);
	const formRef = useRef(null);
	const [showLocationForm, setShowLocationForm] = useState(false);

	const handleLocation = () => {
		if (formRef.current) {
			formRef.current.reset();
		}
		setShowLocationForm(!showLocationForm);
	};

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

	const handleEdit = (locationId) => {
		console.log("Editing location with ID:", locationId);
		const locationToEdit = locations.find((loc) => loc.uuid === locationId);
		console.log("Found location data:", locationToEdit);

		if (locationToEdit) {
			setEditingId(locationId);
			setShowLocationForm(true);

			setTimeout(() => {
				if (formRef.current) {
					console.log("Form ref exists, starting to populate fields");

					const fieldsToPopulate = {
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
						practice_contact_work_phone:
							locationToEdit.practice_contact_work_phone,
						practice_contact_cell_phone:
							locationToEdit.practice_contact_cell_phone,
						practice_contact_type: locationToEdit.practice_contact_type,

						ptan_medicare_number: locationToEdit.ptan_medicare_number,
						medicaid_number: locationToEdit.medicaid_number,
					};

					Object.entries(fieldsToPopulate).forEach(([fieldName, value]) => {
						const input = formRef.current.querySelector(
							`[name="${fieldName}"]`
						);
						if (input) {
							input.value = value || "";
							console.log(`Set ${fieldName} to:`, value);
						} else {
							console.warn(`Could not find input field: ${fieldName}`);
						}
					});
				} else {
					console.error("Form ref is not available");
				}
			}, 100);
		} else {
			console.error("Location not found:", locationId);
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

		try {
			const formData = new FormData(formRef.current);
			const formDataObject = {};

			formData.forEach((value, key) => {
				formDataObject[key] = value || null;
			});

			const url = editingId
				? `/api/practice-location/${editingId}`
				: "/api/practice-location";

			const response = await fetch(url, {
				method: editingId ? "PUT" : "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formDataObject),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.details || "Failed to save location");
			}

			await fetchLocations();
			formRef.current.reset();
			setShowLocationForm(false);
			setEditingId(null);
			alert(`Location ${editingId ? "updated" : "added"} successfully`);
		} catch (error) {
			console.error("Error saving location:", error);
			alert(error.message || "Failed to save location");
		} finally {
			setLoading(false);
		}
	};

	const copyServiceToMailing = (e) => {
		if (e.target.checked) {
			const serviceInputs =
				formRef.current.querySelectorAll('[name^="service_"]');
			serviceInputs.forEach((input) => {
				const mailingInput = formRef.current.querySelector(
					`[name="${input.name.replace("service_", "mailing_")}"]`
				);
				if (mailingInput) {
					mailingInput.value = input.value;
				}
			});
		}
	};
	const copyMailingToCorrespondence = (e) => {
		if (e.target.checked) {
			const mailingInputs =
				formRef.current.querySelectorAll('[name^="mailing_"]');
			mailingInputs.forEach((input) => {
				const corrInput = formRef.current.querySelector(
					`[name="${input.name.replace("mailing_", "correspondence_")}"]`
				);
				if (corrInput) {
					corrInput.value = input.value;
				}
			});
		}
	};
	return (
		<>
			<div className="w-full flex flex-col justify-center items-center gap-4">
				{/* Personal Information */}
				<div className="w-full flex flex-row justify-between items-center">
					<p className="w-full text-lg">Practice Location</p>
					<Button
						title={"Add"}
						icon={<IoAddCircleOutline className="size-6" />}
						onClick={handleLocation}
					/>
				</div>

				<div className="w-full flex flex-col justify-center items-center gap-4">
					{showLocationForm ? (
						<form
							ref={formRef}
							onSubmit={handleSubmit}
							className="w-full min-h-20 shadow-xl rounded-lg border-l-8 border-primary flex flex-col justify-start items-center gap-4 p-10"
						>
							<div className="w-full flex flex-wrap justify-start items-end gap-4">
								<TextInput
									title={"Legal Business Name "}
									width={"w-[49%]"}
									name="legal_business_name"
								/>
								<TextInput
									title={"Doing Business Name "}
									width={"w-[49%]"}
									name="doing_business_name"
								/>
								<TextInput
									title={"NPI 2 (if applicable"}
									required={false}
									name="npi_2"
								/>
								<TextInput
									title={"Tax ID (if applicable)"}
									required={false}
									name="tax_id"
								/>
								<Dropdown
									title={"Taxonomy Code (if applicable)"}
									options={taxonomyCodes}
									required={false}
									width="w-1/4"
									name="taxonomy_code_1"
								/>
								<Dropdown
									title={"Taxonomy Code 2 (if applicable)"}
									options={taxonomyCodes}
									required={false}
									width="w-1/4"
									name={"taxonomy_code_1"}
								/>

								<div className="w-full flex flex-wrap justify-start gap-4 items-start">
									<TextInput
										title={"Service Location Address 1"}
										width="w-[35%]"
										name="service_address_1"
									/>
									<TextInput
										title={"Service Location Address 2"}
										width={"w-[25%]"}
										required={false}
										name="service_address_2"
									/>
									<TextInput
										title={"City"}
										width={"w-[10%]"}
										name="service_city"
									/>
									<Dropdown
										title={"State"}
										options={stateAbbreviations}
										width="w-[8%]"
										name="service_state"
									/>
									<ZipCodeInput
										title={"ZipCode"}
										width={"w-[8%]"}
										name="service_zip"
									/>
									<PhoneInput title={"Location Ph."} name="service_phone" />
									<TextInput title={"Location Appointment Ph."} />
									<TextInput
										title={"Location Fax"}
										name="service_appointment_phone"
									/>
									<TextInput
										title={"Location Email"}
										name="service_email"
										width={"w-[27.5%]"}
									/>
								</div>

								<HeadingLine2 title={"Mailing Address"} />

								<div className="w-full flex flex-wrap justify-start gap-4 items-center text-xs">
									<input type="checkbox" onChange={copyServiceToMailing} /> Same
									as Service Location Address
								</div>

								<div className="w-full flex flex-wrap justify-start gap-4 items-start">
									<TextInput
										title={"Mailing Address 1"}
										width="w-[35%]"
										name={"mailing_address_1"}
									/>
									<TextInput
										title={"Mailing Address 2"}
										name={"mailing_address_2"}
										width={"w-[25%]"}
										required={false}
									/>
									<TextInput
										title={"City"}
										width={"w-[10%]"}
										name={"mailing_city"}
									/>
									<Dropdown
										title={"State"}
										options={stateAbbreviations}
										width="w-[8%]"
										name="mailing_state"
									/>

									<ZipCodeInput
										title={"ZipCode"}
										width={"w-[8%]"}
										name="mailing_zip"
									/>
									<TextInput title={"Location Ph."} name="mailing_phone" />
									<TextInput title={"Location Fax"} name="mailing_fax" />
									<TextInput
										title={"Location Email"}
										width={"w-[27.5%]"}
										name="mailing_email"
									/>
								</div>

								<HeadingLine2 title={"Correspondance Address"} />

								<div className="w-full flex flex-wrap justify-start gap-4 items-center text-xs">
									<input
										type="checkbox"
										name="same_as_mailing"
										onChange={copyMailingToCorrespondence}
									/>{" "}
									Same as Billing / Mailing Address
								</div>

								<div className="w-full flex flex-wrap justify-start gap-4 items-start">
									<TextInput
										title={"Correspondance Address 1"}
										width="w-[35%]"
										name="correspondence_address_1"
									/>
									<TextInput
										title={"Correspondance Address 2"}
										name="correspondence_address_2"
										width={"w-[25%]"}
										required={false}
									/>
									<TextInput
										title={"City"}
										width={"w-[10%]"}
										name="correspondence_city"
									/>
									<Dropdown
										title={"State"}
										options={stateAbbreviations}
										width="w-[8%]"
										name="correspondence_state"
									/>

									<ZipCodeInput
										title={"ZipCode"}
										width={"w-[8%]"}
										name="correspondence_zip"
									/>
									<TextInput
										title={"Location Ph."}
										name="correspondence_phone"
									/>
									<TextInput title={"Location Fax"} name="correspondence_fax" />
									<TextInput
										title={"Location Email"}
										width={"w-[27.5%]"}
										name="correspondence_email"
									/>
								</div>

								<div className="w-full flex flex-wrap justify-start items-center gap-5">
									<TextInput
										title={"Location PTAN/Medicare number"}
										name={"ptan_medicare_number"}
									/>
									<TextInput
										title={"Medicaid number"}
										name={"practice_contact_id"}
									/>
								</div>
							</div>

							{/* Emergency Contact Information */}
							<HeadingLine title={"Practice Contact Information"} />

							<div className="w-full flex flex-wrap justify-start gap-4 items-start">
								<Dropdown
									width="w-[14%]"
									title={"Practice Contact Person"}
									options={[
										"CFO( Chief Financial Officer)",
										"CTO (Chief Technology Officer)",
										"CEO ( Chief Executive Officer)",
										"Owner",
										"Administrator",
										"Office Manager",
										"Contractor",
									]}
									name="practice_contact_type"
								/>
								<TextInput
									title={"Practice Contact Name"}
									name="practice_contact_name"
								/>
								<EmailInput
									title={"Work Email"}
									name="practice_contact_email"
								/>
								<TextInput
									title={"Work Ph."}
									name="practice_contact_work_phone"
								/>
								<TextInput
									title={"Cell Ph."}
									name="practice_contact_cell_phone"
								/>
							</div>
							<div className="w-full mt-4 flex justify-end gap-4">
								<Button type="submit" title="Save" />
							</div>
						</form>
					) : (
						<></>
					)}
				</div>

				{loading ? (
					<div>Loading...</div>
				) : locations.length === 0 ? (
					<div>No locations found</div>
				) : (
					locations.map((location) => (
						<div
							key={location.uuid}
							className="w-full h-24 shadow-xl rounded-lg border-l-8 border-primary flex flex-row justify-between items-center gap-4 p-10"
						>
							<p>{location.legal_business_name}</p>
							<div className="flex flex-col justify-center items-start">
								<p>{location.service_city}</p>
								<p>{location.service_state}</p>
								<p>{location.service_phone}</p>
							</div>
							<div className="flex flex-row justify-center items-center gap-4">
								<CiEdit
									className="size-6 text-primary cursor-pointer"
									onClick={() => handleEdit(location.uuid)}
								/>
								<MdDeleteOutline
									className="size-6 text-red-400 cursor-pointer"
									onClick={() => handleDelete(location.uuid)}
								/>
							</div>
						</div>
					))
				)}

				<NavBottom />
			</div>
		</>
	);
}

export default PracticeLocations;
