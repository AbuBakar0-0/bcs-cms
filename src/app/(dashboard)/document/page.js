"use client";
import Button from "@/components/ui/Button";
import BaseInput from "@/components/ui/inputFields/BaseInput";
import DateInput from "@/components/ui/inputFields/DateInput";
import Dropdown from "@/components/ui/inputFields/DropDown";
import NavBottom from "@/components/ui/NavBottom";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

function Document() {
  const [reference, setReference] = useState(false);
  const handleReference = () => {
    setReference(!reference);
  };

  const documentsList = [
    "IRS Letter (It could be your SS-4, CP 575 or 147C)",
    "Professional State License or Business License",
    "State Release",
    "Professional Liability Insurance Certificate (Malpractice COI)",
    "General Liability Insurance (if applicable)",
    "Voided Check or Bank Letter (Must contain Exact Name as it is on IRS Letter)",
    "Board Certification (if applicable)",
    "DEA Certification (if applicable)",
    "DEA Waiver (if applicable)",
    "CLIA Certification (if applicable)",
    "Business Registration (Article of Incorporation if applicable)",
    "Lease Agreement",
    "Utility bill",
    "W9 Form",
    "Professional Degree",
    "Provider Resume in MM/YYYY format",
    "Hospital Affiliation",
    "Hospital Privileges Letter (if applicable)",
    "Pharmacy Certificate (if applicable)",
    "BLC Certificate",
    "Accreditation (if applicable)",
    "Background Screening (if applicable)",
  ];

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <div className="w-full flex flex-row justify-between items-center">
          <p className="w-full text-lg">Document</p>
          <Button
            title={"Add"}
            icon={<IoAddCircleOutline className="size-6" />}
            onClick={handleReference}
          />
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-4">
          {reference ? (
            <div className="w-full min-h-20 shadow-xl rounded-lg border-l-8 border-primary flex flex-col justify-start items-center gap-4 p-10">
              <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                <Dropdown
                  title={"Document Title"}
                  options={documentsList}
                  width="w-1/2/"
                />
                <Dropdown
                  title={"Provider"}
                  options={[
                    "Adnan Qamar",
                    "John Doe",
                    "John Wick",
                    "Zanjeel Malik",
                  ]}
                />
                <Dropdown
                  title={"Status"}
                  options={[
                    "Active",
                    "Missing",
                    "Expiring",
                    "Expired",
                    "On File",
                    "Requested Provider",
                  ]}
                />
                <DateInput
                  title={"Issue Date (if applicable)"}
                  required={false}
                />
                <DateInput
                  title={"Expiration Date (if applicable)"}
                  required={false}
                />
                <BaseInput title={"Upload Document"} type={"file"} />
              </div>

              <Button title={"Add"} />
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="w-full h-24 shadow-xl rounded-lg border-l-8 border-primary flex flex-row justify-between items-center gap-4 p-10">
          <p>IRS Letter</p>
          <div className="flex flex-col justify-center items-start">
            <p>Adnan Qamar</p>
            <p>mm/dd/yyyy</p>
            <p>USA</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-4">
            <FaEye className="size-6 text-secondary" />
            <CiEdit className="size-6 text-primary" />
            <MdDeleteOutline className="size-6 text-red-400" />
          </div>
        </div>
        <NavBottom />
      </div>
    </>
  );
}

export default Document;
