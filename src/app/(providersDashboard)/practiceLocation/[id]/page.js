"use client";

import HeadingLine from "@/components/ui/HeadingLine";
import HeadingLine2 from "@/components/ui/HeadingLine2";
import Dropdown from "@/components/ui/inputFields/DropDown";
import EmailInput from "@/components/ui/inputFields/EmailInput";
import TextInput from "@/components/ui/inputFields/TextInput";
import ZipCodeInput from "@/components/ui/inputFields/ZipcodeInput";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import taxonomyCodes from "@/data/taxonomyCodes";
import { IoAddCircleOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import NavBottom from "@/components/ui/NavBottom";
import Button from "@/components/ui/Button";
import PhoneInput from "@/components/ui/inputFields/PhoneInput";
import { usePracticeLocations } from "./usePraticeLocation";
import { BarLoader } from "react-spinners";

function PracticeLocations() {
  const {
    locations,
    loading,
    showLocationForm,
    formData,
    handleInputChange,
    handleLocation,
    handleEdit,
    handleDelete,
    handleSubmit,
    copyServiceToMailing,
    copyMailingToCorrespondence,
  } = usePracticeLocations();

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <div className="w-full flex flex-row justify-between items-center">
          <p className="w-full text-lg">Practice Location</p>
          <Button
            title={"Add"}
            icon={<IoAddCircleOutline className="size-6" />}
            onClick={handleLocation}
          />
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-4">
          {showLocationForm && (
            <div className="w-full min-h-20 shadow-xl rounded-lg border-l-8 border-primary flex flex-col justify-start items-center gap-4 p-10">
              <div className="w-full flex flex-wrap justify-start items-end gap-4">
                <TextInput
                  title={"Legal Business Name"}
                  width={"w-[49%]"}
                  name="legal_business_name"
                  value={formData.legal_business_name}
                  onChange={handleInputChange}
                />
                <TextInput
                  title={"Doing Business Name"}
                  width={"w-[49%]"}
                  name="doing_business_name"
                  value={formData.doing_business_name}
                  onChange={handleInputChange}
                />
                <TextInput
                  title={"NPI 2 (if applicable)"}
                  type="text"
                  is_number={true}
                  maxLength={10}
                  required={false}
                  name="npi_2"
                  value={formData.npi_2}
                  onChange={handleInputChange}
                />
                <TextInput
                  title={"Tax ID (if applicable)"}
                  required={false}
                  type="text"
                  is_number={true}
                  name="tax_id"
                  value={formData.tax_id}
                  onChange={handleInputChange}
                  maxLength={9}
                />
                <Dropdown
                  title={"Taxonomy Code (if applicable)"}
                  options={taxonomyCodes}
                  required={false}
                  width="w-1/4"
                  name="taxonomy_code_1"
                  value={formData.taxonomy_code_1}
                  onChange={handleInputChange}
                />
                <Dropdown
                  title={"Taxonomy Code 2 (if applicable)"}
                  options={taxonomyCodes}
                  required={false}
                  width="w-1/4"
                  name="taxonomy_code_2"
                  value={formData.taxonomy_code_2}
                  onChange={handleInputChange}
                />

                <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                  <TextInput
                    title={"Service Location Address 1"}
                    width="w-[35%]"
                    name="service_address_1"
                    value={formData.service_address_1}
                    onChange={handleInputChange}
                  />
                  <TextInput
                    title={"Service Location Address 2"}
                    width={"w-[25%]"}
                    required={false}
                    name="service_address_2"
                    value={formData.service_address_2}
                    onChange={handleInputChange}
                  />
                  <TextInput
                    title={"City"}
                    width={"w-[10%]"}
                    name="service_city"
                    value={formData.service_city}
                    onChange={handleInputChange}
                  />
                  <Dropdown
                    title={"State"}
                    options={stateAbbreviations}
                    width="w-[8%]"
                    name="service_state"
                    value={formData.service_state}
                    onChange={handleInputChange}
                  />
                  <ZipCodeInput
                    title={"ZipCode"}
                    width={"w-[8%]"}
                    name="service_zip"
                    value={formData.service_zip}
                    onChange={handleInputChange}
                  />
                  <PhoneInput
                    title={"Location Ph."}
                    name="service_phone"
                    value={formData.service_phone}
                    onChange={handleInputChange}
                  />
                  <PhoneInput
                    title={"Location Appointment Ph."}
                    name="service_appointment_phone"
                    value={formData.service_appointment_phone}
                    onChange={handleInputChange}
                  />
                  <PhoneInput
                    title={"Location Fax"}
                    name="service_fax"
                    value={formData.service_fax}
                    onChange={handleInputChange}
                  />
                  <EmailInput
                    title={"Location Email"}
                    name="service_email"
                    width={"w-[27.5%]"}
                    value={formData.service_email}
                    onChange={handleInputChange}
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
                    name="mailing_address_1"
                    value={formData.mailing_address_1}
                    onChange={handleInputChange}
                  />
                  <TextInput
                    title={"Mailing Address 2"}
                    width={"w-[25%]"}
                    required={false}
                    name="mailing_address_2"
                    value={formData.mailing_address_2}
                    onChange={handleInputChange}
                  />
                  <TextInput
                    title={"City"}
                    width={"w-[10%]"}
                    name="mailing_city"
                    value={formData.mailing_city}
                    onChange={handleInputChange}
                  />
                  <Dropdown
                    title={"State"}
                    options={stateAbbreviations}
                    width="w-[8%]"
                    name="mailing_state"
                    value={formData.mailing_state}
                    onChange={handleInputChange}
                  />
                  <ZipCodeInput
                    title={"ZipCode"}
                    width={"w-[8%]"}
                    name="mailing_zip"
                    value={formData.mailing_zip}
                    onChange={handleInputChange}
                  />
                  <PhoneInput
                    title={"Location Ph."}
                    name="mailing_phone"
                    value={formData.mailing_phone}
                    onChange={handleInputChange}
                  />
                  <PhoneInput
                    title={"Location Fax"}
                    name="mailing_fax"
                    value={formData.mailing_fax}
                    onChange={handleInputChange}
                  />
                  <EmailInput
                    title={"Location Email"}
                    width={"w-[27.5%]"}
                    name="mailing_email"
                    value={formData.mailing_email}
                    onChange={handleInputChange}
                  />
                </div>

                <HeadingLine2 title={"Correspondence Address"} />

                <div className="w-full flex flex-wrap justify-start gap-4 items-center text-xs">
                  <input
                    type="checkbox"
                    onChange={copyMailingToCorrespondence}
                  />
                  Same as Billing / Mailing Address
                </div>

                <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                  <TextInput
                    title={"Correspondence Address 1"}
                    width="w-[35%]"
                    name="correspondence_address_1"
                    value={formData.correspondence_address_1}
                    onChange={handleInputChange}
                  />
                  <TextInput
                    title={"Correspondence Address 2"}
                    width={"w-[25%]"}
                    required={false}
                    name="correspondence_address_2"
                    value={formData.correspondence_address_2}
                    onChange={handleInputChange}
                  />
                  <TextInput
                    title={"City"}
                    width={"w-[10%]"}
                    name="correspondence_city"
                    value={formData.correspondence_city}
                    onChange={handleInputChange}
                  />
                  <Dropdown
                    title={"State"}
                    options={stateAbbreviations}
                    width="w-[8%]"
                    name="correspondence_state"
                    value={formData.correspondence_state}
                    onChange={handleInputChange}
                  />
                  <ZipCodeInput
                    title={"ZipCode"}
                    width={"w-[8%]"}
                    name="correspondence_zip"
                    value={formData.correspondence_zip}
                    onChange={handleInputChange}
                  />
                  <PhoneInput
                    title={"Location Ph."}
                    name="correspondence_phone"
                    value={formData.correspondence_phone}
                    onChange={handleInputChange}
                  />
                  <PhoneInput
                    title={"Location Fax"}
                    name="correspondence_fax"
                    value={formData.correspondence_fax}
                    onChange={handleInputChange}
                  />
                  <EmailInput
                    title={"Location Email"}
                    width={"w-[27.5%]"}
                    name="correspondence_email"
                    value={formData.correspondence_email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="w-full flex flex-wrap justify-start items-center gap-5">
                  <TextInput
                    title={"Location PTAN/Medicare number"}
                    name="ptan_medicare_number"
                    is_number={true}
                    maxLength={10}
                    value={formData.ptan_medicare_number}
                    onChange={handleInputChange}
                  />
                  <TextInput
                    maxLength={10}
                    title={"Medicaid number"}
                    name="medicaid_number"
                    value={formData.medicaid_number}
                    onChange={handleInputChange}
                  />
                </div>

                <HeadingLine title={"Practice Contact Information"} />

                <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                  <Dropdown
                    width="w-[14%]"
                    title={"Practice Contact Person"}
                    options={[
                      "Select Person",
                      "CFO( Chief Financial Officer)",
                      "CTO (Chief Technology Officer)",
                      "CEO ( Chief Executive Officer)",
                      "Owner",
                      "Administrator",
                      "Office Manager",
                      "Contractor",
                    ]}
                    name="practice_contact_type"
                    value={formData.practice_contact_type}
                    onChange={handleInputChange}
                  />
                  <TextInput
                    title={"Practice Contact Name"}
                    name="practice_contact_name"
                    value={formData.practice_contact_name}
                    onChange={handleInputChange}
                  />
                  <EmailInput
                    title={"Work Email"}
                    name="practice_contact_email"
                    value={formData.practice_contact_email}
                    onChange={handleInputChange}
                  />
                  <PhoneInput
                    title={"Work Ph."}
                    name="practice_contact_work_phone"
                    value={formData.practice_contact_work_phone}
                    onChange={handleInputChange}
                  />
                  <PhoneInput
                    title={"Cell Ph."}
                    name="practice_contact_cell_phone"
                    value={formData.practice_contact_cell_phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full mt-4 flex justify-end gap-4">
                  <Button type="submit" title="Save" onClick={handleSubmit} />
                </div>
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div>
            <BarLoader />
          </div>
        ) : locations.length === 0 ? (
          <div>No locations found</div>
        ) : (
          locations.map((location) => (
            <div
              key={location.uuid}
              className="w-full h-24 shadow-xl rounded-lg border-l-8 border-primary flex flex-row justify-between items-center gap-4 p-10"
            >
              <p className="w-1/5">{location.legal_business_name}</p>
              <div className="w-1/3 flex flex-col justify-center items-start">
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
