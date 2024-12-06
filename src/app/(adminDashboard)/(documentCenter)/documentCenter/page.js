"use client";

import Button from "@/components/ui/Button";
import { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import AdminDashboardLayout from "../../adminLayout";
import axios from "axios"; // Import axios for HTTP requests
import { BarLoader } from "react-spinners";
import Link from "next/link";

export default function DocumentCenter() {
  // State to handle the active tab (Provider or Organization)
  const [activeTab, setActiveTab] = useState("provider");
  const [documents, setDocuments] = useState([]); // Store documents in state
  const [loading, setLoading] = useState(true); // Handle loading state
  const [error, setError] = useState(""); // Store any errors

  // Function to toggle between the two tabs
  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  // Retrieve user_uuid from localStorage

  // Function to fetch documents using user_uuid
  const fetchDocuments = async () => {
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
        return "text-green-500"; // Green for Active
      case "Missing":
        return "text-yellow-500"; // Yellow for Missing
      case "Expiring":
        return "text-orange-500"; // Orange for Expiring
      case "Expired":
        return "text-red-500"; // Red for Expired
      case "On File":
        return "text-blue-500"; // Blue for On File
      case "Requested Provider":
        return "text-purple-500"; // Purple for Requested Provider
      default:
        return "text-gray-500"; // Default color for unknown status
    }
  }
  // UseEffect to fetch documents when component mounts
  useEffect(() => {
    fetchDocuments();
  }, []); // Empty dependency array means this runs once on component mount

  // Function to render documents
  const renderDocuments = () => {
    return documents.map((doc, index) => (
      <tr className="border-b" key={index}>
        <td className="p-3">
          {doc.providers_info.first_name} {doc.providers_info.middle_initial}{" "}
          {doc.providers_info.last_name}
        </td>
        <td className="p-3">{doc.title}</td>
        <td className="p-3">{doc.expiry_date}</td>
        <td className={`p-3 ${getStatusColor(doc.status)}`}>{doc.status}</td>
        <td className="p-3 flex flex-row justify-start items-center gap-2">
          <a href={doc.url} target="_blank">
            <FaEye className="text-secondary" />
          </a>{" "}
          /
          <CiEdit className="text-primary" /> /
          <MdDeleteOutline className="text-red-400" />
        </td>
      </tr>
    ));
  };

  return (
    <AdminDashboardLayout barTitle="Organization Management">
      <div className="flex flex-row justify-end items-center mt-4 mb-2 gap-4">
        <Link href={`/document/${localStorage.getItem("user_uuid")}`}>
        <Button
          title={"Add"}
          icon={<IoAddCircleOutline className="size-6" />}
        />
        </Link>
        {/* <button className="px-4 py-2 border-primary border-4 flex flex-row justify-center items-center gap-2 rounded-lg">
          <CiEdit />
          <span>Edit</span>
        </button> */}
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
