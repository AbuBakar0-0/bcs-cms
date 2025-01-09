"use client";

import { useEffect, useState } from "react";
import ProvidersCard from "@/components/providersDashboard/ProvidersCard";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CiEdit, CiSearch } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import AdminDashboardLayout from "../../adminLayout";
import Dropdown from "@/components/ui/inputFields/DropDown";
import DateInput from "@/components/ui/inputFields/DateInput";
import BaseInput from "@/components/ui/inputFields/BaseInput";
import { useProviders } from "@/hooks/useProvider";

const documentsList = [
  "IRS Letter (It could be your SS-4, CP 575 or 147C)",
  "Professional State License or Business License",
  "State Release",
  "Professional Liability Insurance Certificate (Malpractice COI)",
  "General Liability Insurance",
  "Voided Check or Bank Letter (Must contain Exact Name as it is on IRS Letter)",
  "Board Certification",
  "DEA Certification",
  "DEA Waiver",
  "CLIA Certification",
  "Business Registration",
  "Lease Agreement",
  "Utility bill",
  "W9 Form",
  "Professional Degree",
  "Provider Resume in MM/YYYY format",
  "Hospital Affiliation",
  "Hospital Privileges Letter",
  "Pharmacy Certificate",
  "BLC Certificate",
  "Accreditation",
  "Background Screening",
];

const initialFormData = {
  documentTitle: documentsList[0],
  provider: "",
  status: "",
  issueDate: "",
  expiryDate: "",
  file: null,
};

const statusOptions = [
  "Active",
  "Missing",
  "Expiring",
  "Expired",
  "On File",
  "Requested Provider",
];

export default function ProvidersDocument() {
  const { id } = useParams();
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [isEditing, setIsEditing] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { providers, getProviderByName } = useProviders();


  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(`/api/documents?uuid=${localStorage.getItem("user_uuid")}`);
        if (!response.ok) {
          throw new Error("Failed to fetch documents");
        }
        const data = await response.json();
        setDocuments(data);
        setFilteredDocuments(data); // Initialize filtered documents with all documents
      } catch (error) {
        console.error("Error fetching documents:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDocuments();
    }
  }, [id]);

  // Filter documents based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = documents.filter((document) =>
        document.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDocuments(filtered);
    } else {
      setFilteredDocuments(documents);
    }
  }, [searchQuery, documents]);

  const handleView = (doc) => {
    if (!doc.url) {
      toast.error("No document file available");
      return;
    }

    if (doc.url.endsWith(".pdf")) {
      const urlParts = doc.url.split("/");
      const docId = urlParts[urlParts.length - 1].replace(".pdf", "");
      const folder = urlParts[urlParts.length - 2];
      const viewUrl = `https://res.cloudinary.com/db7z9hknv/image/upload/f_auto,q_auto/v1/${folder}/${docId}`;
      window.open(viewUrl, "_blank");
    } else {
      window.open(doc.url, "_blank");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  };

  const handleEdit = (doc) => {
    setFormData({
      title: doc.title || "",
      provider:
        doc.providers_info?.first_name + " " + doc.providers_info?.last_name ||
        "",
      status: doc.status || "",
      effective_date: doc.effective_date || "",
      expiry_date: formatDate(doc.expiry_date) || "",
      file: doc.url || "",
      existing_url: doc.url || "",
      existing_file_public_id: doc.file_public_id || "",
      uuid: doc.uuid || "",
    });
    setIsEditing(true);
    setShowDialog(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      ["Select Provider", "Select Document", "Select Status"].includes(value)
    ) {
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.loading("Please Wait");
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          if (key === "provider") {
            const provider = getProviderByName(value);
            formDataToSend.append("provider_id", provider.uuid);
          } else {
            formDataToSend.append(key, value);
          }
        }
      });
      const response = await fetch("/api/documents", {
        method: isEditing ? "PUT" : "POST",
        body: formDataToSend,
      });

      if (!response.ok) throw new Error("Failed to save document");
      toast.dismiss();
      await fetchDocuments();
      setShowDialog(false);
      toast.success(
        `Document ${isEditing ? "updated" : "created"} successfully`
      );
    } catch (error) {
      console.error("Error saving document:", error);
      toast.error("Failed to save document");
    } finally {
      setLoading(false);
    }
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reason, setReason] = useState("");
  const [selectedDoc, setSelectedDoc] = useState(null);

  const handleDeleteClick = (doc) => {
    setShowDeleteModal(true);
    setSelectedDoc(doc);
  };

  const handleConfirmDelete = () => {
    if (selectedDoc) {
      if (reason != "") {
        handleDelete({ ...selectedDoc, reason });

        setShowDeleteModal(false);
        setReason("");
        setSelectedDoc(null);
      } else {
        toast.error("Please Specify the reason");
      }
    }
  };

  const handleDelete = async (doc) => {
    setLoading(true);
    toast.loading("Deleting");
    try {
      const response = await fetch("/api/documents", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uuid: doc.uuid,
          file_public_id: doc.file_public_id,
          reason_to_delete: doc.reason,
        }),
      });

      if (!response.ok) throw new Error("Failed to delete document");

      await fetchDocuments();
      toast.dismiss();
      toast.success("Document deleted successfully");
    } catch (error) {
      toast.dismiss();
      console.error("Error deleting document:", error);
      toast.error("Failed to delete document");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminDashboardLayout>
      <ProvidersCard id={id} />
      <div className="w-full flex flex-row justify-between items-center gap-4 my-4">
        <div className="w-1/3 flex flex-row justify-start items-center gap-4">
          <input
            type="text"
            className="w-full bg-gray-100 rounded-full px-4 py-2 text-black"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
          />
          <div className="size-10 bg-primary text-white p-2 rounded-full flex justify-center items-center">
            <CiSearch className="size-8" />
          </div>
        </div>

        <div className="w-2/3 flex flex-row justify-end items-center gap-4">
          <Link href={`/document/${id}`}>
            <Button
              title={"Add"}
              icon={<IoAddCircleOutline className="size-6" />}
            />
          </Link>
        </div>
      </div>
      {showDialog ? (
        <>
          <div className="w-full bg-white rounded-lg shadow-lg p-6 my-4">
            <div className="w-full flex flex-wrap justify-between items-center">
              <Dropdown
                title="Document Type"
                name="title"
                options={documentsList}
                value={formData.title}
                onChange={handleChange}
                width="w-[48%]"
              />
              <Dropdown
                title="Provider"
                name="provider"
                options={providers}
                value={formData.provider}
                width="w-[48%]"
                onChange={handleChange}
                disabled={true}
              />

              <Dropdown
                title="Status"
                name="status"
                options={statusOptions}
                value={formData.status}
                width="w-[48%]"
                onChange={handleChange}
              />
              <div
                className={`${
                  formData.status == "Missing" ||
                  formData.status == "Requested Provider"
                    ? "hidden"
                    : "flex w-[48%]"
                }`}
              >
                <DateInput
                  title="Effective Date"
                  required={
                    formData.status == "Missing" ||
                    formData.status == "Requested Provider"
                      ? false
                      : true
                  }
                  name="effective_date"
                  value={formData.effective_date}
                  onChange={handleChange}
                  width="w-full"
                />
              </div>

              <div
                className={`${
                  formData.status == "Missing" ||
                  formData.status == "Requested Provider"
                    ? "hidden"
                    : "flex w-full justify-between "
                }`}
              >
                <DateInput
                  title="Expiry Date"
                  name="expiry_date"
                  value={formData.expiry_date}
                  width="w-[48%]"
                  onChange={handleChange}
                  required={
                    formData.status == "Missing" ||
                    formData.status == "Requested Provider"
                      ? false
                      : true
                  }
                />
                <BaseInput
                  required={
                    formData.status == "Missing" ||
                    formData.status == "Requested Provider"
                      ? false
                      : true
                  }
                  title="Upload File"
                  type="file"
                  name="file"
                  width="w-[48%]"
                  onChange={handleChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <Button
                type="button"
                title="Cancel"
                variant="outline"
                onClick={() => {
                  setShowDialog(false);
                }}
              />
              <Button
                type="submit"
                onClick={handleSubmit}
                title={isEditing ? "Update" : "Save"}
                disabled={loading}
              />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="min-h-screen flex flex-col md:flex-row">
        <main className="flex-1 py-4">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-200 text-left">
                  <tr>
                    <th className="p-3">Document Title</th>
                    <th className="p-3">Effective Date</th>
                    <th className="p-3">Expiration Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="text-center p-4"></td>
                    </tr>
                  ) : filteredDocuments.length > 0 ? (
                    filteredDocuments.map((document, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-3">{document.title}</td>
                        <td className="p-3">
                          {new Intl.DateTimeFormat("en-US").format(
                            new Date(document.effective_date)
                          )}
                        </td>
                        <td className="p-3">
                          {new Intl.DateTimeFormat("en-US").format(
                            new Date(document.expiry_date)
                          )}
                        </td>
                        <td
                          className={`p-3 ${
                            new Date(document.expiry_date) < Date.now()
                              ? "text-red-500"
                              : Math.ceil(
                                  (new Date(document.expiry_date) -
                                    Date.now()) /
                                    (1000 * 60 * 60 * 24)
                                ) < 30
                              ? "text-yellow-500"
                              : "text-green-500"
                          }`}
                        >
                          {new Date(document.expiry_date) < Date.now()
                            ? `Expired ${Math.abs(
                                Math.ceil(
                                  (new Date(document.expiry_date) -
                                    Date.now()) /
                                    (1000 * 60 * 60 * 24)
                                )
                              )} Days Ago`
                            : Math.ceil(
                                (new Date(document.expiry_date) - Date.now()) /
                                  (1000 * 60 * 60 * 24)
                              ) < 30
                            ? `${Math.ceil(
                                (new Date(document.expiry_date) - Date.now()) /
                                  (1000 * 60 * 60 * 24)
                              )} Days Left to Expire`
                            : "Active"}
                        </td>

                        <td className="p-3 flex flex-row justify-start items-center gap-2">
                          <button onClick={() => handleView(document)}>
                            <FaEye className="text-secondary cursor-pointer" />
                          </button>
                          /
                          <button onClick={() => handleEdit(document)}>
                            <CiEdit className="text-primary cursor-pointer" />
                          </button>
                          /
                          <MdDeleteOutline className="text-red-400 cursor-pointer" />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center p-4">
                        No documents found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </AdminDashboardLayout>
  );
}
