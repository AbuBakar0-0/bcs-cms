"use client";

import HeadingLine from "@/components/ui/HeadingLine";
import DateInput from "@/components/ui/inputFields/DateInput";
import Dropdown from "@/components/ui/inputFields/DropDown";
import EmailInput from "@/components/ui/inputFields/EmailInput";
import TextInput from "@/components/ui/inputFields/TextInput";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

function EducationAndTraining() {
  const [education, showEducation] = useState(false);
  const [training, showTraining] = useState(false);

  const handleEducation = () => {
    showEducation(!education);
  };
  const handleTraining = () => {
    showTraining(!training);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        {/* Education & Professional Training */}
        <HeadingLine title={"Education & Professional Training"} />
        <p className="w-full">
          <span className="text-red-400">*</span>Required all fields are marked
          with red asterik
        </p>

        {/* Education */}
        <div className="w-full flex flex-row justify-between items-center">
          <p className="w-full text-lg">Education</p>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <div className="w-full min-h-20 shadow-xl rounded-lg border-l-8 border-primary flex flex-col justify-start items-center gap-4 p-10">
            <div className="w-full flex flex-col justify-center items-end">
              <button
                onClick={handleEducation}
                className="w-52 bg-secondary px-4 py-3 rounded-lg text-white flex flex-row justify-center items-center gap-4"
              >
                <IoAddCircleOutline className="size-6" />
                <p>Add Education</p>
              </button>
            </div>

            {education ? (
              <>
                <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                  <Dropdown title={"Education Type"} options={[]} />
                  <TextInput title={"Country"} />
                  <TextInput title={"State"} />
                  <TextInput title={"County"} />
                  <TextInput title={"Professional School"} />
                  <Dropdown title={"Degree"} options={[]} />

                  <DateInput title={"Start Date"} />
                  <DateInput title={"End Date"} />
                </div>
                <button className="w-40 px-4 py-3 bg-secondary text-white rounded-lg">
                  Add
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="w-full h-40 shadow-xl rounded-lg border-l-8 border-primary flex flex-row justify-between items-center gap-4 p-10">
            <p>Doctor of Medicine (MD)</p>
            <div className="flex flex-col justify-center items-start">
              <p>University of Queenland</p>
              <p>June 2014 to June 2014</p>
              <p>USA</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-4">
              <button className="w-40 bg-secondary px-4 py-3 rounded-lg text-white flex flex-row justify-center items-center gap-4">
                <CiEdit className="size-6" />
                <p>Edit</p>
              </button>
              <button className="w-40 bg-gray-400 px-4 py-3 rounded-lg text-white flex flex-row justify-center items-center gap-4">
                <MdDeleteOutline className="size-6" />
                <p>Delete</p>
              </button>
            </div>
          </div>
        </div>

        {/* Professional Experience */}
        <div className="w-full flex flex-row justify-between items-center mt-20">
          <p className="w-full text-lg">Professional Training</p>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <div className="w-full min-h-20 shadow-xl rounded-lg border-l-8 border-primary flex flex-col justify-start items-center gap-4 p-10">
            <div className="w-full flex flex-col justify-center items-end">
              <button
                onClick={handleTraining}
                className="w-52 bg-secondary px-4 py-3 rounded-lg text-white flex flex-row justify-center items-center gap-4"
              >
                <IoAddCircleOutline className="size-6" />
                <p>Add Training</p>
              </button>
            </div>

            {training ? (
              <>
                <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                  <Dropdown title={"Training Type"} options={[]}/>
                  <TextInput title={"Country"} />
                  <TextInput title={"State"} />
                  <TextInput title={"County"} />
                  <TextInput title={"Institution / Hospital Name"} />
                  <TextInput title={"Affiliated University"} />
                  <EmailInput title={"Email"} />
                  <TextInput title={"Start Date"} type="date" />
                  <TextInput title={"End Date"} type="date" />
                  <TextInput title={"Type of Program"} />
                  <TextInput title={"Department"} />
                  
                  <div className="w-1/5">
                    <label
                      htmlFor="provider_title"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Speciality<span className="text-red-500">*</span>
                    </label>
                    <select
                      name="provider_title"
                      id="provider_title"
                      className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-semibold"
                    ></select>
                  </div>
                  <div className="w-1/5">
                    <label
                      htmlFor="provider_title"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Complete Training Program
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="w-full flex flex-row justify-start items-center gap-4">
                      <input type="radio" name="training" /> Yes
                      <input type="radio" name="training" /> No
                    </div>
                  </div>
                </div>
                <button className="w-40 px-4 py-3 bg-secondary text-white rounded-lg">
                  Add
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="w-full h-40 shadow-xl rounded-lg border-l-8 border-primary flex flex-row justify-between items-center gap-4 p-10">
            <p>Residency</p>
            <div className="flex flex-col justify-center items-start">
              <p>St. Luke Hospital</p>
              <p>Family Medicine</p>
              <p>June 2020 to June 2022</p>
              <p>USA</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-4">
              <button className="w-40 bg-secondary px-4 py-3 rounded-lg text-white flex flex-row justify-center items-center gap-4">
                <CiEdit className="size-6" />
                <p>Edit</p>
              </button>
              <button className="w-40 bg-gray-400 px-4 py-3 rounded-lg text-white flex flex-row justify-center items-center gap-4">
                <MdDeleteOutline className="size-6" />
                <p>Delete</p>
              </button>
            </div>
          </div>

          <div className="w-full h-40 shadow-xl rounded-lg border-l-8 border-primary flex flex-row justify-between items-center gap-4 p-10">
            <p>FellowShip</p>
            <div className="flex flex-col justify-center items-start">
              <p>St. Luke Hospital</p>
              <p>Family Medicine</p>
              <p>June 2020 to June 2022</p>
              <p>USA</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-4">
              <button className="w-40 bg-secondary px-4 py-3 rounded-lg text-white flex flex-row justify-center items-center gap-4">
                <CiEdit className="size-6" />
                <p>Edit</p>
              </button>
              <button className="w-40 bg-gray-400 px-4 py-3 rounded-lg text-white flex flex-row justify-center items-center gap-4">
                <MdDeleteOutline className="size-6" />
                <p>Delete</p>
              </button>
            </div>
          </div>
        </div>

        {/* Cultural Training */}
        <div className="w-full flex flex-col justify-center items-start gap-4 mt-20">
          <p>Have you completed Cultural Training?</p>
          <div className="w-full flex flex-row justify-start items-center gap-3">
            <input type="radio" name="cultural_training" /> Yes <br />
          </div>
          <div className="w-full flex flex-row justify-start items-center gap-3">
            <input type="radio" name="cultural_training" /> No <br />
          </div>
        </div>

        <div className="w-full flex flex-row justify-around items-center gap-4">
          <div className="w-1/4 flex flex-row justify-center items-center gap-4 px-4 py-3 bg-secondary rounded-lg text-white">
            <FaArrowCircleLeft />
            <span> Save & Go Back</span>
          </div>
          <div className="w-1/4 flex flex-row justify-center items-center gap-4 px-4 py-3 bg-secondary rounded-lg text-white">
            <span>Save</span>
          </div>

          <div className="w-1/4 flex flex-row justify-center items-center gap-4 px-4 py-3 bg-secondary rounded-lg text-white">
            <span>Save & Continue</span>
            <FaArrowCircleRight />
          </div>
        </div>
      </div>
    </>
  );
}

export default EducationAndTraining;
