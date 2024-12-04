"use client";

import Dropdown from "@/components/ui/inputFields/DropDown";
import HeadingLine from "@/components/ui/HeadingLine";
import TextInput from "@/components/ui/inputFields/TextInput";
import { medicalTitles } from "@/data/medicalTitles";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import SSNInput from "@/components/ui/inputFields/SSNInput";
import DateInput from "@/components/ui/inputFields/DateInput";
import ZipCodeInput from "@/components/ui/inputFields/ZipcodeInput";
import PhoneInput from "@/components/ui/inputFields/PhoneInput";
import EmailInput from "@/components/ui/inputFields/EmailInput";
import HeadingLine2 from "@/components/ui/HeadingLine2";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { BarLoader } from "react-spinners";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import useRouter
import BaseInput from "@/components/ui/inputFields/BaseInput";
import NavBottom from "@/components/ui/NavBottom";

function ProvidersInformation() {
	const { id: uuid } = useParams();
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [apiLoading, setApiLoading] = useState(false);
	const [formData, setFormData] = useState({
		firstName: "",
		middleInitial: "",
		lastName: "",
		providerTitle: medicalTitles[0] || "0",
		ssn: "",
		gender: "male",
		dob: "",
		birthCity: "",
		birthState: stateAbbreviations[0] || "",
		birthCountry: "",
		licenseOrId: "",
		licenseStateIssued: stateAbbreviations[0] || "",
		licenseIssuedDate: "",
		licenseExpiryDate: "",
		picture: "",
		picture_public_url: "",

		// Home Address
		homeAddress1: "",
		homeAddress2: "",
		homeCity: "",
		homeState: stateAbbreviations[0],
		homeZipCode: "",

		// Service Location Address
		serviceAddress1: "",
		serviceAddress2: "",
		serviceCity: "",
		serviceState: stateAbbreviations[0],
		serviceZipCode: "",

		// Mailing Address
		mailingAddress1: "",
		mailingAddress2: "",
		mailingCity: "",
		mailingState: stateAbbreviations[0],
		mailingZipCode: "",

		// Contact Information
		homePhone: "",
		cellPhone: "",
		personalEmail: "",
		workEmail: "",

		// Emergency Contact Information
		emergencyContactName: "",
		emergencyContactRelation: "",
		emergencyContactPhone: "",
		emergencyContactEmail: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleReadonly = (fieldGroup) => {
		if (fieldGroup === "serviceAddress") {
			setFormData((prev) => ({
				...prev,
				serviceAddress1: formData.homeAddress1,
				serviceAddress2: formData.homeAddress2,
				serviceCity: formData.homeCity,
				serviceState: formData.homeState,
				serviceZipCode: formData.homeZipCode,
			}));
		} else if (fieldGroup === "mailingAddress") {
			setFormData((prev) => ({
				...prev,
				mailingAddress1: formData.serviceAddress1,
				mailingAddress2: formData.serviceAddress2,
				mailingCity: formData.serviceCity,
				mailingState: formData.serviceState,
				mailingZipCode: formData.serviceZipCode,
			}));
		}
	};

	const handleSubmit = async () => {
		toast.loading("Submitting");
		console.log("handleSubmit");
		if (
			formData.emergencyContactRelation === "Select Relation" ||
			!formData.emergencyContactRelation
		) {
			return toast.error("Please select relationship");
		}
		setLoading(true);
		const addedBy = localStorage.getItem("user_uuid");
		try {
			const formDataObj = new FormData();
			Object.entries({ ...formData, added_by: addedBy }).forEach(
				([key, value]) => {
					formDataObj.append(key, value);
					if (key === "picture") console.log(value);
				}
			);

			const response = await axios.post("/api/providers-info", formDataObj);
			toast.dismiss();
			toast.success("Successfully Added Provider");
			router.push(`/providersInformation/${response.data.provider_id}`);
		} catch (error) {
			toast.dismiss();

			console.error("Error:", error);
			toast.error("Failed to save provider information. Please try again.");
		}

		setLoading(false);
	};

	useEffect(() => {
		const fetchProviderInfo = async () => {
			setApiLoading(true);
			try {
				const response = await fetch(`/api/providers-info?uuid=${uuid}`);
				if (!response.ok) {
					throw new Error("Failed to fetch provider information");
				}

				const data = await response.json();

				console.log("DATA :", data);
				setFormData((prevData) => ({
					...prevData,
					firstName: data.first_name || "",
					middleInitial: data.middle_initial || "",
					lastName: data.last_name || "",
					providerTitle: data.provider_title || medicalTitles[0],
					ssn: data.ssn || "",
					gender: data.gender || "male",
					dob: data.dob || "",
					birthCity: data.birth_city || "",
					birthState: data.birth_state || stateAbbreviations[0],
					birthCountry: data.birth_country || "",
					licenseOrId: data.license_id || "",
					licenseStateIssued: data.state_issued || stateAbbreviations[0],
					licenseIssuedDate: data.issue_date || "",
					licenseExpiryDate: data.expiry_date || "",
					picture: data.picture_url || "",
					picture_public_url: data.picture_public_url || "",

					homeAddress1: data.home_address?.address_line_1 || "",
					homeAddress2: data.home_address?.address_line_2 || "",
					homeCity: data.home_address?.city || "",
					homeState: data.home_address?.state || stateAbbreviations[0],
					homeZipCode: data.home_address?.zip_code || "",

					serviceAddress1: data.service_address?.address_line_1 || "",
					serviceAddress2: data.service_address?.address_line_2 || "",
					serviceCity: data.service_address?.city || "",
					serviceState: data.service_address?.state || stateAbbreviations[0],
					serviceZipCode: data.service_address?.zip_code || "",

					mailingAddress1: data.mailing_address?.address_line_1 || "",
					mailingAddress2: data.mailing_address?.address_line_2 || "",
					mailingCity: data.mailing_address?.city || "",
					mailingState: data.mailing_address?.state || stateAbbreviations[0],
					mailingZipCode: data.mailing_address?.zip_code || "",

					homePhone: data.contact?.home_phone || "",
					cellPhone: data.contact?.cell_phone || "",
					personalEmail: data.contact?.email || "",
					workEmail: data.contact?.work_email || "",

					emergencyContactName: data.emergency_contact?.contact_name || "",
					emergencyContactRelation: data.emergency_contact?.relation || "",
					emergencyContactPhone: data.emergency_contact?.cell_phone || "",
					emergencyContactEmail: data.emergency_contact?.email || "",
				}));
			} catch (error) {
				console.error("Error fetching provider info:", error);
				toast.error("Failed to fetch provider information.");
			} finally {
				setApiLoading(false);
			}
		};

		if (uuid != "new_user") {
			fetchProviderInfo();
		}
	}, []);

	return (
		<>
			{apiLoading ? (
				<div className="w-full h-screen flex flex-col justify-center items-center">
					<BarLoader />
				</div>
			) : (
				<div className="w-full flex flex-col justify-center items-center gap-4">
					{/* Personal Information */}
					<HeadingLine title={"Personal Information"} />

					<div className="w-full flex flex-wrap justify-start gap-4 items-start">
						<TextInput
							title={"First Name"}
							width={"w-1/3"}
							required={false}
							name={"firstName"}
							value={formData.firstName}
							onChange={handleChange}
						/>
						<TextInput
							title={"Middle Initial"}
							required={false}
							width={"w-[8%]"}
							name={"middleInitial"}
							value={formData.middleInitial}
							onChange={handleChange}
							maxLength={2}
						/>
						<TextInput
							title={"Last Name"}
							width={"w-1/3"}
							required={false}
							name={"lastName"}
							value={formData.lastName}
							onChange={handleChange}
						/>

						<Dropdown
							title={"Provider Title"}
							options={medicalTitles}
							width="w-[16.5%]"
							name="providerTitle"
							value={formData.providerTitle}
							onChange={handleChange}
						/>
					</div>
					<div className="w-full flex flex-wrap justify-start items-start gap-4">
						<SSNInput
							title="SSN"
							required
							readonly={false}
							width="w-[15%]"
							value={formData.ssn}
							onChange={handleChange}
						/>
						<Dropdown
							title={"Gender"}
							options={["Male", "Female", "Other"]}
							width="w-1/12"
							name="gender"
							value={formData.gender}
							onChange={handleChange}
						/>
						<DateInput
							title={"DOB"}
							width="w-[17%]"
							name={"dob"}
							value={formData.dob}
							onChange={(e) => handleChange(e)}
						/>

						

						<TextInput
							title={"Birth City"}
							width={"w-1/5"}
							required={false}
							name={"birthCity"}
							value={formData.birthCity}
							onChange={handleChange}
						/>
						<Dropdown
							title={"Birth State"}
							options={stateAbbreviations}
							width="w-[8%]"
							required={false}
							name="birthState"
							value={formData.birthState}
							onChange={handleChange}
						/>
						<TextInput
							title={"Birth Country"}
							width={"w-1/5"}
							required={false}
							name={"birthCountry"}
							value={formData.birthCountry}
							onChange={handleChange}
						/>
					</div>
					<div className="w-full flex flex-wrap justify-start items-start gap-4">
						<TextInput
							title={"Driving License or ID"}
							width={"w-[34.5%]"}
							name={"licenseOrId"}
							value={formData.licenseOrId}
							onChange={handleChange}
							maxLength={15}
						/>
						<Dropdown
							title={"State Issued"}
							options={stateAbbreviations}
							width="w-[16.5%]"
							name="licenseStateIssued"
							value={formData.licenseStateIssued}
							onChange={handleChange}
						/>
						<DateInput
							title={"Issued Date"}
							name={"licenseIssuedDate"}
							value={formData.licenseIssuedDate}
							onChange={handleChange}
						/>
						<DateInput
							title={"Expiry Date"}
							name={"licenseExpiryDate"}
							value={formData.licenseExpiryDate}
							onChange={handleChange}
						/>
						<BaseInput
							title={"Profile Picture"}
							width="w-1/6"
							type={"file"}
							name={"picture"}
							value={formData.picture}
							onChange={handleChange}
						/>
					</div>

					{/* Home Address */}
					<HeadingLine title={"Home Address"} />

					<div className="w-full flex flex-wrap justify-start gap-4 items-start">
						<TextInput
							title={"Street Address 1"}
							width="w-[35%]"
							name={"homeAddress1"}
							value={formData.homeAddress1}
							onChange={handleChange}
						/>
						<TextInput
							title={"Street Address 2"}
							width={"w-[25%]"}
							required={false}
							name={"homeAddress2"}
							value={formData.homeAddress2}
							onChange={handleChange}
						/>
						<TextInput
							title={"City"}
							width={"w-[10%]"}
							name={"homeCity"}
							value={formData.homeCity}
							onChange={handleChange}
						/>
						<Dropdown
							title={"State"}
							options={stateAbbreviations}
							width="w-[8%]"
							name={"homeState"}
							value={formData.homeState}
							onChange={handleChange}
						/>
						<ZipCodeInput
							title={"ZipCode"}
							width={"w-[8%]"}
							name={"homeZipCode"}
							value={formData.homeZipCode}
							onChange={handleChange}
						/>
					</div>

					<HeadingLine2 title={"Service Location Address"} />

					<div className="w-full flex flex-wrap justify-start gap-4 items-center text-xs">
						<input
							type="checkbox"
							onClick={() => handleReadonly("serviceAddress")}
						/>{" "}
						Same as Home Address
					</div>
					<div className="w-full flex flex-wrap justify-start gap-4 items-start">
						<TextInput
							title={"Service Location Address 1"}
							width="w-[35%]"
							name={"serviceAddress1"}
							value={formData.serviceAddress1}
							onChange={handleChange}
						/>
						<TextInput
							title={"Service Location Address 2"}
							width={"w-[25%]"}
							required={false}
							name={"serviceAddress2"}
							value={formData.serviceAddress2}
							onChange={handleChange}
						/>
						<TextInput
							title={"City"}
							width={"w-[10%]"}
							name={"serviceCity"}
							value={formData.serviceCity}
							onChange={handleChange}
						/>
						<Dropdown
							title={"State"}
							options={stateAbbreviations}
							width="w-[8%]"
							name={"serviceState"}
							value={formData.serviceState}
							onChange={handleChange}
						/>
						<ZipCodeInput
							title={"ZipCode"}
							width={"w-[8%]"}
							name={"serviceZipCode"}
							value={formData.serviceZipCode}
							onChange={handleChange}
						/>
					</div>

					<HeadingLine2 title={"Mailing Address"} />

					<div className="w-full flex flex-wrap justify-start gap-4 items-center text-xs">
						<input
							type="checkbox"
							onClick={() => handleReadonly("mailingAddress")}
						/>{" "}
						Same as Service Location Address
					</div>

					<div className="w-full flex flex-wrap justify-start gap-4 items-start">
						<TextInput
							title={"Mailing Address 1"}
							width="w-[35%]"
							name={"mailingAddress1"}
							value={formData.mailingAddress1}
							onChange={handleChange}
						/>
						<TextInput
							title={"Mailing Address 2"}
							width={"w-[25%]"}
							required={false}
							name={"mailingAddress2"}
							value={formData.mailingAddress2}
							onChange={handleChange}
						/>
						<TextInput
							title={"City"}
							width={"w-[10%]"}
							name={"mailingCity"}
							value={formData.mailingCity}
							onChange={handleChange}
						/>
						<Dropdown
							title={"State"}
							options={stateAbbreviations}
							width="w-[8%]"
							name={"mailingState"}
							value={formData.mailingState}
							onChange={handleChange}
						/>

						<ZipCodeInput
							title={"ZipCode"}
							width={"w-[8%]"}
							name={"mailingZipCode"}
							value={formData.mailingZipCode}
							onChange={handleChange}
						/>
					</div>

					{/* Contact Information */}
					<HeadingLine title={"Contact Information"} />

					<div className="w-full flex flex-wrap justify-start gap-4 items-start">
						<PhoneInput
							title={"Home Ph."}
							name={"homePhone"}
							value={formData.homePhone}
							onChange={handleChange}
						/>
						<PhoneInput
							title={"Cell Ph."}
							name={"cellPhone"}
							value={formData.cellPhone}
							onChange={handleChange}
						/>
						<EmailInput
							title={"Personal Email"}
							name={"personalEmail"}
							value={formData.personalEmail}
							onChange={handleChange}
						/>
						<EmailInput
							title={"Work Email"}
							name={"workEmail"}
							value={formData.workEmail}
							onChange={handleChange}
						/>
					</div>

					{/* Emergency Contact Information */}
					<HeadingLine title={"Emergency Contact Information"} />

					<div className="w-full flex flex-wrap justify-start gap-4 items-start">
						<TextInput
							title={"Contact Name"}
							name={"emergencyContactName"}
							value={formData.emergencyContactName}
							onChange={handleChange}
						/>
						<Dropdown
							options={[
								"Select Relation",
								"Son",
								"Daughter",
								"Husband",
								"Spouse",
								"Father",
								"Mother",
							]}
							title={"Relation"}
							name={"emergencyContactRelation"}
							value={formData.emergencyContactRelation}
							onChange={handleChange}
						/>
						<PhoneInput
							title={"Cell Ph."}
							name={"emergencyContactPhone"}
							value={formData.emergencyContactPhone}
							onChange={handleChange}
						/>

						<TextInput
							title={"Email"}
							type="email"
							name={"emergencyContactEmail"}
							value={formData.emergencyContactEmail}
							onChange={handleChange}
						/>
					</div>
						
					{/* <Button title={"Save & Next"} onClick={handleSubmit} /> */}
					<NavBottom onSave={handleSubmit}/>
				</div>
			)}
		</>
	);
}

export default ProvidersInformation;
