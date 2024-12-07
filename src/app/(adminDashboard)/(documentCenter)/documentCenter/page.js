"use client";

import Button from "@/components/ui/Button";
import { useState, useEffect } from "react";
import { CiEdit, CiSearch } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import AdminDashboardLayout from "../../adminLayout";
import axios from "axios"; // Import axios for HTTP requests
import { BarLoader } from "react-spinners";
import Link from "next/link";

export default function DocumentCenter() {
  const [activeTab, setActiveTab] = useState("provider");
  const [documents, setDocuments] = useState([]); // Store documents in state
  const [filteredDocuments, setFilteredDocuments] = useState([]); // Store filtered documents for search
  const [loading, setLoading] = useState(true); // Handle loading state
  const [error, setError] = useState(""); // Store any errors
  const [searchTerm, setSearchTerm] = useState(""); // Search term state

  let id = "";

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const fetchDocuments = async () => {
    id = localStorage.getItem("user_uuid");
    const userUuid = localStorage.getItem("user_uuid");
    if (!userUuid) {
      setError("User UUID not found");
      setLoading(false);
      return;
    }

    try {
      // Make an Axios request to get the documents
      const response = await axios.get(`/api/document-center?uuid=${userUuid}`);

      // Set the documents state with the fetched data
      setDocuments(response.data);
      setFilteredDocuments(response.data); // Initially, set filtered docs to all docs
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
    fetchDocuments();
  }, []); // Fetch documents on component mount

  // Filter documents based on search term
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter the documents based on the search term
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
        {/* Apply date format */}
        <td className={`p-3 ${getStatusColor(doc.status)}`}>{doc.status}</td>
        <td className="p-3 flex flex-row justify-start items-center gap-2">
          <a href={doc.url} target="_blank">
            <FaEye className="text-secondary" />
          </a>
          /
          <CiEdit className="text-primary" /> /
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
        <Link href={`/document/${id}`}>
          <Button
            title={"Add"}
            icon={<IoAddCircleOutline className="size-6" />}
          />
        </Link>
      </div>

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
}
