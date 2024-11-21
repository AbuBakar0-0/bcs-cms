"use client";

import Button from "@/components/ui/Button";
import DateInput from "@/components/ui/inputFields/DateInput";
import Dropdown from "@/components/ui/inputFields/DropDown";
import PhoneInput from "@/components/ui/inputFields/PhoneInput";
import RadioButton from "@/components/ui/inputFields/RadioButtons";
import TextInput from "@/components/ui/inputFields/TextInput";
import ZipCodeInput from "@/components/ui/inputFields/ZipcodeInput";
import NavBottom from "@/components/ui/NavBottom";
import { medicalTitles } from "@/data/medicalTitles";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import submitForm from "@/hooks/postData";
import { useEffect, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import Spinner from "@/components/ui/spinner"; // Import the spinner component

function EmploymentInformation() {
  const [loading, setLoading] = useState(false);
  const [employment, setEmployment] = useState(false);
  const [employmentData, setEmploymentData] = useState([]); // State to hold fetched data
  const handleEmployment = () => {
    setEmployment(!employment);
  };

  const formRef = useRef();

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch the employment data (replace this with actual API call)
      const response = await fetch("/api/employment-information");
      const data = await response.json();
      setEmploymentData(data.data); // Assuming 'data' is the key holding the employment info
    } catch (error) {
      console.error("Error fetching employment data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    const apiUrl = "/api/employment-information";

    submitForm(data, formRef, fetchData, apiUrl);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <div className="w-full flex flex-row justify-between items-center">
          <p className="w-full text-lg">Employment Information</p>
          <Button
            title={"Add"}
            icon={<IoAddCircleOutline className="size-6" />}
            onClick={handleEmployment}
          />
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-4">
          {employment && (
            <form
              onSubmit={handleSubmit}
              ref={formRef}
              className="w-full min-h-20 shadow-xl rounded-lg border-l-8 border-primary flex flex-col justify-start items-center gap-4 p-10"
            >
              <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                <TextInput
                  title={"Legal Employer Name "}
                  width={"w-[35%]"}
                  name={"legal_employer_name"}
                />
                <TextInput
                  title={"Doing Business Name "}
                  width={"w-[35%]"}
                  name={"doing_business_name"}
                />
                <Dropdown
                  title={"Department / Speciality"}
                  options={medicalTitles}
                  name={"department_speciality"}
                />

                <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                  <TextInput
                    title={"Address Line 1"}
                    width="w-[25%]"
                    name={"address_line_1"}
                  />
                  <TextInput
                    title={"Address Line 2"}
                    width={"w-[25%]"}
                    required={false}
                    name={"address_line_2"}
                  />
                  <Dropdown
                    title={"Country"}
                    options={["USA", "Canada", "Other"]}
                    width="w-[13%]"
                    name={"country"}
                  />
                  <TextInput title={"City"} width={"w-[10%]"} name={"city"} />
                  <Dropdown
                    title={"State"}
                    options={stateAbbreviations}
                    width="w-[8%]"
                    name={"state"}
                  />
                  <ZipCodeInput
                    title={"ZipCode"}
                    width={"w-[8%]"}
                    name={"zip_code"}
                  />
                  <PhoneInput title={"Practice Ph."} name={"practice_phone"} />
                  <PhoneInput title={"Fax No."} required={false} name={"fax"} />
                  <DateInput title={"Start Date"} name={"start_date"} />
                  <DateInput title={"End Date"} name={"end_date"} />
                </div>
              </div>
              <div className="w-full flex flex-col justify-center items-start gap-4">
                <RadioButton
                  title={"Is this your Current Employer?"}
                  options={["Yes", "No"]}
                  name={"is_current_employer"}
                />
              </div>
              <input
                type="submit"
                className="border-4 border-primary rounded-lg px-6 py-2 font-semibold"
              />
            </form>
          )}
        </div>

        {loading ? (
          // Display spinner when loading
          <div className="flex justify-center items-center py-6">
            <Spinner /> {/* Assuming Spinner component is correctly implemented */}
          </div>
        ) : (
          // Display the employment data after loading is complete
          <div className="w-full space-y-4">
            {employmentData.map((item) => (
              <div key={item.uuid} className="w-full h-24 shadow-xl rounded-lg border-l-8 border-primary flex flex-row justify-between items-center gap-4 p-10">
                <p>{item.legal_employer_name}</p>
                <div className="flex flex-col justify-center items-start">
                  <p>{item.doing_business_name}</p>
                  <p>{item.start_date} to {item.end_date}</p>
                  <p>{item.country}</p>
                </div>
                <div className="flex flex-row justify-center items-center gap-4">
                  <CiEdit className="size-6 text-primary" />
                  <MdDeleteOutline className="size-6 text-red-400" />
                </div>
              </div>
            ))}
          </div>
        )}

        <NavBottom />
      </div>
    </>
  );
}

export default EmploymentInformation;
