"use client";

import HeadingLine from "@/components/ui/HeadingLine";
import DateInput from "@/components/ui/inputFields/DateInput";
import Dropdown from "@/components/ui/inputFields/DropDown";
import RadioButton from "@/components/ui/inputFields/RadioButtons";
import TextInput from "@/components/ui/inputFields/TextInput";
import ZipCodeInput from "@/components/ui/inputFields/ZipcodeInput";
import { specialities } from "@/data/specialities";
import { stateAbbreviations } from "@/data/stateAbbreviations";

function Specialities() {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <HeadingLine title={"Specialities"} />
        <p className="w-full">
          <span className="text-red-400">*</span>Required all fields are marked
          with red asterik
        </p>

        <p className="w-full text-lg">Primary Speciality</p>

        <div className="w-full flex flex-wrap justify-start gap-4 items-start">
          <Dropdown
            title={"Primary Speciality"}
            options={specialities}
            width="w-full"
          />
          <RadioButton
            title={"Board Certified"}
            options={["Yes", "No"]}
            width="w-full"
          />
          <Dropdown
            title={"Name of Certifying Board"}
            options={[]}
            width="w-full"
          />

          <TextInput title={"Country"} />
          <TextInput title={"State"} />
          <TextInput title={"County"} />
          <TextInput title={"Street Address 1"} width={"w-[49.25%]"} />
          <TextInput
            title={"Street Address 2"}
            width={"w-[49.25%]"}
            required={false}
          />
          <TextInput title={"City"} />
          <Dropdown title={"State"} options={stateAbbreviations} />
          <ZipCodeInput title={"ZipCode"} />
        </div>


        <div className="w-full flex flex-wrap justify-start gap-4 items-start">
          <DateInput title={"Effective Date"} />
          <div className="w-full">
            <label
              htmlFor="provider_title"
              className="block mb-2 text-sm font-medium text-black"
            >
              Does your board certification have an expiry Date?
              <span className="text-red-500">*</span>
            </label>
            <div className="w-full flex flex-row justify-start items-center gap-4">
              <input type="radio" name="training" /> Yes
              <input type="radio" name="training" /> No
            </div>
          </div>
          <TextInput title={"Expiry Date"} type="date" />
        </div>

        <p className="w-full text-lg">Primary Speciality</p>

        <div className="w-full flex flex-wrap justify-start gap-4 items-start">
          <div className="w-1/2">
            <label
              htmlFor="state_issued"
              className="block mb-2 text-sm font-medium text-black"
            >
              Primary Speciality<span className="text-red-500">*</span>
            </label>
            <select
              name="state_issued"
              id="state_issued"
              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-semibold"
            ></select>
          </div>
          <div className="w-1/2">
            <label
              htmlFor="provider_title"
              className="block mb-2 text-sm font-medium text-black"
            >
              Board Certifieds<span className="text-red-500">*</span>
            </label>
            <div className="w-full flex flex-row justify-start items-center gap-4">
              <input type="radio" name="training" /> Yes
              <input type="radio" name="training" /> No
            </div>
          </div>
          <div className="w-1/2">
            <label
              htmlFor="state_issued"
              className="block mb-2 text-sm font-medium text-black"
            >
              Name of Certifying Board<span className="text-red-500">*</span>
            </label>
            <select
              name="state_issued"
              id="state_issued"
              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-semibold"
            ></select>
          </div>
        </div>

        <div className="w-full flex flex-wrap justify-start gap-4 items-start">
          <TextInput title={"Country"} />
          <TextInput title={"State"} />
          <TextInput title={"County"} />
        </div>
        <div className="w-full flex flex-wrap justify-start gap-4 items-start">
          <TextInput title={"Street Address 1"} />
          <TextInput title={"Street Address 2"} required={false} />
        </div>
        <div className="w-full flex flex-wrap justify-start gap-4 items-start">
          <TextInput title={"City"} />
          <div className="w-1/5">
            <label
              htmlFor="state"
              className="block mb-2 text-sm font-medium text-black"
            >
              State <span className="text-red-500">*</span>
            </label>
            <select
              name="state"
              id="state"
              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-semibold"
            ></select>
          </div>
          <TextInput title={"Zip"} />
        </div>

        <div className="w-full flex flex-wrap justify-start gap-4 items-start">
          <TextInput title={"Effective Date"} type="date" />
          <div className="w-full">
            <label
              htmlFor="provider_title"
              className="block mb-2 text-sm font-medium text-black"
            >
              Does your board certification have an expiry Date?
              <span className="text-red-500">*</span>
            </label>
            <div className="w-full flex flex-row justify-start items-center gap-4">
              <input type="radio" name="training" /> Yes
              <input type="radio" name="training" /> No
            </div>
          </div>
          <TextInput title={"Expiry Date"} type="date" />
        </div>

        <p className="w-full text-lg">Secondary Speciality</p>
        <div className="w-full h-[2px] bg-secondary"></div>

        <div className="w-full flex flex-wrap justify-start gap-4 items-start">
          <div className="w-1/2">
            <label
              htmlFor="state_issued"
              className="block mb-2 text-sm font-medium text-black"
            >
              Primary Speciality<span className="text-red-500">*</span>
            </label>
            <select
              name="state_issued"
              id="state_issued"
              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-semibold"
            ></select>
          </div>
          <div className="w-1/2">
            <label
              htmlFor="provider_title"
              className="block mb-2 text-sm font-medium text-black"
            >
              Board Certifieds<span className="text-red-500">*</span>
            </label>
            <div className="w-full flex flex-row justify-start items-center gap-4">
              <input type="radio" name="training" /> Yes
              <input type="radio" name="training" /> No
            </div>
          </div>
          <div className="w-1/2">
            <label
              htmlFor="state_issued"
              className="block mb-2 text-sm font-medium text-black"
            >
              Name of Certifying Board<span className="text-red-500">*</span>
            </label>
            <select
              name="state_issued"
              id="state_issued"
              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-semibold"
            ></select>
          </div>
        </div>

        <div className="w-full flex flex-wrap justify-start gap-4 items-start">
          <TextInput title={"Country"} />
          <TextInput title={"State"} />
          <TextInput title={"County"} />
        </div>
        <div className="w-full flex flex-wrap justify-start gap-4 items-start">
          <TextInput title={"Street Address 1"} />
          <TextInput title={"Street Address 2"} required={false} />
        </div>
        <div className="w-full flex flex-wrap justify-start gap-4 items-start">
          <TextInput title={"City"} />
          <div className="w-1/5">
            <label
              htmlFor="state"
              className="block mb-2 text-sm font-medium text-black"
            >
              State <span className="text-red-500">*</span>
            </label>
            <select
              name="state"
              id="state"
              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-semibold"
            ></select>
          </div>
          <TextInput title={"Zip"} />
        </div>

        <div className="w-full flex flex-wrap justify-start gap-4 items-start">
          <TextInput title={"Effective Date"} type="date" />
          <div className="w-full">
            <label
              htmlFor="provider_title"
              className="block mb-2 text-sm font-medium text-black"
            >
              Does your board certification have an expiry Date?
              <span className="text-red-500">*</span>
            </label>
            <div className="w-full flex flex-row justify-start items-center gap-4">
              <input type="radio" name="training" /> Yes
              <input type="radio" name="training" /> No
            </div>
          </div>
          <TextInput title={"Expiry Date"} type="date" />
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
    </>
  );
}

export default Specialities;
