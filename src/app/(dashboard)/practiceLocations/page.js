"use client";

import HeadingLine from "@/components/ui/HeadingLine";
import HeadingLine2 from "@/components/ui/HeadingLine2";
import DateInput from "@/components/ui/inputFields/DateInput";
import Dropdown from "@/components/ui/inputFields/DropDown";
import EmailInput from "@/components/ui/inputFields/EmailInput";
import TextInput from "@/components/ui/inputFields/TextInput";
import ZipCodeInput from "@/components/ui/inputFields/ZipcodeInput";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import { useState } from "react";

function PracticeLocations() {
  const [readonly, setReadOnly] = useState(false);
  const [providerTitle, setProviderTitle] = useState("");

  const handleReadonly = () => {
    setReadOnly(!readonly);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        {/* Personal Information */}
        <HeadingLine title={"Practice Profile"} />

        <div className="w-full flex flex-wrap justify-start gap-4 items-start">
          <Dropdown
            title={"PRACTICE TYPE"}
            options={[
              "Medical",
              "Dental",
              "Behavioural Health",
              "Vision",
              "Multi Speciality",
            ]}
          />
          <Dropdown
            title={"Type of Service Provided"}
            options={[
              "Solo Primary Care",
              "Solo Speciality Care",
              "Group Primary Care",
              "Group Speciality Care",
              "Group of Multi-Speciality",
            ]}
          />

          <Dropdown
            title={"Credentialing Type"}
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
        </div>
        <div className="w-full flex flex-wrap justify-start items-end gap-4">
          <TextInput title={"Legal Business Name "} width={"w-[49%]"} />
          <TextInput title={"Doing Business Name "} width={"w-[49%]"} />
          <TextInput title={"NPI 2"} />
          <TextInput title={"Tax ID"} />

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
            <TextInput title={"Practice Ph."} />
            <TextInput title={"Practice Appointment Ph."} />
            <TextInput title={"Practice Fax"} />
            <TextInput title={"Practice Email"} width={"w-[27.5%]"} />
          </div>

          <HeadingLine2 title={"Mailing Address"} />

          <div className="w-full flex flex-wrap justify-start gap-4 items-center text-xs">
            <input type="checkbox" onClick={handleReadonly} /> Same as Service
            Location Address
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
            <TextInput title={"Practice Ph."} />
            <TextInput title={"Practice Fax"} />
            <TextInput title={"Practice Email"} width={"w-[27.5%]"} />
          </div>

          <HeadingLine2 title={"Correspondance Address"} />

          <div className="w-full flex flex-wrap justify-start gap-4 items-center text-xs">
            <input type="checkbox" onClick={handleReadonly} /> Same as Billing /
            Mailing Address
          </div>

          <div className="w-full flex flex-wrap justify-start gap-4 items-start">
            <TextInput title={"Correspondance Address 1"} width="w-[35%]" />
            <TextInput
              title={"Correspondance Address 2"}
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
            <TextInput title={"Practice Ph."} />
            <TextInput title={"Practice Fax"} />
            <TextInput title={"Practice Email"} width={"w-[27.5%]"} />
          </div>

          <div className="w-full flex flex-wrap justify-start items-center gap-5">
            <TextInput title={"PTAN/Medicare number"} />
            <TextInput title={"PTAN/Medicaid number"} />
            <DateInput title={"Practice Start Date"}/>
            
           
            
          </div>

          
          
        </div>

        {/* Emergency Contact Information */}
        <HeadingLine title={"Practice Contact Information"} />

        <div className="w-full flex flex-wrap justify-start gap-4 items-start">
            <Dropdown width="w-[14%]" title={"Practice Contact Person"} options={["CFO( Chief Financial Officer)", "CTO (Chief Technology Officer)", "CEO ( Chief Executive Officer)", "Owner", "Administrator", "Office Manager", "Contractor"]}/>
          <TextInput title={"Practice Contact Name"} />
          <EmailInput title={"Work Email"} />
          <TextInput title={"Work Ph."} />
          <TextInput title={"Cell Ph."} />
        </div>

        <div className="w-full flex flex-wrap justify-start gap-4 items-start"></div>
        <button className="px-4 py-3 rounded-lg bg-secondary text-white">
          Save & Next
        </button>
      </div>
    </>
  );
}

export default PracticeLocations;
