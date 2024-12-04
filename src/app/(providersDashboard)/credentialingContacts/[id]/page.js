"use client";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import Button from "@/components/ui/Button";
import HeadingLine from "@/components/ui/HeadingLine";
import HeadingLine2 from "@/components/ui/HeadingLine2";
import Dropdown from "@/components/ui/inputFields/DropDown";
import EmailInput from "@/components/ui/inputFields/EmailInput";
import PhoneInput from "@/components/ui/inputFields/PhoneInput";
import TextInput from "@/components/ui/inputFields/TextInput";
import ZipCodeInput from "@/components/ui/inputFields/ZipcodeInput";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { validateCredsContactForm } from "./utilis";
import { useParams } from "next/navigation";
import { BarLoader } from "react-spinners";
import NavBottom from "@/components/ui/NavBottom";
const initialFormData = {
  credentialingTitle: "Select Title",
  firstName: "",
  middleInitial: "",
  lastName: "",
  mailingAddress1: "",
  mailingAddress2: "",
  mailingCity: "",
  mailingState: "Select State",
  mailingZipCode: "",
  homePhone: "",
  cellPhone: "",
  personalEmail: "",
  workEmail: "",
  emergencyContactName: "",
  emergencyContactRelation: "Select Relationship",
  emergencyContactPhone: "",
  emergencyContactEmail: "",
};

const relationshipOptions = [
  "Select Relationship",
  "Son",
  "Daughter",
  "Husband",
  "Spouse",
  "Father",
  "Mother",
];

const titleOptions = [
  "Select Title",
  "CFO",
  "Credentialing Director",
  "Credentialing Manager",
  "Office Manager",
  "Provider",
  "Manager Billing",
  "Biller",
  "Administrator",
  "Vendor",
];

export default function CredentialingContacts() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [contacts, setContacts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id: provider_id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["Select State", "Select Title", "Select Relationship"].includes(value))
      return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async () => {
    const errors = validateCredsContactForm(formData);
    if (errors) {
      toast.error(errors);
      return;
    }
    const loadingToast = toast.loading(
      editingId ? "Updating contact..." : "Adding contact..."
    );

    setLoading(true);
    try {
      const url = "/api/credential-contacts";
      const method = editingId ? "PUT" : "POST";
      const body = editingId
        ? { uuid: editingId, ...formData }
        : { provider_id, ...formData };

      const res = await fetch(url, {
        method,
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        toast.dismiss(loadingToast);
        Object.values(data.errors).forEach((error) => toast.error(error));
        return;
      }

      toast.dismiss(loadingToast);
      toast.success(editingId ? "Contact updated!" : "Contact added!");
      fetchContacts();
      resetForm();
    } catch (error) {
      toast.error("Something went wrong!");
      toast.dismiss(loadingToast);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (uuid) => {
    if (!window.confirm("Are you sure you want to delete this contact?"))
      return;

    setLoading(true);
    const loadingToast = toast.loading("Deleting contact...");
    try {
      const res = await fetch("/api/credential-contacts", {
        method: "DELETE",
        body: JSON.stringify({ uuid }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        toast.dismiss(loadingToast);
        toast.error("Failed to delete contact");
        return;
      }

      toast.dismiss(loadingToast);
      toast.success("Contact deleted!");
      fetchContacts();
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (contact) => {
    setFormData(contact);
    setEditingId(contact.uuid);
    setShowForm(true);
  };

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/credential-contacts");
      const { data, error } = await res.json();

      if (error) {
        toast.error("Failed to fetch contacts");
        return;
      }

      setContacts(data);
    } catch (error) {
      toast.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <HeadingLine title="Credentialing Contacts" />

      <div className="w-full flex flex-row justify-end items-center">
        <Button
          title={editingId ? "Update" : "Add"}
          onClick={() => setShowForm(!showForm)}
          disabled={loading}
        />
      </div>

      {showForm && (
        <div className="w-full flex flex-wrap justify-start items-center gap-4 mx-4 shadow-lg rounded-lg p-4">
          <Dropdown
            title={"Credentialing Title"}
            options={titleOptions}
            name={"credentialingTitle"}
            value={formData.credentialingTitle}
            onChange={handleChange}
          />
          <TextInput
            title={"First Name"}
            width={"w-1/3"}
            required={false}
            name={"firstName"}
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextInput
            title={"Middle Initial"}
            required={false}
            width={"w-[8%]"}
            maxLength={2}
            name={"middleInitial"}
            value={formData.middleInitial}
            onChange={handleChange}
          />
          <TextInput
            title={"Last Name"}
            width={"w-1/3"}
            required={false}
            name={"lastName"}
            value={formData.lastName}
            onChange={handleChange}
          />

          <HeadingLine2 title={"Mailing Address"} />

          <div className="w-full flex flex-wrap justify-start gap-4 items-start">
            <TextInput
              title={"Mailing Address 1"}
              width="w-[35%]"
              name={"mailingAddress1"}
              value={formData.mailingAddress1}
              onChange={handleChange}
            />
            <TextInput
              title={"Mailing Address 2"}
              width={"w-[25%]"}
              required={false}
              name={"mailingAddress2"}
              value={formData.mailingAddress2}
              onChange={handleChange}
            />
            <TextInput
              title={"City"}
              width={"w-[10%]"}
              name={"mailingCity"}
              value={formData.mailingCity}
              onChange={handleChange}
            />
            <Dropdown
              title={"State"}
              options={stateAbbreviations}
              width="w-[8%]"
              name={"mailingState"}
              value={formData.mailingState}
              onChange={handleChange}
            />

            <ZipCodeInput
              title={"ZipCode"}
              width={"w-[8%]"}
              name={"mailingZipCode"}
              value={formData.mailingZipCode}
              onChange={handleChange}
            />
          </div>

          <HeadingLine title={"Contact Information"} />

          <div className="w-full flex flex-wrap justify-start gap-4 items-start">
            <PhoneInput
              title={"Home Ph."}
              name={"homePhone"}
              value={formData.homePhone}
              onChange={handleChange}
            />
            <PhoneInput
              title={"Cell Ph."}
              name={"cellPhone"}
              value={formData.cellPhone}
              onChange={handleChange}
            />
            <EmailInput
              title={"Personal Email"}
              name={"personalEmail"}
              value={formData.personalEmail}
              onChange={handleChange}
            />
            <EmailInput
              title={"Work Email"}
              name={"workEmail"}
              value={formData.workEmail}
              onChange={handleChange}
            />
          </div>

          {/* Emergency Contact Information */}
          <HeadingLine title={"Emergency Contact Information"} />

          <div className="w-full flex flex-wrap justify-start gap-4 items-start">
            <TextInput
              title={"Contact Name"}
              name={"emergencyContactName"}
              value={formData.emergencyContactName}
              onChange={handleChange}
            />
            <Dropdown
              options={relationshipOptions}
              title={"Relation"}
              name={"emergencyContactRelation"}
              value={formData.emergencyContactRelation}
              onChange={handleChange}
            />
            <PhoneInput
              title={"Cell Ph."}
              name={"emergencyContactPhone"}
              value={formData.emergencyContactPhone}
              onChange={handleChange}
            />

            <EmailInput
              title={"Email"}
              type="email"
              name={"emergencyContactEmail"}
              value={formData.emergencyContactEmail}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-row justify-end items-center">
            <Button title={"Save"} onClick={handleSubmit} />
          </div>
        </div>
      )}
      {!loading && contacts.length === 0 && (
        <div className="w-full text-center p-4 text-gray-500">
          No contacts found. Add your first contact using the button above.
        </div>
      )}

      {loading ? (
        <BarLoader />
      ) : (
        contacts.map((contact) => (
          <div
            key={contact.uuid}
            className="w-full flex flex-row justify-between items-center gap-4 shadow-lg rounded-lg p-4"
          >
            <div className="w-1/5 flex flex-col justify-start items-start gap-2">
              <span>{`${contact.firstName} ${contact.lastName}`}</span>
            </div>
            <div className="w-1/5 flex flex-col justify-start items-start gap-2">
              <span>{contact.credentialingTitle}</span>
              <span>{contact.mailingAddress1}</span>
              <span>{contact.cellPhone}</span>
            </div>
            <div className="w-1/5 flex flex-col justify-start items-start gap-2">
              <span>{contact.workEmail}</span>
            </div>
            <div className="w-1/5 flex flex-col justify-start items-start gap-2">
              <div className="w-full flex flex-row justify-end items-center gap-4">
                <CiEdit
                  className="size-6 text-primary cursor-pointer"
                  onClick={() => handleEdit(contact)}
                />
                <MdDeleteOutline
                  className="size-6 text-red-400 cursor-pointer"
                  onClick={() => handleDelete(contact.uuid)}
                />
              </div>
            </div>
          </div>
        ))
      )}
      <NavBottom/>
    </div>
  );
}
