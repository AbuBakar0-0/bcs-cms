"use client";

import { useState } from "react";
import OrganizationCard from "@/components/organizationManagement/OrganizationCard";
import AdminDashboardLayout from "../../adminLayout";
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import Button from "@/components/ui/Button";
import { IoAddCircleOutline } from "react-icons/io5";

export default function Payers() {
  const [activeTab, setActiveTab] = useState("provider");

  const providerDocuments = [
    {
      payerName: "HUMANA",
      applicationStatus: "Submitted",
      applicationDetails:
        "Application Submitted on 09/26/2023. ID#PR-458426. Call to this #800-454-3730 speak with# Christina T ref#I-185806694 Address: 8610 Martin Luther King Jr. Blvd, Houston, TX 77033. KYMBERLY send an email on that address and ask them to update the tax ID txcredentialing@amerigroup.com",
      statusColor: "green-500",
    },
    {
      payerName: "Atena",
      applicationStatus: "In-Progress",
      applicationDetails:
        "Application Submitted on 09/26/2023. ID#PR-458426. Call to this #800-454-3730 speak with# Christina T ref#I-185806694 Address: 8610 Martin Luther King Jr. Blvd, Houston, TX 77033. KYMBERLY send an email on that address and ask them to update the tax ID txcredentialing@amerigroup.com",
      statusColor: "yellow-500",
    },
  ];

  const organizationDocuments = [
    {
      payerName: "Cigna",
      applicationStatus: "Missing Information",
      applicationDetails:
        "Application Submitted on 09/26/2023. ID#PR-458426. Call to this #800-454-3730 speak with# Christina T ref#I-185806694 Address: 8610 Martin Luther King Jr. Blvd, Houston, TX 77033. KYMBERLY send an email on that address and ask them to update the tax ID txcredentialing@amerigroup.com",
      statusColor: "gray-500",
    },
  ];

  // Function to toggle between the two tabs
  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  // Render the appropriate documents based on the active tab
  const renderDocuments = () => {
    const documents =
      activeTab === "provider" ? providerDocuments : organizationDocuments;

    return documents.map((doc, index) => (
      <tr className="border-b" key={index}>
        <td className="p-3">{doc.payerName}</td>
        <td className="p-3">{doc.applicationStatus}</td>
        <td className="p-3">{doc.applicationDetails}</td>
        <td className={`p-3 text-${doc.statusColor} font-bold`}>
          {doc.applicationStatus}
        </td>
        <td className="p-3 flex flex-row items-center gap-3 ">
          <FaEye className="text-secondary" />
          <CiEdit className="text-primary" />
          <MdDeleteOutline className="text-red-400" />
        </td>
      </tr>
    ));
  };

  return (
    <AdminDashboardLayout barTitle="Organization Management">
      <div className="flex flex-row justify-end items-center mt-4 mb-2 gap-4">
        <Button
          title={"Add"}
          icon={<IoAddCircleOutline className="size-6" />}
        />
        <button className="px-4 py-2 border-primary border-4 flex flex-row justify-center items-center gap-2 rounded-lg">
          <CiEdit />
          <span>Edit</span>
        </button>
      </div>

      {/* Tabs for toggling */}
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 mr-2 rounded-lg ${
            activeTab === "provider" ? "bg-primary text-white" : "bg-gray-200"
          }`}
          onClick={() => toggleTab("provider")}
        >
          Provider Credentialing
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "organization"
              ? "bg-primary text-white"
              : "bg-gray-200"
          }`}
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
                    <th className="p-3">Payer</th>
                    <th className="p-3">Application Status</th>
                    <th className="p-3">Application Details</th>
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
