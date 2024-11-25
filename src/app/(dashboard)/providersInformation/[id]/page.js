"use client";

import Dropdown from "@/components/ui/inputFields/DropDown";
import HeadingLine from "@/components/ui/HeadingLine";
import TextInput from "@/components/ui/inputFields/TextInput";
import { medicalTitles } from "@/data/medicalTitles";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import SSNInput from "../../../../components/ui/inputFields/SSNInput";
import DateInput from "@/components/ui/inputFields/DateInput";
import ZipCodeInput from "@/components/ui/inputFields/ZipcodeInput";
import PhoneInput from "@/components/ui/inputFields/PhoneInput";
import EmailInput from "@/components/ui/inputFields/EmailInput";
import HeadingLine2 from "@/components/ui/HeadingLine2";
import Button from "@/components/ui/Button";
import { useProviderForm } from "./useProviderForm";

function ProvidersInformation() {
	const { formData, handleChange, handleReadonly, handleSubmit } =
		useProviderForm();

	return (
		<>
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
						width="w-1/5"
						name={"licenseIssuedDate"}
						value={formData.licenseIssuedDate}
						onChange={handleChange}
					/>
					<DateInput
						title={"Expiry Date"}
						width="w-1/5"
						name={"licenseExpiryDate"}
						value={formData.licenseExpiryDate}
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
						options={["Son","Daughter","Husband","Spouse","Father","Mother"]}
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

				<Button title={"Save & Next"} onClick={handleSubmit} />
			</div>
		</>
	);
}

export default ProvidersInformation;
