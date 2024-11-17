"use client";

import HeadingLine from "@/components/ui/HeadingLine";
import DateInput from "@/components/ui/inputFields/DateInput";
import Dropdown from "@/components/ui/inputFields/DropDown";
import TextInput from "@/components/ui/inputFields/TextInput";
import ZipCodeInput from "@/components/ui/inputFields/ZipcodeInput";
import NavBottom from "@/components/ui/NavBottom";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

function HospitalAffiliations() {
  const [affiliation, showAffiliation] = useState(false);
  const [arrangements, showArrangements] = useState(false);

  const handleAffiliation = () => {
    showAffiliation(!affiliation);
  };

  const handleshowArrangements = () => {
    showArrangements(!arrangements);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        {/* Hospital Affiliations */}
        <HeadingLine title={"Hospital Affiliations"} />
        <p className="w-full">
          <span className="text-red-400">*</span>Required all fields are marked
          with red asterik
        </p>

        {/* Admitting Privilages */}
        <div className="w-full flex flex-row justify-between items-center">
          <p className="w-full text-lg">Admitting Privilages</p>
          <Button title={"Add"} icon={<IoAddCircleOutline className="size-6" />} onClick={handleAffiliation}/>
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-4">
          {affiliation ? (
            <div className="w-full min-h-20 shadow-xl rounded-lg border-l-8 border-primary flex flex-col justify-start items-center gap-4 p-10">
              <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                <TextInput title={"Hospital Name"} width={"w-full"} />

                <TextInput title={"Address 1"} width="w-[35%]" />
                <TextInput
                  title={"Address 2"}
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
              <Button title={"Add"}/>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="w-full h-24 shadow-xl rounded-lg border-l-8 border-primary flex flex-row justify-between items-center gap-4 p-10">
          <p>CHN Medical Support Systems</p>
          <div className="flex flex-col justify-center items-start">
            <p>Houston</p>
            <p>USA</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-4">
            <CiEdit className="size-6 text-primary" />
            <MdDeleteOutline className="size-6 text-red-400" />
          </div>
        </div>
        <div className="w-full h-[2px] bg-primary mt-10"></div>

        {/* Admitting Arrangements */}
        <div className="w-full flex flex-row justify-between items-center mt-10">
          <p className="w-full text-lg">Admitting Arrangements</p>
          <Button title={"Add"} icon={<IoAddCircleOutline className="size-6" />} onClick={handleshowArrangements}/>          
        </div>

        <div className="w-full h-[2px] bg-primary mt-10"></div>

        <div className="w-full flex flex-col justify-center items-center gap-4">
          {arrangements ? (
            <div className="w-full min-h-20 shadow-xl rounded-lg border-l-8 border-primary flex flex-col justify-start items-center gap-4 p-10">
              <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                <TextInput title={"Hospital Name"} width={"w-full"} />

                <TextInput title={"Address 1"} width="w-[35%]" />
                <TextInput
                  title={"Address 2"}
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
              <Button title={"Add"}/>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="w-full h-24 shadow-xl rounded-lg border-l-8 border-primary flex flex-row justify-between items-center gap-4 p-10">
          <p>CHN Medical Support Systems</p>
          <div className="flex flex-col justify-center items-start">
            <p>Houston</p>
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

export default HospitalAffiliations;
