"use client";

import HeadingLine from "@/components/ui/HeadingLine";
import HeadingLine2 from "@/components/ui/HeadingLine2";
import DateInput from "@/components/ui/inputFields/DateInput";
import Dropdown from "@/components/ui/inputFields/DropDown";
import EmailInput from "@/components/ui/inputFields/EmailInput";
import PhoneInput from "@/components/ui/inputFields/PhoneInput";
import TextInput from "@/components/ui/inputFields/TextInput";
import ZipCodeInput from "@/components/ui/inputFields/ZipcodeInput";
import NavBottom from "@/components/ui/NavBottom";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import taxonomyCodes from "@/data/taxonomyCodes";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

function PracticeProfile() {
	const [readonly, setReadOnly] = useState(false);
	const formRef = useRef(null);
	const handleReadonly = () => {
		setReadOnly(!readonly);
	};

	const copyServiceAddress = (e) => {
		if (e.target.checked) {
			const fields = [
				"address1",
				"address2",
				"city",
				"state",
				"zipcode",
				"phone",
				"fax",
				"email",
			];
			fields.forEach((field) => {
				const mailingInput = formRef.current?.elements[`mailing_${field}`];
				const serviceInput = formRef.current?.elements[`service_${field}`];
				if (mailingInput && serviceInput) {
					mailingInput.value = serviceInput.value;
				}
			});
		}
	};

	const copyMailingAddress = (e) => {
		if (e.target.checked) {
			const fields = [
				"address1",
				"address2",
				"city",
				"state",
				"zipcode",
				"phone",
				"fax",
				"email",
			];
			fields.forEach((field) => {
				const correspondenceInput =
					formRef.current?.elements[`correspondence_${field}`];
				const mailingInput = formRef.current?.elements[`mailing_${field}`];
				if (correspondenceInput && mailingInput) {
					correspondenceInput.value = mailingInput.value;
				}
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(formRef.current);
		const formObject = Object.fromEntries(formData);

		try {
			const response = await fetch("/api/practice-profile", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formObject),
			});

			if (!response.ok) throw new Error("Network response was not ok");

			const result = await response.json();
			toast.success("Practice profile saved successfully!");
		} catch (error) {
			console.error("Error:", error);
			toast.error("Error saving practice profile", error.message);
		}
	};
	return (
		<>
			<form
				ref={formRef}
				onSubmit={handleSubmit}
				className="w-full flex flex-col justify-center items-center gap-4 p-6"
			>
				<HeadingLine title="Practice Profile" />

				<div className="w-full flex flex-wrap justify-start gap-4 items-start">
					<Dropdown
						name="type"
						title="PRACTICE TYPE"
						options={[
							"Medical",
							"Dental",
							"Behavioural Health",
							"Vision",
							"Multi Speciality",
						]}
					/>
					<Dropdown
						name="type_of_service_provided"
						title="Type of Service Provided"
						options={[
							"Solo Primary Care",
							"Solo Speciality Care",
							"Solo SPE / PCP",
							"Group Primary Care",
							"Group Speciality Care",
							"Group of Multi-Speciality",
						]}
					/>
					<Dropdown
						name="credentialing_type"
						title="Credentialing Type"
						options={[
							"Initial Credentialing",
							"Demographic Updates",
							"Re Credentialing",
							"Medical Licensure",
							"Individual Practitioner",
							"Group Practice Facility",
							"Member as a Group",
							"Location Add",
						]}
					/>
					<TextInput name="npi_2" title="NPI 2" width="w-1/6" />
					<TextInput name="tax_id" title="Tax ID" width="w-1/6" />
				</div>

				<div className="w-full flex flex-wrap justify-start items-end gap-4">
					<TextInput
						name="legal_business_name"
						title="Legal Business Name"
						width="w-[49%]"
					/>
					<TextInput
						name="doing_business_name"
						title="Doing Business Name"
						width="w-[49%]"
					/>
					<Dropdown
						name="taxonomy_code_1"
						title="Taxonomy Code"
						options={taxonomyCodes}
						width="w-[49%]"
					/>
					<Dropdown
						name="taxonomy_code_2"
						title="Taxonomy Code 2 (if applicable)"
						options={taxonomyCodes}
						required={false}
						width="w-[49%]"
					/>

					{/* Service Address */}
					<div className="w-full flex flex-wrap justify-start gap-4 items-start">
						<TextInput
							name="service_address1"
							title="Service Location Address 1"
							width="w-[35%]"
						/>
						<TextInput
							name="service_address2"
							title="Service Location Address 2"
							width="w-[25%]"
							required={false}
						/>
						<TextInput name="service_city" title="City" width="w-[10%]" />
						<Dropdown
							name="service_state"
							title="State"
							options={stateAbbreviations}
							width="w-[8%]"
						/>
						<ZipCodeInput
							name="service_zipcode"
							title="ZipCode"
							width="w-[8%]"
						/>
						<PhoneInput name="service_phone" title="Practice Ph." />
						<PhoneInput
							name="service_appointment_phone"
							title="Practice Appointment Ph."
						/>
						<PhoneInput name="service_fax" title="Practice Fax" />
						<EmailInput
							name="service_email"
							title="Practice Email"
							width="w-[27.5%]"
						/>
					</div>

					{/* Mailing Address */}
					<HeadingLine2 title="Mailing Address" />
					<div className="w-full flex flex-wrap justify-start gap-4 items-center text-xs">
						<input type="checkbox" onChange={copyServiceAddress} /> Same as
						Service Location Address
					</div>

					<div className="w-full flex flex-wrap justify-start gap-4 items-start">
						<TextInput
							name="mailing_address1"
							title="Mailing Address 1"
							width="w-[35%]"
						/>
						<TextInput
							name="mailing_address2"
							title="Mailing Address 2"
							width="w-[25%]"
							required={false}
						/>
						<TextInput name="mailing_city" title="City" width="w-[10%]" />
						<Dropdown
							name="mailing_state"
							title="State"
							options={stateAbbreviations}
							width="w-[8%]"
						/>
						<ZipCodeInput
							name="mailing_zipcode"
							title="ZipCode"
							width="w-[8%]"
						/>
						<PhoneInput name="mailing_phone" title="Practice Ph." />
						<PhoneInput name="mailing_fax" title="Practice Fax" />
						<EmailInput
							name="mailing_email"
							title="Practice Email"
							width="w-[27.5%]"
						/>
					</div>

					{/* Correspondence Address */}
					<HeadingLine2 title="Correspondence Address" />
					<div className="w-full flex flex-wrap justify-start gap-4 items-center text-xs">
						<input type="checkbox" onChange={copyMailingAddress} /> Same as
						Billing / Mailing Address
					</div>

					<div className="w-full flex flex-wrap justify-start gap-4 items-start">
						<TextInput
							name="correspondence_address1"
							title="Correspondence Address 1"
							width="w-[35%]"
						/>
						<TextInput
							name="correspondence_address2"
							title="Correspondence Address 2"
							width="w-[25%]"
							required={false}
						/>
						<TextInput
							name="correspondence_city"
							title="City"
							width="w-[10%]"
						/>
						<Dropdown
							name="correspondence_state"
							title="State"
							options={stateAbbreviations}
							width="w-[8%]"
						/>
						<ZipCodeInput
							name="correspondence_zipcode"
							title="ZipCode"
							width="w-[8%]"
						/>
						<PhoneInput name="correspondence_phone" title="Practice Ph." />
						<PhoneInput name="correspondence_fax" title="Practice Fax" />
						<EmailInput
							name="correspondence_email"
							title="Practice Email"
							width="w-[27.5%]"
						/>
					</div>

					<div className="w-full flex flex-wrap justify-start items-center gap-5">
						<TextInput
							name="ptan_medicare_number"
							title="PTAN/Medicare number"
						/>
						<TextInput name="medicaid_number" title="Medicaid number" />
						<DateInput name="start_date" title="Practice Start Date" />
					</div>

					{/* Practice Contact Information */}
					<HeadingLine title="Practice Contact Information" />

					<div className="w-full flex flex-wrap justify-start gap-4 items-start">
						<Dropdown
							name="practice_contact_role"
							width="w-[14%]"
							title="Practice Contact Person"
							options={[
								"CFO( Chief Financial Officer)",
								"CTO (Chief Technology Officer)",
								"CEO ( Chief Executive Officer)",
								"Owner",
								"Administrator",
								"Office Manager",
								"Contractor",
							]}
						/>
						<TextInput
							name="practice_contact_name"
							title="Practice Contact Name"
						/>
						<EmailInput name="practice_contact_email" title="Work Email" />
						<PhoneInput name="practice_contact_work_phone" title="Work Ph." />
						<PhoneInput name="practice_contact_cell_phone" title="Cell Ph." />
					</div>

					<div className="w-full flex justify-end mt-6">
						<button
							type="submit"
							className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
						>
							Save Profile
						</button>
					</div>

					<NavBottom />
				</div>
			</form>
		</>
	);
}

export default PracticeProfile;
