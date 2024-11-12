"use client";

import Dropdown from "@/components/ui/inputFields/DropDown";
import HeadingLine from "@/components/ui/HeadingLine";
import TextInput from "@/components/ui/inputFields/TextInput";
import { medicalTitles } from "@/data/medicalTitles";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import { useState } from "react";
import SSNInput from "./../../../components/ui/inputFields/SSNInput";
import DateInput from "@/components/ui/inputFields/DateInput";
import ZipCodeInput from "@/components/ui/inputFields/ZipcodeInput";
import PhoneInput from "@/components/ui/inputFields/PhoneInput";
import EmailInput from "@/components/ui/inputFields/EmailInput";

function ProvidersInformation() {
  const [readonly, setReadOnly] = useState(false);
  const [providerTitle, setProviderTitle] = useState("");

  const handleReadonly = () => {
    setReadOnly(!readonly);
  };

  const handleProviderTitleChange = (event) => {
    setProviderTitle(event.target.value);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        {/* Personal Information */}
        <HeadingLine title={"Personal Information"} />

        <div className="w-full flex flex-wrap justify-start gap-4 items-start">
          <TextInput title={"First Name"} />
          <TextInput title={"Middle Initial"} required={false} />
          <TextInput title={"Last Name"} />
          <Dropdown title={"Provider Title"} options={medicalTitles} />

          {/* Conditionally rendered text field when "Other" is selected */}
          {providerTitle === "Other" && <TextInput title={"Please Specify"} />}

          <SSNInput />
          <Dropdown title={"Gender"} options={["Male", "Female", "Other"]} />
        </div>

        <div className="w-full flex flex-wrap justify-start gap-4 items-start">
          <TextInput title={"Driver License or ID"} />
          <Dropdown title={"State Issued"} options={stateAbbreviations} />
          <DateInput title={"Issued Date"} />
          <DateInput title={"Expiry Date"} />
        </div>

        {/* Home Address */}
        <HeadingLine title={"Home Address"} />

        <div className="w-full flex flex-wrap justify-start gap-4 items-start">
          <TextInput title={"Street Address 1"} width={"w-[49%]"} />
          <TextInput
            title={"Street Address 2"}
            width={"w-[49%]"}
            required={false}
          />
          <TextInput title={"City"} />
          <Dropdown title={"State Issued"} options={stateAbbreviations} />
          <ZipCodeInput title={"ZipCode"} />
        </div>

        <div className="w-full flex flex-wrap justify-start gap-4 items-center">
          <input type="checkbox" onClick={handleReadonly} /> Same as Home
          Address
        </div>

        <div className="w-full flex flex-wrap justify-start gap-4 items-start">
          <TextInput title={"Mailing Address 1"} width={"w-[49%]"} />
          <TextInput
            title={"Mailing Address 2"}
            width={"w-[49%]"}
            required={false}
          />
          <TextInput title={"City"} />
          <Dropdown title={"State Issued"} options={stateAbbreviations} />
          <ZipCodeInput title={"ZipCode"} />
        </div>

        {/* Contact Information */}
        <HeadingLine title={"Contact Information"} />

        <div className="w-full flex flex-wrap justify-start gap-4 items-start">
          <PhoneInput title={"Home Ph."} />
          <PhoneInput title={"Cell Ph."} />
          <EmailInput title={"Personal Email"} />
          <EmailInput title={"Work Email"} />
        </div>

        {/* Emergency Contact Information */}
        <HeadingLine title={"Emergency Contact Information"} />

        <div className="w-full flex flex-wrap justify-start gap-4 items-start">
          <TextInput title={"Contact Name"} />
          <TextInput title={"Relation"} />
          <TextInput title={"Cell Ph."} />
          <TextInput title={"Email"} type="email" />
        </div>

        <button className="px-4 py-3 rounded-lg bg-secondary text-white">
          Save & Next
        </button>
      </div>
    </>
  );
}

export default ProvidersInformation;
