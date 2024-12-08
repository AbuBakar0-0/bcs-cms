"use client";

import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/inputFields/DropDown";
import EmailInput from "@/components/ui/inputFields/EmailInput";
import PhoneInput from "@/components/ui/inputFields/PhoneInput";
import TextInput from "@/components/ui/inputFields/TextInput";
import ZipCodeInput from "@/components/ui/inputFields/ZipcodeInput";
import NavBottom from "@/components/ui/NavBottom";
import SubmitButton from "@/components/ui/SubmitButton";
import { medicalTitles } from "@/data/medicalTitles";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import { CiEdit } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { useProfessionalReferences } from "./useProfessionalRef";
import { BarLoader } from "react-spinners";

function ProfessionalReferences() {
  const {
    reference,
    references,
    loading,
    formData,
    editingId,
    handleReference,
    handleInputChange,
    handleSubmit,
    handleEdit,
    handleDelete,
  } = useProfessionalReferences();

  const ReferenceCard = ({ ref }) => (
    <div className="w-full shadow-xl rounded-lg border-l-8 border-primary flex flex-row justify-between items-center gap-4 p-6">
      <div className="w-1/2">
        <h3 className="font-medium">{ref.provider_type}</h3>
        <p className="text-sm text-gray-600">
          {`${ref.first_name} ${
            ref.middle_initial ? ref.middle_initial + "." : ""
          } ${ref.last_name}`}
        </p>
        <p>{ref.cell_phone}</p>
      </div>

      <div className="w-1/2 flex flex-col text-sm text-gray-600">
        <p>
          {ref.address_line_1} {ref.address_line_2}
        </p>
        <p>City : {ref.city}</p>
        <p> State: {ref.state}</p>
        <p> Zip Code: {ref.zip_code}</p>
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
                  maxLength={2}
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
                  {/* <Dropdown
										title="Country"
										options={["USA"]}
										width="w-[13%]"
										name="country"
										value={formData.country}
										onChange={handleInputChange}
									/> */}
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
            <BarLoader />
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
