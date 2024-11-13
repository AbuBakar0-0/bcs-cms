"use client";

import HeadingLine from "@/components/ui/HeadingLine";
import DateInput from "@/components/ui/inputFields/DateInput";
import Dropdown from "@/components/ui/inputFields/DropDown";
import PasswordInput from "@/components/ui/inputFields/PasswordInput";
import RadioButton from "@/components/ui/inputFields/RadioButtons";
import TextInput from "@/components/ui/inputFields/TextInput";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import { CiLink } from "react-icons/ci";

function ProfessionalIds() {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <HeadingLine title={"Professional Information"} />

        <div className="w-full flex flex-wrap justify-start gap-4 items-end">
          <Dropdown
            title={"Do you have an individual NPI #"}
            options={["Yes", "No"]}
            width="w-1/5"
          />
          <TextInput title={"NPI 1 (if applicable)"} width={"w-[1/12]"} required={false} />
          <TextInput
            title={"NPI 2 (if applicable)"}
            width={"w-[1/12]"}
            required={false}
          />
          <TextInput title={"Tax ID #"} />
          <TextInput title={"UPIN #"} />
        </div>
        <div className="w-full flex flex-wrap justify-start items-end gap-4">
          <TextInput title={"Ind. Medicare PTAN #"} width={"w-1/6"} />
          <Dropdown
            title={"Issue State"}
            options={stateAbbreviations}
            width="w-1/12"
          />
          <DateInput title={"Effective Date"} width={"w-1/5"} />
          <DateInput title={"Expiry Date"} width={"w-1/5"} />
          <button
            type="button"
            className="bg-blue-500 text-white rounded px-4 py-2 mb-[0.125rem]"
          >
            + ADD
          </button>
        </div>

        <div className="w-full flex flex-wrap justify-start items-end gap-4">
          <TextInput title={"Ind. Medicaid #"} width={"w-1/6"} />
          <Dropdown
            title={"Issue State"}
            options={stateAbbreviations}
            width="w-1/12"
          />
          <DateInput title={"Effective Date"} width={"w-1/5"} />
          <DateInput title={"Expiry Date"} width={"w-1/5"} />
          <button
            type="button"
            className="bg-blue-500 text-white rounded px-4 py-2 mb-[0.125rem]"
          >
            + ADD
          </button>
        </div>

        <div className="w-full flex flex-wrap justify-start items-end gap-4">
          <TextInput title={"State License #"} width={"w-1/6"} />
          <Dropdown
            title={"Issue State"}
            options={stateAbbreviations}
            width="w-1/12"
          />
          <DateInput title={"Effective Date"} width={"w-1/5"} />
          <DateInput title={"Expiry Date"} width={"w-1/5"} />
          <button
            type="button"
            className="bg-blue-500 text-white rounded px-4 py-2 mb-[0.125rem]"
          >
            + ADD
          </button>
        </div>

        <div className="w-full flex flex-wrap justify-start items-end gap-4">
          <TextInput title={"Ind. CLIA #"} width={"w-1/6"} />
          <Dropdown
            title={"Issue State"}
            options={stateAbbreviations}
            width="w-1/12"
          />
          <DateInput title={"Effective Date"} width={"w-1/5"} />
          <DateInput title={"Expiry Date"} width={"w-1/5"} />
          <button
            type="button"
            className="bg-blue-500 text-white rounded px-4 py-2 mb-[0.125rem]"
          >
            + ADD
          </button>
        </div>

        <div className="w-full flex flex-wrap justify-start items-end gap-4">
          <TextInput title={"Ind. DEA #"} width={"w-1/6"} />
          <Dropdown
            title={"Issue State"}
            options={stateAbbreviations}
            width="w-1/12"
          />
          <DateInput title={"Effective Date"} width={"w-1/5"} />
          <DateInput title={"Expiry Date"} width={"w-1/5"} />
          <button
            type="button"
            className="bg-blue-500 text-white rounded px-4 py-2 mb-[0.125rem]"
          >
            + ADD
          </button>
        </div>

        <div className="w-full flex flex-wrap justify-start items-end gap-4">
          <TextInput title={"Ind. CDS #"} width={"w-1/6"} />
          <Dropdown
            title={"Issue State"}
            options={stateAbbreviations}
            width="w-1/12"
          />
          <DateInput title={"Effective Date"} width={"w-1/5"} />
          <DateInput title={"Expiry Date"} width={"w-1/5"} />
          <button
            type="button"
            className="bg-blue-500 text-white rounded px-4 py-2 mb-[0.125rem]"
          >
            + ADD
          </button>
        </div>

        <HeadingLine title={"Medical Malpractice Information"} />

        <div className="text-lg w-full">Professional Liability Insurance</div>
        <div className="w-full flex flex-wrap justify-start gap-4 items-start">
          <TextInput title={"Policy # "} width={"w-[23.9%]"} />
          <DateInput title={"Effective Date"} width={"w-[23.9%]"} />
          <DateInput title={"Expiry Date"} width={"w-[23.9%]"} />
          <Dropdown
            title={"Aggregate"}
            width="w-[23.9%]"
            options={[
              "1,000,000 - 2,000,000",
              "1,000,000 - 3,000,000",
              "2,000,000 - 4,000,000",
            ]}
          />
        </div>

        <div className="text-lg w-full">General Liability Insurance</div>
        <div className="w-full flex flex-wrap justify-start gap-4 items-start">
          <TextInput title={"Policy # "} width={"w-[23.9%]"} />
          <DateInput title={"Effective Date"} width={"w-[23.9%]"} />
          <DateInput title={"Expiry Date"} width={"w-[23.9%]"} />
          <Dropdown
            title={"Aggregate"}
            width="w-[23.9%]"
            options={[
              "1,000,000 - 2,000,000",
              "1,000,000 - 3,000,000",
              "2,000,000 - 4,000,000",
            ]}
          />
        </div>

        <HeadingLine title={"Web Portal Info"} />
        <div className="w-full flex flex-wrap justify-start gap-4 items-end">
          <TextInput title={"CAQH User Id"} width={"w-[30.8%]"} />
          <TextInput title={"CAQH Username"} width={"w-[30.8%]"} />
          <PasswordInput title={"CAQH Password"} width={"w-[30.8%]"} />
          <a
            href="https://proview.caqh.org/Login/Index?ReturnUrl=%2fpo"
            title="https://proview.caqh.org/Login/Index?ReturnUrl=%2fpo"
            className="bg-secondary text-white size-10 flex justify-center items-center rounded-lg mb-[0.125rem]"
          >
            <CiLink className="size-8" />
          </a>

          <TextInput title={"Pecos Username"} width={"w-[46.9%]"} />
          <PasswordInput title={"Pecos Password"} width={"w-[46.9%]"} />
          <a
            href="https://pecos.cms.hhs.gov/pecos/login.do#headingLv1"
            title="https://pecos.cms.hhs.gov/pecos/login.do#headingLv1"
            className="bg-secondary text-white size-10 flex justify-center items-center rounded-lg relative group"
          >
            <CiLink className="size-8" />
          </a>

          <TextInput title={"UHC Username"} width={"w-[46.9%]"} />
          <PasswordInput title={"UHC Password"} width={"w-[46.9%]"} />
          <a
            href="https://www.uhcprovider.com/en/resource-library/provider-portal-resources.html"
            title="https://www.uhcprovider.com/en/resource-library/provider-portal-resources.html"
            className="bg-secondary text-white size-10 flex justify-center items-center rounded-lg relative group"
          >
            <CiLink className="size-8" />
          </a>

          <TextInput title={"Optum Username"} width={"w-[46.9%]"} />
          <PasswordInput title={"Optum Password"} width={"w-[46.9%]"} />
          <a
            href="https://www.uhcprovider.com/en/resource-library/provider-portal-resources.html"
            title="https://www.uhcprovider.com/en/resource-library/provider-portal-resources.html"
            className="bg-secondary text-white size-10 flex justify-center items-center rounded-lg relative group"
          >
            <CiLink className="size-8" />
          </a>

          <TextInput title={"Availilty Username"} width={"w-[46.9%]"} />
          <PasswordInput title={"Availilty Password"} width={"w-[46.9%]"} />
          <a
            href="https://apps.availity.com/web/onboarding/availity-fr-ui/#/login"
            title="https://apps.availity.com/web/onboarding/availity-fr-ui/#/login"
            className="bg-secondary text-white size-10 flex justify-center items-center rounded-lg relative group"
          >
            <CiLink className="size-8" />
          </a>

          <TextInput title={"Medicaid Username"} width={"w-[46.9%]"} />
          <PasswordInput title={"Medicaid Password"} width={"w-[46.9%]"} />
        </div>
        <button className="px-4 py-3 rounded-lg bg-secondary text-white">
          Save & Next
        </button>
      </div>
    </>
  );
}

export default ProfessionalIds;
