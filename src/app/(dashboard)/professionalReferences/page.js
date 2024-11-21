"use client";

import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/inputFields/DropDown";
import EmailInput from "@/components/ui/inputFields/EmailInput";
import PhoneInput from "@/components/ui/inputFields/PhoneInput";
import TextInput from "@/components/ui/inputFields/TextInput";
import ZipCodeInput from "@/components/ui/inputFields/ZipcodeInput";
import NavBottom from "@/components/ui/NavBottom";
import Spinner from "@/components/ui/spinner";
import SubmitButton from "@/components/ui/SubmitButton";
import { medicalTitles } from "@/data/medicalTitles";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import getData from "@/hooks/getData";
import submitForm from "@/hooks/postData";
import { useEffect, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

function ProfessionalReferences() {
  const [reference, setReference] = useState(false);
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const handleReference = () => {
    setReference(!reference);
  };

  // Fetch all references from the API
  const fetchData = async () => {
    setLoading(true);
    const response=await getData("/api/professional-references")
    setReferences(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(); // Fetch all references on component mount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    const apiUrl = "/api/professional-references";

    submitForm(data, formRef, fetchData, apiUrl);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <div className="w-full flex flex-row justify-between items-center">
          <p className="w-full text-lg">Professional References</p>
          <Button
            title={"Add"}
            icon={<IoAddCircleOutline className="size-6" />}
            onClick={handleReference}
          />
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-4">
          {reference ? (
            <form
              onSubmit={handleSubmit}
              ref={formRef}
              className="w-full min-h-20 shadow-xl rounded-lg border-l-8 border-primary flex flex-col justify-start items-center gap-4 p-10"
            >
              <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                <Dropdown
                  title={"Provider Type"}
                  options={medicalTitles}
                  name={"provider_type"}
                />
                <TextInput
                  title={"First Name"}
                  width={"w-1/3"}
                  required={false}
                  name="first_name"
                />
                <TextInput
                  title={"Middle Initial"}
                  required={false}
                  width={"w-[8%]"}
                  name="middle_initial"
                />
                <TextInput
                  title={"Last Name"}
                  width={"w-1/3"}
                  required={false}
                  name="last_name"
                />
                <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                  <TextInput
                    title={"Address Line 1"}
                    width="w-[25%]"
                    name="address_line_1"
                  />
                  <TextInput
                    title={"Address Line 2"}
                    width={"w-[25%]"}
                    required={false}
                    name="address_line_2"
                  />
                  <Dropdown
                    title={"Country"}
                    options={["USA"]}
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
                  <PhoneInput title={"Cell Ph."} name={"cell_phone"} />
                  <PhoneInput title={"Fax No."} name={"fax"} />
                  <EmailInput title={"Email Address"} name={"email"} />
                </div>
              </div>
              <SubmitButton />
            </form>
          ) : null}
        </div>

        {/* Show loader while fetching data */}
        {loading ? (
          <div className="w-full flex justify-center items-center my-10">
            <Spinner />
          </div>
        ) : (
          references.map((ref, index) => (
            <div
              key={ref.uuid || index}
              className="w-full h-24 shadow-xl rounded-lg border-l-8 border-primary flex flex-row justify-between items-center gap-4 p-10"
            >
              <p>{`${ref.first_name} ${ref.last_name}`}</p>
              <div className="flex flex-col justify-center items-start">
                <p>{ref.address || "Address not provided"}</p>
                <p>{ref.email}</p>
                <p>{ref.country || "Country not provided"}</p>
              </div>
              <div className="flex flex-row justify-center items-center gap-4">
                <CiEdit className="size-6 text-primary" />
                <MdDeleteOutline className="size-6 text-red-400" />
              </div>
            </div>
          ))
        )}

        <NavBottom />
      </div>
    </>
  );
}

export default ProfessionalReferences;
