"use client";

import Button from "@/components/ui/Button";
import axios from "axios"; // Import axios for HTTP requests
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { CiEdit, CiSearch } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { BarLoader } from "react-spinners";
import AdminDashboardLayout from "../../adminLayout";
import { useRouter, useSearchParams } from "next/navigation"; // Import the correct hooks
import Dropdown from "@/components/ui/inputFields/DropDown";
import DateInput from "@/components/ui/inputFields/DateInput";
import BaseInput from "@/components/ui/inputFields/BaseInput";
import { useProviders } from "@/hooks/useProvider";
import toast from "react-hot-toast";
import TextInput from "@/components/ui/inputFields/TextInput";

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

const DocumentCenterContent = () => {
  const [activeTab, setActiveTab] = useState("provider");
  const [documents, setDocuments] = useState([]); // Store documents in state
  const [filteredDocuments, setFilteredDocuments] = useState([]); // Store filtered documents for search
  const [loading, setLoading] = useState(true); // Handle loading state
  const [error, setError] = useState(""); // Store any errors
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [uuid, setUuid] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [isEditing, setIsEditing] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const { providers, getProviderByName } = useProviders();
  const [isProvider, setIsProvider] = useState(true);
  const toggleTab = (tab) => {
    setShowDialog(false);
    setActiveTab(tab);
  };

  const searchParams = useSearchParams(); // Use the correct hook for search params

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

  const fetchDocuments = async () => {
    setUuid(localStorage.getItem("user_uuid"));
    const userUuid = localStorage.getItem("user_uuid");
    if (!userUuid) {
      setError("User UUID not found");
      setLoading(false);
      return;
    }

    try {
      // Fetch documents from API
      const response = await axios.get(`/api/documents?uuid=${userUuid}`);

      console.log(response.data);
      setDocuments(response.data);
      setFilteredDocuments(response.data); // Initially set filtered docs to all docs

      const documentType = searchParams.get("type");

      if (documentType) {
        // If 'type' query parameter exists, filter the documents based on 'status'
        const filtered = response.data.filter(
          (doc) => doc.status === documentType
        );
        setFilteredDocuments(filtered); // Update filtered documents
      }

      setLoading(false);
    } catch (err) {
      setError("Failed to fetch documents");
      setLoading(false);
      console.error("Error fetching documents:", err);
    }
  };

  function getStatusColor(status) {
    switch (status) {
      case "Active":
        return "text-green-500";
      case "Missing":
        return "text-yellow-500";
      case "Expiring":
        return "text-orange-500";
      case "Expired":
        return "text-red-500";
      case "On File":
        return "text-blue-500";
      case "Requested Provider":
        return "text-purple-500";
      default:
        return "text-gray-500";
    }
  }

  useEffect(() => {
    fetchDocuments(); // Fetch documents when component mounts
  }, []); // Empty dependency array ensures it only runs once

  // Filter documents based on search term
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter documents based on the search term
    const filtered = documents.filter((doc) => {
      return (
        doc.providers_info.first_name.toLowerCase().includes(term) ||
        doc.providers_info.last_name.toLowerCase().includes(term) ||
        doc.title.toLowerCase().includes(term) ||
        doc.status.toLowerCase().includes(term)
      );
    });
    setFilteredDocuments(filtered);
  };

  // Function to format date to US format (MM/DD/YYYY)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  };

  const handleEdit = (doc) => {
    if (doc.type == "provider") {
      setIsProvider(true);
    } else {
      setIsProvider(false);
    }
    console.log(doc);
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
      organization: doc.practice_profiles?.legal_business_name,
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

  // Inside renderDocuments function
  const renderDocuments = (type) => {

    return filteredDocuments.map((doc, index) =>
      doc.type == type ? (
        <tr className="border-b" key={index}>
          <td className="p-3">
            {doc.providers_info?.first_name}
            {doc.providers_info?.middle_initial}
            {doc.providers_info?.last_name}
            {doc.practice_profiles?.legal_business_name}
          </td>
          <td className="p-3">{doc.title}</td>
          <td className="p-3">{formatDate(doc.expiry_date)}</td>
          <td className={`p-3 ${getStatusColor(doc.status)}`}>{doc.status}</td>
          <td className="p-3 flex flex-row justify-start items-center gap-2">
            <button onClick={() => handleView(doc)}>
              <FaEye className="text-secondary" />
            </button>
            /
            <CiEdit
              className="text-primary cursor-pointer"
              onClick={() => handleEdit(doc)}
            />
            /
            <button
              type="button"
              onClick={() => handleDeleteClick(doc)}
              className="text-red-600 hover:text-red-800"
            >
              <MdDeleteOutline className="size-5" />
            </button>
          </td>
        </tr>
      ) : (
        <tr key={index}></tr>
      )
    );
  };

  return (
    <AdminDashboardLayout barTitle="Document Center">
      <div className="flex flex-row justify-between items-center mt-4 mb-2 gap-4">
        <div className="w-1/3 flex flex-row justify-start items-center gap-4">
          <input
            type="text"
            className="w-full bg-gray-100 rounded-full px-4 py-2 text-black"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="size-10 bg-primary text-white p-2 rounded-full flex justify-center items-center">
            <CiSearch className="size-8" />
          </div>
        </div>
        <Link href={`/document/${uuid}`}>
          <Button
            title={"Add"}
            icon={<IoAddCircleOutline className="size-6" />}
          />
        </Link>
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
              {isProvider ? (
                <Dropdown
                  title="Provider"
                  name="provider"
                  options={providers}
                  value={formData.provider}
                  width="w-[48%]"
                  onChange={handleChange}
                  disabled={true}
                />
              ) : (
                <Dropdown
                  title="Organization"
                  name="organization"
                  options={[]}
                  value={formData.organization}
                  width="w-[48%]"
                  onChange={handleChange}
                  disabled={true}
                />
              )}

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
      {/* Tabs for toggling */}
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 mr-2 rounded-lg ${
            activeTab === "provider" ? "bg-primary text-white" : "bg-gray-200"
          }`}
          onClick={() => toggleTab("provider")}
        >
          Provider Documents
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "organization"
              ? "bg-primary text-white"
              : "bg-gray-200"
          }`}
          onClick={() => toggleTab("organization")}
        >
          Organization Documents
        </button>
      </div>

      <div className="min-h-screen flex flex-col md:flex-row">
        <main className="flex-1 py-4">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-200 text-left">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Document Type</th>
                    <th className="p-3">Expiration Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr className="w-full">
                      <td colSpan={5} className="p-4">
                        <div className="flex justify-center items-center w-full h-full">
                          <BarLoader />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {activeTab == "provider"
                        ? renderDocuments("provider")
                        : renderDocuments("organization")}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <TextInput
              width={"w-full"}
              title="Reason for deletion"
              name="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason"
            />
            <div className="mt-6 flex justify-end gap-4">
              <Button
                title="Cancel"
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
                className="bg-secondary text-white"
              />
              <Button
                title="Confirm"
                onClick={handleConfirmDelete}
                disabled={!reason}
                className="bg-primary text-white"
              />
            </div>
          </div>
        </div>
      )}
    </AdminDashboardLayout>
  );
};

// Wrap the DocumentCenterContent with Suspense
const DocumentCenter = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <DocumentCenterContent />
  </Suspense>
);

export default DocumentCenter;
