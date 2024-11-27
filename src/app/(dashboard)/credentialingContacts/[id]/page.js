"use client";
import Button from "@/components/ui/Button";
import HeadingLine from "@/components/ui/HeadingLine";
import HeadingLine2 from "@/components/ui/HeadingLine2";
import Dropdown from "@/components/ui/inputFields/DropDown";
import EmailInput from "@/components/ui/inputFields/EmailInput";
import PhoneInput from "@/components/ui/inputFields/PhoneInput";
import TextInput from "@/components/ui/inputFields/TextInput";
import ZipCodeInput from "@/components/ui/inputFields/ZipcodeInput";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

export default function CredentialingContracts() {
  const [creds, setCreds] = useState(false);
  const handleClick = () => {
    setCreds(!creds);
  };
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <HeadingLine title={"Credentialing Contacts"} />

      <div className="w-full flex flex-row justify-end items-center">
        {" "}
        <Button title={"Add"} onClick={handleClick} />
      </div>
      {creds ? (
        <>
          <div className="w-full flex flex-wrap justify-start items-center gap-4 mx-4 shadow-lg rounded-lg p-4">
            <Dropdown
              title={"Credentialing Title"}
              options={[
                "Select Title",
                "CFO",
                "Credentialing Director",
                "Credentialing Manager",
                "Office Manager",
                "Provider",
                "Manager Billing",
                "Biller",
                "Administrator",
                "Vendor",
              ]}
            />
            <TextInput
              title={"First Name"}
              width={"w-1/3"}
              required={false}
              name={"firstName"}
              // value={formData.firstName}
              // onChange={handleChange}
            />
            <TextInput
              title={"Middle Initial"}
              required={false}
              width={"w-[8%]"}
              name={"middleInitial"}
              // value={formData.middleInitial}
              // onChange={handleChange}
            />
            <TextInput
              title={"Last Name"}
              width={"w-1/3"}
              required={false}
              name={"lastName"}
              // value={formData.lastName}
              // onChange={handleChange}
            />

            <HeadingLine2 title={"Mailing Address"} />

            <div className="w-full flex flex-wrap justify-start gap-4 items-start">
              <TextInput
                title={"Mailing Address 1"}
                width="w-[35%]"
                name={"mailingAddress1"}
                // value={formData.mailingAddress1}
                // onChange={handleChange}
              />
              <TextInput
                title={"Mailing Address 2"}
                width={"w-[25%]"}
                required={false}
                name={"mailingAddress2"}
                // value={formData.mailingAddress2}
                // onChange={handleChange}
              />
              <TextInput
                title={"City"}
                width={"w-[10%]"}
                name={"mailingCity"}
                // value={formData.mailingCity}
                // onChange={handleChange}
              />
              <Dropdown
                title={"State"}
                options={stateAbbreviations}
                width="w-[8%]"
                name={"mailingState"}
                // value={formData.mailingState}
                // onChange={handleChange}
              />

              <ZipCodeInput
                title={"ZipCode"}
                width={"w-[8%]"}
                name={"mailingZipCode"}
                // value={formData.mailingZipCode}
                // onChange={handleChange}
              />
            </div>

            <HeadingLine title={"Contact Information"} />

            <div className="w-full flex flex-wrap justify-start gap-4 items-start">
              <PhoneInput
                title={"Home Ph."}
                name={"homePhone"}
                // value={formData.homePhone}
                // onChange={handleChange}
              />
              <PhoneInput
                title={"Cell Ph."}
                name={"cellPhone"}
                // value={formData.cellPhone}
                // onChange={handleChange}
              />
              <EmailInput
                title={"Personal Email"}
                name={"personalEmail"}
                // value={formData.personalEmail}
                // onChange={handleChange}
              />
              <EmailInput
                title={"Work Email"}
                name={"workEmail"}
                // value={formData.workEmail}
                // onChange={handleChange}
              />
            </div>

            {/* Emergency Contact Information */}
            <HeadingLine title={"Emergency Contact Information"} />

            <div className="w-full flex flex-wrap justify-start gap-4 items-start">
              <TextInput
                title={"Contact Name"}
                name={"emergencyContactName"}
                // value={formData.emergencyContactName}
                // onChange={handleChange}
              />
              <Dropdown
                options={[
                  "Son",
                  "Daughter",
                  "Husband",
                  "Spouse",
                  "Father",
                  "Mother",
                ]}
                title={"Relation"}
                name={"emergencyContactRelation"}
                // value={formData.emergencyContactRelation}
                // onChange={handleChange}
              />
              <PhoneInput
                title={"Cell Ph."}
                name={"emergencyContactPhone"}
                // value={formData.emergencyContactPhone}
                // onChange={handleChange}
              />

              <TextInput
                title={"Email"}
                type="email"
                name={"emergencyContactEmail"}
                // value={formData.emergencyContactEmail}
                // onChange={handleChange}
              />
            </div>
            <div className="w-full flex flex-row justify-end items-center">
              <Button title={"Save"} />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}

      <div className="w-full flex flex-row justify-between items-center gap-4 shadow-lg rounded-lg p-4">
        <div className="w-1/5 flex flex-col justify-start items-start gap-2">
          <span>Adnan Qamar </span>
        </div>
        <div className="w-1/5 flex flex-col justify-start items-start gap-2">
          <span>CFO</span>
          <span>30 N GOULD, ST, STE R </span>
          <span>281-824-1497</span>
        </div>
        <div className="w-1/5 flex flex-col justify-start items-start gap-2">
          <span>adnanq@billingcaresolutions.com</span>
        </div>
        <div className="w-1/5 flex flex-col justify-start items-start gap-2">
        <div className="w-full flex flex-row justify-end items-center gap-4">
								<CiEdit
									className="size-6 text-primary cursor-pointer"
								/>
								<MdDeleteOutline
									className="size-6 text-red-400 cursor-pointer"
								/>
							</div>
        </div>
      </div>
    </div>
  );
}
