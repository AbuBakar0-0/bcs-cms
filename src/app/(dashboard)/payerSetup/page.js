"use client";

import HeadingLine from "@/components/ui/HeadingLine";
import DateInput from "@/components/ui/inputFields/DateInput";
import Dropdown from "@/components/ui/inputFields/DropDown";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import TextInput from "@/components/ui/inputFields/TextInput";
import payers from "@/data/payers";
import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import NavBottom from "@/components/ui/NavBottom";

export default function PairSetup() {
  const [application, showApplication] = useState(false);

  const handleApplication = () => {
    showApplication(!application);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <div className="w-full flex flex-row justify-between items-center">
          <p className="w-full text-lg">Payers Setup</p>
          <button
            onClick={handleApplication}
            className="w-40 bg-secondary px-4 py-3 rounded-lg text-white flex flex-row justify-center items-center gap-4"
          >
            <IoAddCircleOutline className="size-6" />
            <p>Add</p>
          </button>
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-4">
          {application ? (
            <div className="w-full min-h-20 shadow-xl rounded-lg border-l-8 border-primary flex flex-col justify-start items-center gap-4 p-10">
              <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                <div className="w-full flex flex-wrap justify-start gap-4 items-end">
                  <Dropdown title={"State"} options={stateAbbreviations} />
                  <Dropdown
                    title={"Plan Type"}
                    options={[
                      "All",
                      "EPO",
                      "HMO",
                      "PPO",
                      "HMO/P/OS combined",
                      "PPO/EPO combined",
                      "HSA",
                      "HDHP",
                      "MCO",
                      "Medigap",
                    ]}
                  />
                </div>
                <HeadingLine title={"Application Statuses"} />
                <div className="w-full flex flex-wrap justify-start gap-4 items-end">
                  <Dropdown
                    title={"Business"}
                    options={[
                      "CHN Medical Support",
                      "Home Health Care",
                      "Pharmacy",
                      "Urgent Care",
                    ]}
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
                  <Dropdown title={"Payer Name"} options={payers} />
                  <Dropdown
                    title={"Status"}
                    options={[
                      "Submitted",
                      "In-Progress",
                      "Approved",
                      "Rejected",
                      "Panel Closed",
                      "Missing Information",
                    ]}
                  />
                  <DateInput title={"Application Date"} />
                  <TextInput title={"Application Notes"} width={"w-full"} />
                </div>
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
          <p>Adnan Qamar</p>
          <div className="flex flex-col justify-center items-start">
            <p>United HealthCare</p>
            <p>Submitted</p>
            <p>mm/dd/yyyy</p>
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
