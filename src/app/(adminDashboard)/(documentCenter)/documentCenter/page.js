"use client";

import Button from "@/components/ui/Button";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import AdminDashboardLayout from "../../adminLayout";

export default function DocumentCenter() {
  // State to handle the active tab (Provider or Organization)
  const [activeTab, setActiveTab] = useState("provider");

  // Data for provider and organization documents (replace with real data)
  const providerDocuments = [
    {
      documentType: "Appointment Application",
      providerName: "POINDEXTER, WETTE M - MD",
      date: "09/29/2023",
      expirationDate: "Expired 159 Days Ago",
      status: "Expired",
    },
    {
      documentType: "Appointment Application",
      providerName: "MIKKILINENI, RAJYALAKSHMI - MD",
      date: "09/29/2023",
      expirationDate: "Expired 10 Days Ago",
      status: "Expired",
    },
  ];

  const organizationDocuments = [
    {
      documentType: "Appointment Application",
      providerName: "Billing Care Solutions",
      date: "09/29/2023",
      expirationDate: "Expired 159 Days Ago",
      status: "Expired",
    },
    {
      documentType: "Appointment Application",
      providerName: "Community Health Network",
      date: "09/29/2023",
      expirationDate: "Will Expire After a year",
      status: "Active",
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
        <td className="p-3">{doc.documentType}</td>
        <td className="p-3">{doc.expirationDate}</td>
        <td className={`p-3 ${doc.status=="Active"?"text-primary":"text-red-500"}`}>{doc.status}</td>
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
                <tbody>{renderDocuments()}</tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </AdminDashboardLayout>
  );
}
