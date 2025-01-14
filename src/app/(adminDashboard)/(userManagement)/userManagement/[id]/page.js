"use client";

import Button from "@/components/ui/Button";
import HeadingLine from "@/components/ui/HeadingLine";
import Dropdown from "@/components/ui/inputFields/DropDown";
import EmailInput from "@/components/ui/inputFields/EmailInput";
import PasswordInput from "@/components/ui/inputFields/PasswordInput";
import PhoneInput from "@/components/ui/inputFields/PhoneInput";
import TextInput from "@/components/ui/inputFields/TextInput";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminDashboardLayout from "../../../adminLayout";

const CheckBox = ({ label, id, value, onChange }) => {
  return (
    <div className="w-1/6 flex justify-start items-center gap-2">
      <input
        type="checkbox"
        name={id}
        id={id}
        checked={value}
        onChange={onChange}
      />
      <label>{label}</label>
    </div>
  );
};

function UserManagement() {
  const router = useRouter();
  const { id: user_id } = useParams(); // Extract `uuid` from URL params using `useParams`

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    is_verified: true,
    role: "",
    admin_dashboard: false,
    provider_dashboard: false,
    organization_management: false,
    document_center: false,
    credentialing_status: false,
    payers: false,
    user_management: false,
    hr_hiring: false,
    reporting: false,
    providers_information: false,
    professiona_ids: false,
    education_training: false,
    specialities: false,
    practice_profiles: false,
    practice_location: false,
    hospital_affiliations: false,
    payers_setup: false,
    credentialing_contacts: false,
    employment_information: false,
    professional_references: false,
    documents: false,
  });

  const [check, setCheck] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDropDownChange = (e) => {
    switch (e.target.value) {
      case "Administrator":
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
          admin_dashboard: true,
          provider_dashboard: true,
          organization_management: true,
          document_center: true,
          credentialing_status: true,
          payers: true,
          user_management: true,
          hr_hiring: true,
          reporting: true,
          providers_information: true,
          professiona_ids: true,
          education_training: true,
          specialities: true,
          practice_profiles: true,
          practice_location: true,
          hospital_affiliations: true,
          payers_setup: true,
          credentialing_contacts: true,
          employment_information: true,
          professional_references: true,
          documents: true,
        });
        break;
      case "Credentialing Specialist":
        break;
      case "Provider":
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
          admin_dashboard: false,
          provider_dashboard: true,
          organization_management: false,
          document_center: true,
          credentialing_status: true,
          payers: true,
          user_management: false,
          hr_hiring: false,
          reporting: true,
          providers_information: true,
          professiona_ids: true,
          education_training: true,
          specialities: true,
          practice_profiles: true,
          practice_location: true,
          hospital_affiliations: true,
          payers_setup: true,
          credentialing_contacts: true,
          employment_information: true,
          professional_references: true,
          documents: true,
        });
        break;
      case "Office Manager":
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
          admin_dashboard: false,
          provider_dashboard: false,
          organization_management: false,
          document_center: false,
          credentialing_status: false,
          payers: false,
          user_management: false,
          hr_hiring: false,
          reporting: false,
          providers_information: false,
          professiona_ids: false,
          education_training: false,
          specialities: false,
          practice_profiles: false,
          practice_location: false,
          hospital_affiliations: false,
          payers_setup: false,
          credentialing_contacts: false,
          employment_information: false,
          professional_references: false,
          documents: false,
        });
        break;
      case "Billing Manager":
        break;
      case "QA Specialist":
        break;
      case "Support Staff":
        break;
      case "Auditor":
        break;
      case "Client (Healthcare Organization Representative)":
        break;
      case "IT Support/Developer":
        break;
    }
  };

  const handleCheck = () => {
    setCheck(!check);
  };

  const handleCheckChange = (e) => {
    const { name, type, checked, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.phone ||
      !formData.role
    ) {
      toast.error("All fields are required.");
      return false;
    }

    if (!check) {
      toast.error("You must accept the terms to submit the form.");
      return false;
    }

    // Optionally, add more validation rules like email format, phone format, etc.

    return true;
  };

  const fetchUserData = async () => {
    try {
      toast.loading("Please Wait");
      if (user_id == "new_user") {
        return;
      }
      const response = await axios.get(`/api/get-user?uuid=${user_id}`);
      setFormData({
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        email: response.data.email,
        password: "", // Don't set password here
        phone: response.data.phone,
        role: response.data.role,
        is_verified: response.data.is_verified,
        admin_dashboard: response.data.admin_dashboard,
        provider_dashboard: response.data.provider_dashboard,
        organization_management: response.data.organization_management,
        document_center: response.data.document_center,
        credentialing_status: response.data.credentialing_status,
        payers: response.data.payers,
        user_management: response.data.user_management,
        hr_hiring: response.data.hr_hiring,
        reporting: response.data.reporting,
        providers_information: response.data.providers_information,
        professiona_ids: response.data.professiona_ids,
        education_training: response.data.education_training,
        specialities: response.data.specialities,
        practice_profiles: response.data.practice_profiles,
        practice_location: response.data.practice_location,
        hospital_affiliations: response.data.hospital_affiliations,
        payers_setup: response.data.payers_setup,
        credentialing_contacts: response.data.credentialing_contacts,
        employment_information: response.data.employment_information,
        professional_references: response.data.professional_references,
        documents: response.data.documents,
      });
      toast.dismiss();
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Error fetching user data");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Validate form data before submission

  const sendEmail = async ({ first_name, last_name, email, password }) => {
    toast.loading("Sending User Details on Email");
    try {
      const emailPayload = {
        first_name,
        last_name,
        email,
        password,
      };
      await axios.post("/api/sendEmail", emailPayload);
      toast.dismiss();
      toast.success("Sent Successfully");
    } catch (e) {
      toast.dismiss();
      toast.error(e.message);
    }
  };
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      toast.loading("Please Wait...");
      const requestData = {
        ...formData,
        added_by: localStorage.getItem("user_uuid"),
      };

      // Send the POST request
      toast.dismiss();
      const response = await axios.post("/api/user-management", requestData);
      toast.success("User added successfully");
      await sendEmail({
        first_name: requestData.firstName,
        last_name: requestData.lastName,
        email: requestData.email,
        password: requestData.password,
      });
      router.push("/usersDashboard");
    } catch (e) {
      toast.error("Error Adding User");
      console.log(e);
    }
  };

  const handleUpdateUser = async ({ user_id }) => {
    if (!validateForm()) return;

    try {
      const requestData = {
        ...formData,
      };

      const response = await fetch(`/api/user-management?uuid=${user_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      toast.success("User updated successfully");
      await sendEmail({
        first_name: requestData.firstName,
        last_name: requestData.lastName,
        email: requestData.email,
        password: requestData.password,
      });
      router.push("/usersDashboard");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user");
    }
  };

  const roles = [
    "Administrator",
    "Credentialing Specialist",
    "Provider",
    "Office Manager",
    "Billing Manager",
    "QA Specialist",
    "Support Staff",
    "Auditor",
    "Client (Healthcare Organization Representative)",
    "IT Support/Developer",
  ];

  return (
    <AdminDashboardLayout barTitle="User Management">
      <HeadingLine title={"Add User"} />
      <div className="w-full flex flex-wrap justify-start items-end gap-4 py-5">
        <TextInput
          title={"First Name"}
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextInput
          title={"Last Name"}
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <EmailInput
          title={"Email"}
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <PasswordInput
          title={"Password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <PhoneInput
          title={"Phone No."}
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <Dropdown
          title={"Role"}
          options={roles}
          name="role"
          value={formData.role}
          onChange={handleDropDownChange}
        />
        <HeadingLine title={"Manage Access - Admin Dashboard"} />
        <CheckBox
          id={"admin_dashboard"}
          label={"Admin Dashboard"}
          value={formData.admin_dashboard}
          onChange={handleCheckChange}
        />
        <CheckBox
          id={"provider_dashboard"}
          label={"Provider Dashboard"}
          value={formData.provider_dashboard}
          onChange={handleCheckChange}
        />
        <CheckBox
          id={"organization_management"}
          label={"Organization Management"}
          value={formData.organization_management}
          onChange={handleCheckChange}
        />
        <CheckBox
          id={"document_center"}
          label={"Document Center"}
          value={formData.document_center}
          onChange={handleCheckChange}
        />
        <CheckBox
          id={"credentialing_status"}
          label={"Credentialing Status"}
          value={formData.credentialing_status}
          onChange={handleCheckChange}
        />
        <CheckBox
          id={"payers"}
          label={"Payers"}
          value={formData.payers}
          onChange={handleCheckChange}
        />
        <CheckBox
          id={"user_management"}
          label={"User Management"}
          value={formData.user_management}
          onChange={handleCheckChange}
        />
        <CheckBox
          id={"hr_hiring"}
          label={"HR Hiring"}
          value={formData.hr_hiring}
          onChange={handleCheckChange}
        />
        <CheckBox
          id={"reporting"}
          label={"Reporting"}
          value={formData.reporting}
          onChange={handleCheckChange}
        />
        <HeadingLine title={"Manage Access - Providers Dashboard"} />
        <CheckBox
          id={"providers_information"}
          label={"Providers Information"}
          value={formData.providers_information}
          onChange={handleCheckChange}
        />
        <CheckBox
          id={"professiona_ids"}
          label={"Professional IDs"}
          value={formData.professiona_ids}
          onChange={handleCheckChange}
        />
        <CheckBox
          id={"education_training"}
          label={"Education & Training"}
          value={formData.education_training}
          onChange={handleCheckChange}
        />
        <CheckBox
          id={"specialities"}
          label={"Specialities"}
          value={formData.specialities}
          onChange={handleCheckChange}
        />
        <CheckBox
          id={"practice_profiles"}
          label={"Practice Profiles"}
          value={formData.practice_profiles}
          onChange={handleCheckChange}
        />
        <CheckBox
          id={"practice_location"}
          label={"Practice Location"}
          value={formData.practice_location}
          onChange={handleCheckChange}
        />
        <CheckBox
          id={"hospital_affiliations"}
          label={"Hospital Affiliations"}
          value={formData.hospital_affiliations}
          onChange={handleCheckChange}
        />
        <CheckBox
          id={"payers_setup"}
          label={"Payers Setup"}
          value={formData.payers_setup}
          onChange={handleCheckChange}
        />
        <CheckBox
          id={"credentialing_contacts"}
          label={"Credentialing Contacts"}
          value={formData.credentialing_contacts}
          onChange={handleCheckChange}
        />
        <CheckBox
          id={"employment_information"}
          label={"Employment Information"}
          value={formData.employment_information}
          onChange={handleCheckChange}
        />
        <CheckBox
          id={"professional_references"}
          label={"Professional References"}
          value={formData.professional_references}
          onChange={handleCheckChange}
        />
        <CheckBox
          id={"documents"}
          label={"Documents"}
          value={formData.documents}
          onChange={handleCheckChange}
        />
      </div>
      <div>
        <div className="w-full flex flex-col gap-4">
          <HeadingLine title={"Review and Accept"} />
          <p className="">
            As the designated Online Facility Administrator, I understand that
            it is my responsibility to ensure that I only grant access to those
            individuals who are properly contracted with and/or representatives
            of Test Facility.
          </p>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4"
              value={check}
              onChange={handleCheck}
            />
            <span>I accept the terms of this agreement.</span>
          </label>

          <div className="mt-6">
            <Button
              title={"Submit"}
              disabled={!check}
              onClick={() =>
                user_id === "new_user"
                  ? handleSubmit()
                  : handleUpdateUser({ user_id })
              }
            />
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}

export default UserManagement;
