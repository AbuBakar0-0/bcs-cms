"use client";

import Button from "@/components/ui/Button";
import HeadingLine from "@/components/ui/HeadingLine";
import DateInput from "@/components/ui/inputFields/DateInput";
import Dropdown from "@/components/ui/inputFields/DropDown";
import RadioButton from "@/components/ui/inputFields/RadioButtons";
import TextInput from "@/components/ui/inputFields/TextInput";
import ZipCodeInput from "@/components/ui/inputFields/ZipcodeInput";
import NavBottom from "@/components/ui/NavBottom";
import Spinner from "@/components/ui/spinner";
import SubmitButton from "@/components/ui/SubmitButton";
import { specialities } from "@/data/specialities";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import submitForm from "@/hooks/postData";
import { useEffect, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

function Specialities() {
  const [loading, setLoading] = useState(false);
  const [specialitiesData, setSpecialitiesData] = useState([]);
  const formRef = useRef();

  const [speciality, showSpeciality] = useState(false);
  const [pSpeciality, showPSpeciality] = useState(false);
  const [sSpeciality, showSSpeciality] = useState(false);

  const handlePrimarySpeciality = () => {
    showSpeciality(!speciality);
    showPSpeciality(true);
    showSSpeciality(false);
  };
  const handleSecondarySpeciality = () => {
    showSpeciality(!speciality);
    showSSpeciality(true);
    showPSpeciality(false);
  };

  // Fetch all specialities from the API
  const fetchSpecialities = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/specialities");
      const data = await response.json();
      console.log(data);
      setSpecialitiesData(data.data); // Set the specialities data
    } catch (error) {
      console.error("Error fetching specialities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecialities(); // Fetch all specialities on component mount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    const apiUrl = "/api/specialities";

    submitForm(data, formRef, fetchSpecialities, apiUrl);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <div className="w-full flex flex-row justify-between items-center">
          <div>
            <HeadingLine title={"Specialities"} />
            <p className="w-full">
              <span className="text-red-400">*</span>Required all fields are
              marked with red asterisk
            </p>
          </div>

          <div className="w-1/2 flex flex-row justify-end items-center gap-4">
            <Button
              title={"Add Primary Speciality"}
              icon={<IoAddCircleOutline className="size-6" />}
              onClick={handlePrimarySpeciality}
            />
            <Button
              title={"Add Secondary Speciality"}
              icon={<IoAddCircleOutline className="size-6" />}
              onClick={handleSecondarySpeciality}
            />
          </div>
        </div>

        {loading ? (
          <div className="w-full flex justify-center items-center">
            <Spinner /> {/* Display the spinner while loading */}
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center items-center gap-4">
            {speciality ? (
              <div className="w-full min-h-20 shadow-xl rounded-lg border-l-8 border-primary flex flex-col justify-start items-center gap-4 p-10">
                <form
                  onSubmit={handleSubmit}
                  ref={formRef}
                  className="w-full flex flex-wrap justify-start gap-4 items-start"
                >
                  <div className="w-full flex flex-wrap justify-start gap-4 items-end">
                    {pSpeciality ? (
                      <Dropdown
                        title={"Primary Speciality"}
                        options={specialities}
                        width=""
                        name={"speciality"}
                      />
                    ) : (
                      <></>
                    )}
                    {sSpeciality ? (
                      <Dropdown
                        title={"Secondary Speciality"}
                        options={specialities}
                        width=""
                        name={"speciality"}
                      />
                    ) : (
                      <></>
                    )}

                    {pSpeciality ? (
                      <input type="hidden" name="type" value={"primary"} />
                    ) : (
                      <input type="hidden" name="type" value={"secondary"} />
                    )}

                    <RadioButton
                      title={"Board Certified"}
                      options={["Yes", "No"]}
                      name={"is_board_certified"}
                    />
                    <Dropdown
                      title={"Name of Certifying Board"}
                      options={[]}
                      width="w-1/2"
                      name={"name_of_board"}
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
                      <TextInput
                        title={"City"}
                        width={"w-[10%]"}
                        name={"city"}
                      />
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
                    </div>
                  </div>
                  <div className="w-full flex flex-wrap justify-start gap-4 items-end">
                    <DateInput title={"Effective Date"} name={"start_date"} />
                    <DateInput title={"Expiry Date"} name={"end_date"} />
                  </div>
                  <div className="w-full flex justify-center items-center">
                    <SubmitButton />
                  </div>{" "}
                </form>
              </div>
            ) : (
              <></>
            )}
            {/* Display Specialities data */}
            <div className="w-full">
              {specialitiesData.map((speciality, index) => (
                <div
                  key={index}
                  className="w-full h-24 shadow-xl rounded-lg border-l-8 border-primary flex flex-row justify-between items-center gap-4 p-10"
                >
                  <div className="flex flex-col justify-center items-start">
                    <p>{speciality.name}</p>
                    <p>{speciality.type}</p> {/* Display the speciality type */}
                  </div>
                  <div className="flex flex-row justify-center items-center gap-4">
                    <CiEdit className="size-6 text-primary" />
                    <MdDeleteOutline className="size-6 text-red-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="w-full text-lg">Certifications</p>
        <div className="w-full h-[2px] bg-secondary flex flex-col justify-start items-start"></div>
        <RadioButton
          name={"have_certifications"}
          title={"Do you have Certifications"}
          options={["Yes", "No"]}
          width={"w-full"}
        />

        <p className="w-full text-lg">
          Qualified Autism Service Provicer (QASP)
        </p>

        <div className="w-full">
          <RadioButton
            name={"qasp"}
            title={"Qualified Autism Service Provicer (QASP)"}
            options={["Yes", "No"]}
            width={"w-full"}
          />
        </div>

        <p className="w-full text-lg">Cardio Pulmonary Resuscitation (CPR)</p>

        <div className="w-full">
          <RadioButton
            name={"cpr"}
            title={"Cardio Pulmonary Resuscitation (CPR)"}
            options={["Yes", "No"]}
            width={"w-full"}
          />
        </div>

        <p className="w-full text-lg">Basic Life Support (BLS)</p>

        <div className="w-full">
          <RadioButton
            name={"bls"}
            title={"Basic Life Support (BLS)"}
            options={["Yes", "No"]}
            width={"w-full"}
          />
        </div>

        <p className="w-full text-lg">Advanced Cardiac Life Support (ACLS)</p>

        <div className="w-full">
          <RadioButton
            name={"acls"}
            title={"Advanced Cardiac Life Support (ACLS)"}
            options={["Yes", "No"]}
            width={"w-full"}
          />
        </div>

        <p className="w-full text-lg">Advanced Life Support in OB (ALSO)</p>

        <div className="w-full">
          <RadioButton
            name={"also"}
            title={"Advanced Life Support in OB (ALSO)"}
            options={["Yes", "No"]}
            width={"w-full"}
          />
        </div>

        <p className="w-full text-lg">Health Care Provider (CoreC)</p>

        <div className="w-full">
          <RadioButton
            name={"corec"}
            title={"Health Care Provider (CoreC)"}
            options={["Yes", "No"]}
            width={"w-full"}
          />
        </div>

        <p className="w-full text-lg">Advanced Trauma Life Support (ATLS)</p>

        <div className="w-full">
          <RadioButton
            name={"atls"}
            title={"Advanced Trauma Life Support (ATLS)"}
            options={["Yes", "No"]}
            width={"w-full"}
          />
        </div>

        <p className="w-full text-lg">Neonatal Advanced Life Support (NALS)</p>

        <div className="w-full">
          <RadioButton
            name={"nals"}
            title={"Neonatal Advanced Life Support (NALS)"}
            options={["Yes", "No"]}
            width={"w-full"}
          />
        </div>

        <p className="w-full text-lg">Neonaltal Resuscitation Program (NRP)</p>

        <div className="w-full">
          <RadioButton
            name={"nrp"}
            title={"Neonaltal Resuscitation Program (NRP)"}
            options={["Yes", "No"]}
            width={"w-full"}
          />
        </div>

        <p className="w-full text-lg">Pediatric Advanced Life Support (PALS)</p>

        <div className="w-full">
          <RadioButton
            name={"pals"}
            title={"Pediatric Advanced Life Support (PALS)"}
            options={["Yes", "No"]}
            width={"w-full"}
          />
        </div>

        <p className="w-full text-lg">Other</p>

        <div className="w-full">
          <TextInput
            title={"Other"}
            name={"other"}
            required={false}
            width={"w-1/3"}
          />
        </div>

        <p className="w-full text-lg">Anesthesia Permit</p>

        <div className="w-full mb-5">
          <RadioButton
            name={"ap"}
            title={"Anesthesia Permit"}
            options={["Yes", "No"]}
            width={"w-full"}
          />
        </div>
      </div>
      <NavBottom />
    </>
  );
}

export default Specialities;
