"use client";

import { useState } from "react";
import OrganizationCard from "@/components/organizationManagement/OrganizationCard";

import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import Button from "@/components/ui/Button";
import { IoAddCircleOutline } from "react-icons/io5";
import AdminDashboardLayout from './../../adminLayout';

export default function CredentialingStatus() {
  // State to handle the active tab (Provider or Organization)
  const [activeTab, setActiveTab] = useState("provider");

  // Data for provider and organization documents (replace with real data)
  const providerDocuments = [
    {
      providerName: "POINDEXTER, WETTE M - MD",
      type: "Initial Credentialing",
      date:"11/23/2024",
      status: "Approved",
    },
    {
      providerName: "MIKKILINENI, RAJYALAKSHMI - MD",
      type: "Initial Credentialing",
      date:"11/23/2024",
      status: "Subimtted",
    },
  ];

  const organizationDocuments = [
    {
      providerName: "Billing Care Solutions",
      type: "Initial Credentialing",
      date:"11/23/2024",
      status: "Approved",
    },
    {
      providerName: "Community Health Network",
      type: "Initial Credentialing",
      date:"11/23/2024",
      status: "Subimtted",
    },
  ];

  // Function to toggle between the two tabs
  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  // Render the appropriate documents based on the active tab
  const renderDocuments = () => {
    const documents = activeTab === "provider" ? providerDocuments : organizationDocuments;

    return documents.map((doc, index) => (
      <tr className="border-b" key={index}>
        <td className="p-3">{doc.providerName}</td>
        <td className="p-3">{doc.type}</td>
        <td className="p-3">{doc.date}</td>
        <td className={`p-3 ${doc.status=="Approved"?"text-primary":"text-yellow-500"}`}>{doc.status}</td>
        <td className="p-3 flex flex-row justify-start items-center gap-2">
          <FaEye className="text-secondary" /> /
          <CiEdit className="text-primary" /> /
          <MdDeleteOutline className="text-red-400" />
        </td>
      </tr>
    ));
  };

  return (
    <AdminDashboardLayout barTitle="Organization Management">
      <div className="flex flex-row justify-end items-center mt-4 mb-2 gap-4">
        <Button title={"Add"} icon={<IoAddCircleOutline className="size-6" />} />
        <button className="px-4 py-2 border-primary border-4 flex flex-row justify-center items-center gap-2 rounded-lg">
          <CiEdit />
          <span>Edit</span>
        </button>
      </div>

      {/* Tabs for toggling */}
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 mr-2 rounded-lg ${activeTab === "provider" ? "bg-primary text-white" : "bg-gray-200"}`}
          onClick={() => toggleTab("provider")}
        >
          Provider Credentialing
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === "organization" ? "bg-primary text-white" : "bg-gray-200"}`}
          onClick={() => toggleTab("organization")}
        >
          Organization Credentialing
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
                    <th className="p-3">Credentialing Type</th>
                    <th className="p-3">Application Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>{renderDocuments()}</tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </AdminDashboardLayout>
  );
}
