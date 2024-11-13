"use client";

import HeadingLine from "@/components/ui/HeadingLine";
import HeadingLine2 from "@/components/ui/HeadingLine2";
import DateInput from "@/components/ui/inputFields/DateInput";
import Dropdown from "@/components/ui/inputFields/DropDown";
import EmailInput from "@/components/ui/inputFields/EmailInput";
import TextInput from "@/components/ui/inputFields/TextInput";
import ZipCodeInput from "@/components/ui/inputFields/ZipcodeInput";
import NavBottom from "@/components/ui/NavBottom";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import taxonomyCodes from "@/data/taxonomyCodes";
import taxonomyCode from "@/data/taxonomyCodes";
import { useState } from "react";

function PracticeProfile() {
  const [readonly, setReadOnly] = useState(false);

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
              "Solo SPE / PCP",
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
          <TextInput title={"NPI 2"} width={"w-1/6"} />
          <TextInput title={"Tax ID"} width={"w-1/6"} />
        </div>
        <div className="w-full flex flex-wrap justify-start items-end gap-4">
          <TextInput title={"Legal Business Name "} width={"w-[49%]"} />
          <TextInput title={"Doing Business Name "} width={"w-[49%]"} />
          <Dropdown
            title={"Taxonomy Code"}
            options={taxonomyCodes}
            width="w-[49%]"
          />
          <Dropdown
            title={"Taxonomy Code 2 (if applicable)"}
            options={taxonomyCodes}
            required={false}
            width="w-[49%]"
          />

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
            <TextInput title={"Medicaid number"} />
            <DateInput title={"Practice Start Date"} />
          </div>
        </div>

        {/* Emergency Contact Information */}
        <HeadingLine title={"Practice Contact Information"} />

        <div className="w-full flex flex-wrap justify-start gap-4 items-start">
          <Dropdown
            width="w-[14%]"
            title={"Practice Contact Person"}
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
          <TextInput title={"Practice Contact Name"} />
          <EmailInput title={"Work Email"} />
          <TextInput title={"Work Ph."} />
          <TextInput title={"Cell Ph."} />
        </div>

        <NavBottom />
      </div>
    </>
  );
}

export default PracticeProfile;
