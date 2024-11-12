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
import HeadingLine2 from "@/components/ui/HeadingLine2";

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
          <TextInput title={"First Name"} width={"w-1/3"} required={false}/>
          <TextInput
            title={"Middle Initial"}
            required={false}
            width={"w-[8%]"}
          />
          <TextInput title={"Last Name"} width={"w-1/3"} required={false} />

          <Dropdown
            title={"Provider Title"}
            options={medicalTitles}
            width="w-[16.5%]"
          />

          {/* Conditionally rendered text field when "Other" is selected
          {providerTitle === "Other" && <TextInput title={"Please Specify"} />} */}

        </div>
        <div className="w-full flex flex-wrap justify-start items-start gap-4">
          <SSNInput width={"w-[15%]"} />
          <Dropdown
            title={"Gender"}
            options={["Male", "Female", "Other"]}
            width="w-1/12"
          />
          <DateInput title={"DOB"} width="w-[17%]"/>
          <TextInput title={"Birth City"} width={"w-1/5"} required={false}/>
          <Dropdown
            title={"Birth State"}
            options={stateAbbreviations}
            width="w-[8%]"
            required={false}
          />
          <TextInput title={"Birth Country"} width={"w-1/5"} required={false} />
        </div>
        <div className="w-full flex flex-wrap justify-start items-start gap-4">
          <TextInput title={"Driving License or ID"} width={"w-[34.5%]"} />
          <Dropdown
            title={"State Issued"}
            options={stateAbbreviations}
            width="w-[16.5%]"
          />
          <DateInput title={"Issued Date"} width="w-1/5"/>
          <DateInput title={"Expiry Date"} width="w-1/5"/>
        </div>

        {/* Home Address */}
        <HeadingLine title={"Home Address"} />

        <div className="w-full flex flex-wrap justify-start gap-4 items-start">
          <TextInput title={"Street Address 1"} width="w-[35%]" />
          <TextInput
            title={"Street Address 2"}
            width={"w-[25%]"}
            required={false}
          />
          <TextInput title={"City"} width={"w-[10%]"} />
          <Dropdown
            title={"State"}
            options={stateAbbreviations}
            width="w-[8%]"
          />
          <ZipCodeInput title={"ZipCode"} width={"w-[8%]"} />
        </div>

        {/* Home Address */}
        
        {/* Home Address */}
        <HeadingLine2 title={"Service Location Address"} />

        <div className="w-full flex flex-wrap justify-start gap-4 items-center text-xs">
          <input type="checkbox" onClick={handleReadonly} /> Same as Home
          Address
        </div>
        <div className="w-full flex flex-wrap justify-start gap-4 items-start">
          <TextInput title={"Service Location Address 1"} width="w-[35%]" />
          <TextInput
            title={"Service Location Address 2"}
            width={"w-[25%]"}
            required={false}
          />
          <TextInput title={"City"} width={"w-[10%]"} />
          <Dropdown
            title={"State"}
            options={stateAbbreviations}
            width="w-[8%]"
          />
          <ZipCodeInput title={"ZipCode"} width={"w-[8%]"} />
        </div>

        <HeadingLine2 title={"Mailing Address"} />

        <div className="w-full flex flex-wrap justify-start gap-4 items-center text-xs">
          <input type="checkbox" onClick={handleReadonly} /> Same as Service Location
          Address
        </div>

        <div className="w-full flex flex-wrap justify-start gap-4 items-start">
          <TextInput title={"Mailing Address 1"} width="w-[35%]" />
          <TextInput
            title={"Mailing Address 2"}
            width={"w-[25%]"}
            required={false}
          />
          <TextInput title={"City"} width={"w-[10%]"} />
          <Dropdown
            title={"State"}
            options={stateAbbreviations}
            width="w-[8%]"
          />

          <ZipCodeInput title={"ZipCode"} width={"w-[8%]"} />
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
