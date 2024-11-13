"use client";

import HeadingLine from "@/components/ui/HeadingLine";
import DateInput from "@/components/ui/inputFields/DateInput";
import Dropdown from "@/components/ui/inputFields/DropDown";
import RadioButton from "@/components/ui/inputFields/RadioButtons";
import TextInput from "@/components/ui/inputFields/TextInput";
import ZipCodeInput from "@/components/ui/inputFields/ZipcodeInput";
import NavBottom from "@/components/ui/NavBottom";
import { specialities } from "@/data/specialities";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

function Specialities() {
  const [speciality, showSpeciality] = useState(false);
  const [pSpeciality, showPSpeciality] = useState(false);
  const [sSpeciality, showSSpeciality] = useState(false);

  const handlePrimarySpeciality = () => {
    showSpeciality(!speciality);
    showPSpeciality(true);
    showSSpeciality(false);
  };
  const handleSecondarySpeciality = () => {
    showSSpeciality(true);
    showPSpeciality(false);
  };
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <div className="w-full flex flex-row justify-between items-center">
          <div>
            <HeadingLine title={"Specialities"} />
            <p className="w-full">
              <span className="text-red-400">*</span>Required all fields are
              marked with red asterik
            </p>
          </div>

          <div className="w-1/2 flex flex-row justify-end items-center gap-4">
            <button
              onClick={handlePrimarySpeciality}
              className="bg-secondary px-4 py-3 rounded-lg text-white flex flex-row justify-center items-center gap-4"
            >
              <IoAddCircleOutline className="size-6" />
              <p>Add Primary Speciality</p>
            </button>

            <button
              onClick={handleSecondarySpeciality}
              className="bg-secondary px-4 py-3 rounded-lg text-white flex flex-row justify-center items-center gap-4"
            >
              <IoAddCircleOutline className="size-6" />
              <p>Add Secondary Speciality</p>
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-4">
          {speciality ? (
            <div className="w-full min-h-20 shadow-xl rounded-lg border-l-8 border-primary flex flex-col justify-start items-center gap-4 p-10">
              <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                <div className="w-full flex flex-wrap justify-start gap-4 items-end">
                  {pSpeciality ? (
                    <Dropdown
                      title={"Primary Speciality"}
                      options={specialities}
                      width=""
                    />
                  ) : (
                    <></>
                  )}
                  {sSpeciality ? (
                    <Dropdown
                      title={"Secondary Speciality"}
                      options={specialities}
                      width=""
                    />
                  ) : (
                    <></>
                  )}

                  <RadioButton
                    title={"Board Certified"}
                    options={["Yes", "No"]}
                    width=""
                  />
                  <Dropdown
                    title={"Name of Certifying Board"}
                    options={[]}
                    width="w-1/2"
                  />

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
                </div>

                <div className="w-full flex flex-wrap justify-start gap-4 items-end">
                  <DateInput title={"Effective Date"} />
                  <DateInput title={"Expiry Date"} />
                </div>
              </div>
              <button className="px-4 py-3 bg-secondary text-white rounded-lg">
                Add
              </button>
            </div>
          ) : (
            <></>
          )}
          <div className="w-full h-24 shadow-xl rounded-lg border-l-8 border-primary flex flex-row justify-between items-center gap-4 p-10">
            <p>Allergy and Immunology</p>
            <div className="flex flex-col justify-center items-start">
              <p>Name of Board</p>
              <p>June 2014 to June 2014</p>
              <p>USA</p>
            </div>
            <div className="flex flex-row justify-center items-center gap-4">
              <CiEdit className="size-6 text-primary" />
              <MdDeleteOutline className="size-6 text-red-400" />
            </div>
          </div>
        </div>

        <p className="w-full text-lg">Certifications</p>
        <div className="w-full h-[2px] bg-secondary"></div>

        <div className="w-full">
          <label
            htmlFor="provider_title"
            className="block mb-2 text-sm font-medium text-black"
          >
            Do you have Certifications<span className="text-red-500">*</span>
          </label>
          <div className="w-full flex flex-row justify-start items-center gap-4">
            <input type="radio" name="training" /> Yes
            <input type="radio" name="training" /> No
          </div>
        </div>

        <p className="w-full text-lg">
          Qualified Autism Service Provicer (QASP)
        </p>

        <div className="w-full">
          <label
            htmlFor="provider_title"
            className="block mb-2 text-sm font-medium text-black"
          >
            Qualified Autism Service Provicer (QASP)
            <span className="text-red-500">*</span>
          </label>
          <div className="w-full flex flex-row justify-start items-center gap-4">
            <input type="radio" name="training" /> Yes
            <input type="radio" name="training" /> No
          </div>
        </div>

        <p className="w-full text-lg">Cardio Pulmonary Resuscitation (CPR)</p>

        <div className="w-full">
          <label
            htmlFor="provider_title"
            className="block mb-2 text-sm font-medium text-black"
          >
            Cardio Pulmonary Resuscitation (CPR)
            <span className="text-red-500">*</span>
          </label>
          <div className="w-full flex flex-row justify-start items-center gap-4">
            <input type="radio" name="training" /> Yes
            <input type="radio" name="training" /> No
          </div>
        </div>

        <p className="w-full text-lg">Basic Life Support (BLS)</p>

        <div className="w-full">
          <label
            htmlFor="provider_title"
            className="block mb-2 text-sm font-medium text-black"
          >
            Basic Life Support (BLS)<span className="text-red-500">*</span>
          </label>
          <div className="w-full flex flex-row justify-start items-center gap-4">
            <input type="radio" name="training" /> Yes
            <input type="radio" name="training" /> No
          </div>
        </div>

        <p className="w-full text-lg">Advanced Cardiac Life Support (ACLS)</p>

        <div className="w-full">
          <label
            htmlFor="provider_title"
            className="block mb-2 text-sm font-medium text-black"
          >
            Advanced Cardiac Life Support (ACLS)
            <span className="text-red-500">*</span>
          </label>
          <div className="w-full flex flex-row justify-start items-center gap-4">
            <input type="radio" name="training" /> Yes
            <input type="radio" name="training" /> No
          </div>
        </div>

        <p className="w-full text-lg">Advanced Life Support in OB (ALSO)</p>

        <div className="w-full">
          <label
            htmlFor="provider_title"
            className="block mb-2 text-sm font-medium text-black"
          >
            Advanced Life Support in OB (ALSO)
            <span className="text-red-500">*</span>
          </label>
          <div className="w-full flex flex-row justify-start items-center gap-4">
            <input type="radio" name="training" /> Yes
            <input type="radio" name="training" /> No
          </div>
        </div>

        <p className="w-full text-lg">Health Care Provider (CoreC)</p>

        <div className="w-full">
          <label
            htmlFor="provider_title"
            className="block mb-2 text-sm font-medium text-black"
          >
            Health Care Provider (CoreC)<span className="text-red-500">*</span>
          </label>
          <div className="w-full flex flex-row justify-start items-center gap-4">
            <input type="radio" name="training" /> Yes
            <input type="radio" name="training" /> No
          </div>
        </div>

        <p className="w-full text-lg">Advanced Trauma Life Support (ATLS)</p>

        <div className="w-full">
          <label
            htmlFor="provider_title"
            className="block mb-2 text-sm font-medium text-black"
          >
            Advanced Trauma Life Support (ATLS)
            <span className="text-red-500">*</span>
          </label>
          <div className="w-full flex flex-row justify-start items-center gap-4">
            <input type="radio" name="training" /> Yes
            <input type="radio" name="training" /> No
          </div>
        </div>

        <p className="w-full text-lg">Neonatal Advanced Life Support (NALS)</p>

        <div className="w-full">
          <label
            htmlFor="provider_title"
            className="block mb-2 text-sm font-medium text-black"
          >
            Neonatal Advanced Life Support (NALS)
            <span className="text-red-500">*</span>
          </label>
          <div className="w-full flex flex-row justify-start items-center gap-4">
            <input type="radio" name="training" /> Yes
            <input type="radio" name="training" /> No
          </div>
        </div>

        <p className="w-full text-lg">Neonaltal Resuscitation Program (NRP)</p>

        <div className="w-full">
          <label
            htmlFor="provider_title"
            className="block mb-2 text-sm font-medium text-black"
          >
            Neonaltal Resuscitation Program (NRP)
            <span className="text-red-500">*</span>
          </label>
          <div className="w-full flex flex-row justify-start items-center gap-4">
            <input type="radio" name="training" /> Yes
            <input type="radio" name="training" /> No
          </div>
        </div>

        <p className="w-full text-lg">Pediatric Advanced Life Support (PALS)</p>

        <div className="w-full">
          <label
            htmlFor="provider_title"
            className="block mb-2 text-sm font-medium text-black"
          >
            Pediatric Advanced Life Support (PALS)
            <span className="text-red-500">*</span>
          </label>
          <div className="w-full flex flex-row justify-start items-center gap-4">
            <input type="radio" name="training" /> Yes
            <input type="radio" name="training" /> No
          </div>
        </div>

        <p className="w-full text-lg">Other</p>

        <div className="w-full">
          <label
            htmlFor="provider_title"
            className="block mb-2 text-sm font-medium text-black"
          >
            Other<span className="text-red-500">*</span>
          </label>
          <div className="w-full flex flex-row justify-start items-center gap-4">
            <input type="radio" name="training" /> Yes
            <input type="radio" name="training" /> No
          </div>
        </div>

        <p className="w-full text-lg">Anesthesia Permit</p>

        <div className="w-full">
          <label
            htmlFor="provider_title"
            className="block mb-2 text-sm font-medium text-black"
          >
            Anesthesia Permit<span className="text-red-500">*</span>
          </label>
          <div className="w-full flex flex-row justify-start items-center gap-4">
            <input type="radio" name="training" /> Yes
            <input type="radio" name="training" /> No
          </div>
        </div>
      </div>
      <NavBottom />
    </>
  );
}

export default Specialities;
