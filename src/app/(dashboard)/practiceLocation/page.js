"use client";

import HeadingLine from "@/components/ui/HeadingLine";
import HeadingLine2 from "@/components/ui/HeadingLine2";
import Dropdown from "@/components/ui/inputFields/DropDown";
import EmailInput from "@/components/ui/inputFields/EmailInput";
import TextInput from "@/components/ui/inputFields/TextInput";
import ZipCodeInput from "@/components/ui/inputFields/ZipcodeInput";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import { useState } from "react";
import taxonomyCodes from "@/data/taxonomyCodes";
import { IoAddCircleOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

function PracticeLocations() {
  const [readonly, setReadOnly] = useState(false);
  ``;
  const [location, showLocation] = useState(false);

  const handleLocation = () => {
    showLocation(!location);
  };

  const handleReadonly = () => {
    setReadOnly(!readonly);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        {/* Personal Information */}
        <div className="w-full flex flex-row justify-between items-center">
          <p className="w-full text-lg">Practice Location</p>

          <button
            onClick={handleLocation}
            className="w-28 bg-secondary px-4 py-3 rounded-lg text-white flex flex-row justify-center items-center gap-4"
          >
            <IoAddCircleOutline className="size-6" />
            <p>Add</p>
          </button>
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-4">
          {location ? (
            <div className="w-full min-h-20 shadow-xl rounded-lg border-l-8 border-primary flex flex-col justify-start items-center gap-4 p-10">
              <div className="w-full flex flex-wrap justify-start items-end gap-4">
                <TextInput
                  title={"Legal Business Name "}
                  width={"w-[49%]"}
                  readonly={true}
                />
                <TextInput
                  title={"Doing Business Name "}
                  width={"w-[49%]"}
                  readonly={true}
                />
                <TextInput title={"NPI 2 (if applicable"} required={false} />
                <TextInput title={"Tax ID (if applicable)"} required={false} />
                <Dropdown
                  title={"Taxonomy Code (if applicable)"}
                  options={taxonomyCodes}
                  required={false}
                  width="w-1/4"
                />
                <Dropdown
                  title={"Taxonomy Code 2 (if applicable)"}
                  options={taxonomyCodes}
                  required={false}
                  width="w-1/4"
                />

                <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                  <TextInput
                    title={"Service Location Address 1"}
                    width="w-[35%]"
                  />
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
                  <TextInput title={"Location Ph."} />
                  <TextInput title={"Location Appointment Ph."} />
                  <TextInput title={"Location Fax"} />
                  <TextInput title={"Location Email"} width={"w-[27.5%]"} />
                </div>

                <HeadingLine2 title={"Mailing Address"} />

                <div className="w-full flex flex-wrap justify-start gap-4 items-center text-xs">
                  <input type="checkbox" onClick={handleReadonly} /> Same as
                  Service Location Address
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
                  <TextInput title={"Location Ph."} />
                  <TextInput title={"Location Fax"} />
                  <TextInput title={"Location Email"} width={"w-[27.5%]"} />
                </div>

                <HeadingLine2 title={"Correspondance Address"} />

                <div className="w-full flex flex-wrap justify-start gap-4 items-center text-xs">
                  <input type="checkbox" onClick={handleReadonly} /> Same as
                  Billing / Mailing Address
                </div>

                <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                  <TextInput
                    title={"Correspondance Address 1"}
                    width="w-[35%]"
                  />
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
                  <TextInput title={"Location Ph."} />
                  <TextInput title={"Location Fax"} />
                  <TextInput title={"Location Email"} width={"w-[27.5%]"} />
                </div>

                <div className="w-full flex flex-wrap justify-start items-center gap-5">
                  <TextInput title={"Location PTAN/Medicare number"} />
                  <TextInput title={"Medicaid number"} />
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
              <button className="px-4 py-3 bg-secondary text-white rounded-lg">
                Add
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="w-full h-24 shadow-xl rounded-lg border-l-8 border-primary flex flex-row justify-between items-center gap-4 p-10">
          <p>Location Aplha</p>
          <div className="flex flex-col justify-center items-start">
            <p>Houston</p>
            <p>USA</p>
            <p>(123) 123 1234</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-4">
            <CiEdit className="size-6 text-primary" />
            <MdDeleteOutline className="size-6 text-red-400" />
          </div>
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
