"use client";
import Button from "@/components/ui/Button";
import DateInput from "@/components/ui/inputFields/DateInput";
import Dropdown from "@/components/ui/inputFields/DropDown";
import EmailInput from "@/components/ui/inputFields/EmailInput";
import PhoneInput from "@/components/ui/inputFields/PhoneInput";
import TextInput from "@/components/ui/inputFields/TextInput";
import ZipCodeInput from "@/components/ui/inputFields/ZipcodeInput";
import NavBottom from "@/components/ui/NavBottom";
import { medicalTitles } from "@/data/medicalTitles";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

function ProfessionalReferences() {
  const [reference, setReference] = useState(false);
  const handleReference = () => {
    setReference(!reference);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <div className="w-full flex flex-row justify-between items-center">
          <p className="w-full text-lg">Professional References</p>
          <Button title={"Add"} icon={<IoAddCircleOutline className="size-6" />} onClick={handleReference}/>
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-4">
          {reference ? (
            <div className="w-full min-h-20 shadow-xl rounded-lg border-l-8 border-primary flex flex-col justify-start items-center gap-4 p-10">
              <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                <Dropdown title={"Provider Type"} options={medicalTitles} />

                <TextInput
                  title={"First Name"}
                  width={"w-1/3"}
                  required={false}
                />
                <TextInput
                  title={"Middle Initial"}
                  required={false}
                  width={"w-[8%]"}
                />
                <TextInput
                  title={"Last Name"}
                  width={"w-1/3"}
                  required={false}
                />
                <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                  <TextInput title={"Address Line 1"} width="w-[25%]" />
                  <TextInput
                    title={"Address Line 2"}
                    width={"w-[25%]"}
                    required={false}
                  />
                  <Dropdown title={"Country"} options={[]} width="w-[13%]" />
                  <TextInput title={"City"} width={"w-[10%]"} />
                  <Dropdown
                    title={"State"}
                    options={stateAbbreviations}
                    width="w-[8%]"
                  />

                  <ZipCodeInput title={"ZipCode"} width={"w-[8%]"} />
                  <PhoneInput title={"Cell Ph."} />
                  <PhoneInput title={"Fax No."} />
                  <EmailInput title={"Email Address"} />
                </div>
              </div>
              <Button title={"Add"}/>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="w-full h-24 shadow-xl rounded-lg border-l-8 border-primary flex flex-row justify-between items-center gap-4 p-10">
          <p>Adnan Qamar</p>
          <div className="flex flex-col justify-center items-start">
            <p>University of Queenland</p>
            <p>aqamar@billingcaresolutions.com</p>
            <p>USA</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-4">
            <CiEdit className="size-6 text-primary" />
            <MdDeleteOutline className="size-6 text-red-400" />
          </div>
        </div>
        <NavBottom />
      </div>
    </>
  );
}

export default ProfessionalReferences;
