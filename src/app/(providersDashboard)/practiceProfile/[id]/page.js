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
import { usePracticeProfile } from "./usePracticeProfile";
import BulkUploadOrganizationButton from "@/components/organizationManagement/BulkUploadOrganizations/BulkUploadOrganizationsButton";

function PracticeProfile() {
  const {
    formData,
    handleInputChange,
    copyServiceAddress,
    copyMailingAddress,
    handleSubmit,
    PRACTICE_TYPES,
    SERVICE_TYPES,
    CREDENTIALING_TYPES,
    CONTACT_ROLES,
  } = usePracticeProfile();

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 p-6">
      <div className="w-full">
        <div className="w-full flex justify-between items-center">
          <p className="w-full text-lg">Practice Profile</p>
          <BulkUploadOrganizationButton />
        </div>
        <div className="w-full h-[2px] bg-primary"></div>
      </div>

      <div className="w-full flex flex-wrap justify-start gap-4 items-start">
        <Dropdown
          name="type"
          title="PRACTICE TYPE"
          options={PRACTICE_TYPES}
          value={formData.type}
          onChange={handleInputChange}
        />
        <Dropdown
          name="type_of_service_provided"
          title="Type of Service Provided"
          options={SERVICE_TYPES}
          value={formData.type_of_service_provided}
          onChange={handleInputChange}
        />
        <Dropdown
          name="credentialing_type"
          title="Credentialing Type"
          options={CREDENTIALING_TYPES}
          value={formData.credentialing_type}
          onChange={handleInputChange}
        />
        <TextInput
          name="npi_2"
          type="text"
          is_number={true}
          maxLength={10}
          title="NPI 2"
          width="w-1/6"
          value={formData.npi_2}
          onChange={handleInputChange}
        />
        <TextInput
          name="tax_id"
          title="Tax ID"
          is_number={true}
          type="text"
          width="w-1/6"
          maxLength={9}
          value={formData.tax_id}
          onChange={handleInputChange}
        />
      </div>

      <div className="w-full flex flex-wrap justify-start items-end gap-4">
        <TextInput
          name="legal_business_name"
          title="Legal Business Name"
          width="w-[49%]"
          value={formData.legal_business_name}
          onChange={handleInputChange}
        />
        <TextInput
          name="doing_business_name"
          title="Doing Business Name"
          width="w-[49%]"
          value={formData.doing_business_name}
          onChange={handleInputChange}
        />
        <Dropdown
          name="taxonomy_code_1"
          title="Taxonomy Code"
          options={taxonomyCodes}
          width="w-[49%]"
          value={formData.taxonomy_code_1}
          onChange={handleInputChange}
        />
        <Dropdown
          name="taxonomy_code_2"
          title="Taxonomy Code 2 (if applicable)"
          options={taxonomyCodes}
          required={false}
          width="w-[49%]"
          value={formData.taxonomy_code_2}
          onChange={handleInputChange}
        />

        {/* Service Address */}
        <div className="w-full flex flex-wrap justify-start gap-4 items-start">
          <TextInput
            name="service_address1"
            title="Service Location Address 1"
            width="w-[35%]"
            value={formData.service_address1}
            onChange={handleInputChange}
          />
          <TextInput
            name="service_address2"
            title="Service Location Address 2"
            width="w-[25%]"
            required={false}
            value={formData.service_address2}
            onChange={handleInputChange}
          />
          <TextInput
            name="service_city"
            title="City"
            width="w-[10%]"
            value={formData.service_city}
            onChange={handleInputChange}
          />
          <Dropdown
            name="service_state"
            title="State"
            options={stateAbbreviations}
            width="w-[8%]"
            value={formData.service_state}
            onChange={handleInputChange}
          />
          <ZipCodeInput
            name="service_zipcode"
            title="ZipCode"
            width="w-[8%]"
            value={formData.service_zipcode}
            onChange={handleInputChange}
          />
          <PhoneInput
            name="service_phone"
            title="Practice Ph."
            value={formData.service_phone}
            onChange={handleInputChange}
          />
          <PhoneInput
            name="service_appointment_phone"
            title="Practice Appointment Ph."
            value={formData.service_appointment_phone}
            onChange={handleInputChange}
          />
          <PhoneInput
            name="service_fax"
            title="Practice Fax"
            value={formData.service_fax}
            onChange={handleInputChange}
          />
          <EmailInput
            name="service_email"
            title="Practice Email"
            width="w-[27.5%]"
            value={formData.service_email}
            onChange={handleInputChange}
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
            value={formData.mailing_address1}
            onChange={handleInputChange}
          />
          <TextInput
            name="mailing_address2"
            title="Mailing Address 2"
            width="w-[25%]"
            required={false}
            value={formData.mailing_address2}
            onChange={handleInputChange}
          />
          <TextInput
            name="mailing_city"
            title="City"
            width="w-[10%]"
            value={formData.mailing_city}
            onChange={handleInputChange}
          />
          <Dropdown
            name="mailing_state"
            title="State"
            options={stateAbbreviations}
            width="w-[8%]"
            value={formData.mailing_state}
            onChange={handleInputChange}
          />
          <ZipCodeInput
            name="mailing_zipcode"
            title="ZipCode"
            width="w-[8%]"
            value={formData.mailing_zipcode}
            onChange={handleInputChange}
          />
          <PhoneInput
            name="mailing_phone"
            title="Practice Ph."
            value={formData.mailing_phone}
            onChange={handleInputChange}
          />
          <PhoneInput
            name="mailing_fax"
            title="Practice Fax"
            value={formData.mailing_fax}
            onChange={handleInputChange}
          />
          <EmailInput
            name="mailing_email"
            title="Practice Email"
            width="w-[27.5%]"
            value={formData.mailing_email}
            onChange={handleInputChange}
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
            value={formData.correspondence_address1}
            onChange={handleInputChange}
          />
          <TextInput
            name="correspondence_address2"
            title="Correspondence Address 2"
            width="w-[25%]"
            required={false}
            value={formData.correspondence_address2}
            onChange={handleInputChange}
          />
          <TextInput
            name="correspondence_city"
            title="City"
            width="w-[10%]"
            value={formData.correspondence_city}
            onChange={handleInputChange}
          />
          <Dropdown
            name="correspondence_state"
            title="State"
            options={stateAbbreviations}
            width="w-[8%]"
            value={formData.correspondence_state}
            onChange={handleInputChange}
          />
          <ZipCodeInput
            name="correspondence_zipcode"
            title="ZipCode"
            width="w-[8%]"
            value={formData.correspondence_zipcode}
            onChange={handleInputChange}
          />
          <PhoneInput
            name="correspondence_phone"
            title="Practice Ph."
            value={formData.correspondence_phone}
            onChange={handleInputChange}
          />
          <PhoneInput
            name="correspondence_fax"
            title="Practice Fax"
            value={formData.correspondence_fax}
            onChange={handleInputChange}
          />
          <EmailInput
            name="correspondence_email"
            title="Practice Email"
            width="w-[27.5%]"
            value={formData.correspondence_email}
            onChange={handleInputChange}
          />
        </div>

        <div className="w-full flex flex-wrap justify-start items-center gap-5">
          <TextInput
            name="ptan_medicare_number"
            title="PTAN/Medicare number"
            value={formData.ptan_medicare_number}
            onChange={handleInputChange}
          />
          <TextInput
            name="medicaid_number"
            title="Medicaid number"
            value={formData.medicaid_number}
            onChange={handleInputChange}
          />
          <DateInput
            name="start_date"
            title="Practice Start Date"
            value={formData.start_date}
            onChange={handleInputChange}
          />
        </div>

        {/* Practice Contact Information */}
        <HeadingLine title="Practice Contact Information" />

        <div className="w-full flex flex-wrap justify-start gap-4 items-start">
          <Dropdown
            name="practice_contact_role"
            width="w-[14%]"
            title="Practice Contact Person"
            options={CONTACT_ROLES}
            value={formData.practice_contact_role}
            onChange={handleInputChange}
          />
          <TextInput
            name="practice_contact_name"
            title="Practice Contact Name"
            value={formData.practice_contact_name}
            onChange={handleInputChange}
          />
          <EmailInput
            name="practice_contact_email"
            title="Work Email"
            value={formData.practice_contact_email}
            onChange={handleInputChange}
          />
          <PhoneInput
            name="practice_contact_work_phone"
            title="Work Ph."
            value={formData.practice_contact_work_phone}
            onChange={handleInputChange}
          />
          <PhoneInput
            name="practice_contact_cell_phone"
            title="Cell Ph."
            value={formData.practice_contact_cell_phone}
            onChange={handleInputChange}
          />
        </div>

        {/* <div className="w-full flex justify-end mt-6">
					<button
						type="submit"
						onClick={handleSubmit}
						className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
					>
						Save Profile
					</button>
				</div> */}

        <NavBottom onSave={handleSubmit} />
      </div>
    </div>
  );
}

export default PracticeProfile;
