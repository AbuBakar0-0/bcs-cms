'use client';

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

// Component for Document Center
const DocumentCenterContent = () => {
  const [activeTab, setActiveTab] = useState("provider");
  const [documents, setDocuments] = useState([]); // Store documents in state
  const [filteredDocuments, setFilteredDocuments] = useState([]); // Store filtered documents for search
  const [loading, setLoading] = useState(true); // Handle loading state
  const [error, setError] = useState(""); // Store any errors
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [uuid, setUuid] = useState("");

  const toggleTab = (tab) => {
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
      const response = await axios.get(`/api/document-center?uuid=${userUuid}`);

      // Set documents state
      setDocuments(response.data);
      setFilteredDocuments(response.data); // Initially set filtered docs to all docs

      const documentType = searchParams.get("type"); 

      if (documentType) {
        // If 'type' query parameter exists, filter the documents based on 'status'
        const filtered = response.data.filter((doc) => doc.status === documentType);
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

  // Inside renderDocuments function
  const renderDocuments = () => {
    return filteredDocuments.map((doc, index) => (
      <tr className="border-b" key={index}>
        <td className="p-3">
          {doc.providers_info.first_name} {doc.providers_info.middle_initial}
          {doc.providers_info.last_name}
        </td>
        <td className="p-3">{doc.title}</td>
        <td className="p-3">{formatDate(doc.expiry_date)}</td>
        <td className={`p-3 ${getStatusColor(doc.status)}`}>{doc.status}</td>
        <td className="p-3 flex flex-row justify-start items-center gap-2">
          <button onClick={() => handleView(doc)}>
            <FaEye className="text-secondary" />
          </button>
          /
          <Link href={`/document/${uuid}`}>
            <CiEdit className="text-primary cursor-pointer" />
          </Link>
          /
          <MdDeleteOutline className="text-red-400" />
        </td>
      </tr>
    ));
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

      {/* Tabs for toggling */}
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 mr-2 rounded-lg ${activeTab === "provider" ? "bg-primary text-white" : "bg-gray-200"}`}
          onClick={() => toggleTab("provider")}
        >
          Provider Documents
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === "organization" ? "bg-primary text-white" : "bg-gray-200"}`}
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
                    <>{renderDocuments()}</>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
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
