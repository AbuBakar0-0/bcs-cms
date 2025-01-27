"use client";

import Button from "@/components/ui/Button";
import HeadingLine from "@/components/ui/HeadingLine";
import DateInput from "@/components/ui/inputFields/DateInput";
import Dropdown from "@/components/ui/inputFields/DropDown";
import RadioButton from "@/components/ui/inputFields/RadioButtons";
import TextInput from "@/components/ui/inputFields/TextInput";
import ZipCodeInput from "@/components/ui/inputFields/ZipcodeInput";
import NavBottom from "@/components/ui/NavBottom";
import SubmitButton from "@/components/ui/SubmitButton";
import { certifyingBoards } from "@/data/certifiyingBoard";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import taxonomyCodes from "@/data/taxonomyCodes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { BarLoader } from "react-spinners";

function Specialities() {
  const defaultState = {
    speciality: "",
    type: "",
    is_board_certified: "Yes",
    name_of_board: "",
    address_line_1: "",
    address_line_2: "",
    country: "USA",
    city: "",
    state: "",
    zip_code: "",
    effective_date: "",
    expiry_date: "",
    is_expire: "Yes",
  };

  const [loading, setLoading] = useState(false);
  const [specialitiesData, setSpecialitiesData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [specialityType, setSpecialityType] = useState("");
  const [formData, setFormData] = useState(defaultState);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const { id: provider_id } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (["Select State", "Select Board", "Select Speciality"].includes(value))
      return;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePrimarySpeciality = () => {
    setShowForm(true);
    setSpecialityType("primary");
    setFormData((prev) => ({
      ...prev,
      type: "primary",
    }));
  };

  const handleSecondarySpeciality = () => {
    setShowForm(true);
    setSpecialityType("secondary");
    setFormData((prev) => ({
      ...prev,
      type: "secondary",
    }));
  };

  const fetchSpecialities = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/specialities?provider_id=${provider_id}`
      );
      const data = await response.json();
      setSpecialitiesData(data.data);
    } catch (error) {
      console.error("Error fetching specialities:", error);
      toast.error("Failed to fetch specialities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecialities();
  }, []);

  const handleEdit = (speciality) => {
    setIsEditing(true);
    setEditingId(speciality.uuid);
    setShowForm(true);
    setSpecialityType(speciality.type);

    setFormData({
      speciality: speciality.name,
      type: speciality.type,
      is_board_certified: speciality.isBoardCertified,
      name_of_board: speciality.boardName,
      address_line_1: speciality.address?.addressLine1 || "",
      address_line_2: speciality.address?.addressLine2 || "",
      country: speciality.address?.country || "USA",
      city: speciality.address?.city || "",
      state: speciality.address?.state || "",
      zip_code: speciality.address?.zipCode || "",
      effective_date: speciality.effectiveDate,
      expiry_date: speciality.expiryDate,
      // effective_date: formatDate(speciality.effectiveDate),
      // expiry_date: formatDate(speciality.expiryDate),
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this speciality?")) {
      try {
        const response = await fetch(`/api/specialities/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          toast.success("Speciality deleted successfully");
          if (editingId === id) {
            setEditingId(null);
            setFormData(defaultState);
          }
          setSpecialitiesData((prev) =>
            prev.filter((speciality) => speciality.uuid !== id)
          );
        } else {
          throw new Error("Failed to delete speciality");
        }
      } catch (error) {
        console.error("Error deleting speciality:", error);
        toast.error("Failed to delete speciality");
      }
    }
  };

  const addSpeciality = async () => {
    toast.loading("Adding Speciality");
    const updatedformData = { ...formData, provider_id: provider_id };

    const response = await fetch("/api/specialities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedformData),
    });

    fetchSpecialities();
    toast.success("Added Successfully");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const res = await addSpeciality();
    try {
      const url = isEditing
        ? `/api/specialities/${editingId}`
        : "/api/specialities";

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, provider_id }),
      });

      if (response.ok) {
        toast.success(
          `Speciality ${isEditing ? "updated" : "added"} successfully`
        );
        setFormData(defaultState);
        setShowForm(false);
        setIsEditing(false);
        setEditingId(null);
        fetchSpecialities();
      } else {
        throw new Error(`Failed to ${isEditing ? "update" : "add"} speciality`);
      }
    } catch (error) {
      console.error(
        `Error ${isEditing ? "updating" : "submitting"} form:`,
        error
      );
      toast.error(`Failed to ${isEditing ? "update" : "add"} speciality`);
    }
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
          <div className="w-full flex justify-center items-center my-4">
            <BarLoader />
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center items-center gap-4">
            {showForm && (
              <div className="w-full min-h-20 shadow-xl rounded-lg border-l-8 border-primary flex flex-col justify-start items-center gap-4 p-10">
                <form
                  onSubmit={handleSubmit}
                  className="w-full flex flex-wrap justify-start gap-4 items-start"
                >
                  <div className="w-full flex flex-wrap justify-start gap-4 items-end">
                    <Dropdown
                      title={`${
                        specialityType === "primary" ? "Primary" : "Secondary"
                      } Speciality`}
                      options={taxonomyCodes}
                      required={false}
                      name="speciality"
                      value={formData.speciality}
                      onChange={handleInputChange}
                    />

                    <RadioButton
                      title={"Board Certified"}
                      options={["Yes", "No"]}
                      name="is_board_certified"
                      value={formData.is_board_certified}
                      onChange={handleInputChange}
                    />

                    <div
                      className={`${
                        formData.is_board_certified == "Yes" ? "flex" : "hidden"
                      } w-1/2`}
                    >
                      <Dropdown
                        title={"Name of Certifying Board"}
                        options={certifyingBoards}
                        width="w-full"
                        name="name_of_board"
                        required={formData.is_board_certified == "Yes"}
                        value={formData.name_of_board}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="w-full flex flex-wrap justify-start gap-4 items-start">
                      <TextInput
                        title={"Address Line 1"}
                        width="w-[25%]"
                        required={false}
                        name="address_line_1"
                        value={formData.address_line_1}
                        onChange={handleInputChange}
                      />
                      <TextInput
                        title={"Address Line 2"}
                        width="w-[25%]"
                        required={false}
                        name="address_line_2"
                        value={formData.address_line_2}
                        onChange={handleInputChange}
                      />
                      <Dropdown
                        title={"Country"}
                        options={["USA"]}
                        width="w-[13%]"
                        required={false}
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                      />
                      <TextInput
                        title={"City"}
                        width="w-[10%]"
                        required={false}
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                      <Dropdown
                        title={"State"}
                        options={stateAbbreviations}
                        width="w-[8%]"
                        required={false}
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                      />
                      <ZipCodeInput
                        title={"ZipCode"}
                        width="w-[8%]"
                        name="zip_code"
                        required={false}
                        value={formData.zip_code}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-wrap justify-start gap-4 items-end">
                    <DateInput
                      title={"Effective Date"}
                      name="effective_date"
                      value={formData.effective_date}
                      onChange={handleInputChange}
                    />
                    <div
                      className={`${
                        formData.is_expire == "Yes" ? "flex" : "hidden"
                      }`}
                    >
                      <DateInput
                        title={"Expiry Date"}
                        name="expiry_date"
                        value={formData.expiry_date}
                        required={formData.is_expire == "Yes"}
                        onChange={handleInputChange}
                      />
                    </div>
                    <RadioButton
                      title={"Does your board certificate have expiry?"}
                      options={["Yes", "No"]}
                      name="is_expire"
                      value={formData.is_expire}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="w-full flex justify-center items-center">
                    <SubmitButton
                      text={isEditing ? "Update Speciality" : "Add Speciality"}
                    />
                  </div>
                </form>
              </div>
            )}

            <div className="w-full flex flex-col gap-4 my-4">
              {specialitiesData?.map((speciality, index) => (
                <div
                  key={index}
                  className="w-full h-24 shadow-xl rounded-lg border-l-8 border-primary flex flex-row justify-between items-center gap-4 p-10"
                >
                  <div className="w-1/3 flex flex-col justify-center items-start">
                    <p>{speciality.name}</p>
                    <p>{speciality.type}</p>
                  </div>
                  <div className="w-1/3 flex flex-col justify-center items-start">
                    <p>
                      {speciality.isBoardCertified
                        ? speciality.boardName
                        : "Not Board Certified"}
                    </p>
                    <p>Effective Date : {speciality.effectiveDate}</p>
                    <p>
                      {speciality.expiryDate != null
                        ? "Expiry Date : " + speciality.expiryDate
                        : "Does Not Expire"}
                    </p>
                  </div>
                  <div className="flex flex-row justify-center items-center gap-4">
                    <CiEdit
                      className="size-6 text-primary"
                      onClick={() => handleEdit(speciality)}
                    />
                    <MdDeleteOutline
                      onClick={() => {
                        handleDelete(speciality.uuid);
                      }}
                      className="size-6 text-red-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <NavBottom />
    </>
  );
}

export default Specialities;
