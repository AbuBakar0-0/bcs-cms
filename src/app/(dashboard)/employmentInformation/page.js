"use client";

import Button from "@/components/ui/Button";
import HeadingLine from "@/components/ui/HeadingLine";
import DateInput from "@/components/ui/inputFields/DateInput";
import Dropdown from "@/components/ui/inputFields/DropDown";
import RadioButton from "@/components/ui/inputFields/RadioButtons";
import TextInput from "@/components/ui/inputFields/TextInput";
import ZipCodeInput from "@/components/ui/inputFields/ZipcodeInput";
import NavBottom from "@/components/ui/NavBottom";
import { medicalTitles } from "@/data/medicalTitles";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

function EmploymentInformation() {
  const [employment, setEmployment] = useState(false);
  const handleEmployment = () => {
    setEmployment(!employment);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <div className="w-full flex flex-row justify-between items-center">
          <p className="w-full text-lg">Employment Information</p>
          <Button title={"Add"} icon={<IoAddCircleOutline className="size-6" />} onClick={handleEmployment}/>

         
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-4">
          {employment ? (
            <div className="w-full min-h-20 shadow-xl rounded-lg border-l-8 border-primary flex flex-col justify-start items-center gap-4 p-10">
              <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                <TextInput title={"Legal Employer Name "} width={"w-[35%]"} />
                <TextInput title={"Doing Business Name "} width={"w-[35%]"} />
                <Dropdown
                  title={"Department / Speciality"}
                  options={medicalTitles}
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
                  <TextInput title={"Practice Ph."} />
                  <TextInput title={"Fax No."} required={false} />
                  <DateInput title={"Start Date"} />
                  <DateInput title={"End Date"} />
                </div>
              </div>
              <div className="w-full flex flex-col justify-center items-start gap-4 ">
                <RadioButton
                  title={"Is this your Current Employer?"}
                  options={["Yes", "No"]}
                />
              </div>
              <Button title={"Add"}/>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="w-full h-24 shadow-xl rounded-lg border-l-8 border-primary flex flex-row justify-between items-center gap-4 p-10">
          <p>Doctor of Medicine (MD)</p>
          <div className="flex flex-col justify-center items-start">
            <p>University of Queenland</p>
            <p>June 2014 to June 2014</p>
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

export default EmploymentInformation;
