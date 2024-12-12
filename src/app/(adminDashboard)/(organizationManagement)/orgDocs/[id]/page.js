"use client";

import AdminDashboardLayout from "@/app/(adminDashboard)/adminLayout";
import OrganizationCard from "@/components/organizationManagement/OrganizationCard";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";

export default function OrgDocs() {
  const { id: uuid } = useParams(); // Get the id from the route params
  const [documents, setDocuments] = useState([]); // State for API data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/org-docs?uuid=${uuid}`);
        setDocuments(response.data);
        
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Only fetch if id is available
  }, [uuid]);

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

  return (
    <AdminDashboardLayout barTitle="Organization Management">
      <OrganizationCard />
      {/* <div className="flex flex-row justify-end items-center mt-4 mb-2 gap-4">
        <Button
          title={"Add"}
          icon={<IoAddCircleOutline className="size-6" />}
        />
        <button className="px-4 py-2 border-primary border-4 flex flex-row justify-center items-center gap-2 rounded-lg">
          <CiEdit />
          <span>Edit</span>
        </button>
      </div> */}
      <div className="min-h-screen flex flex-col md:flex-row">
        <main className="flex-1 py-4">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-200 text-left">
                  <tr>
                    <th className="p-3">Document Type</th>
                    <th className="p-3">Provider Name</th>
                    <th className="p-3">Expiration Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? ( // Conditionally render loading spinner or data
                    <tr>
                      <td colSpan="4" className="text-center py-4"></td>
                    </tr>
                  ) : (
                    documents.map((doc, index) => (
                      <tr className="border-b" key={index}>
                        <td className="p-3">{doc.title}</td>
                        <td className="p-3">{doc.providers_info.first_name} {doc.providers_info.middle_initial} {doc.providers_info.last_name}</td>
                        <td className="p-3">{doc.expiry_date}</td>
                        <td className={`p-3 ${getStatusColor(doc.status)}`}>{doc.status}</td>
                        <td className="p-3 flex flex-row justify-start items-center gap-2">
                          <a href={doc.url} target="_blank"><FaEye className="text-secondary" /></a> 
                          {/* <CiEdit className="text-primary" /> /
                          <MdDeleteOutline className="text-red-400" /> */}
                        </td>
                      </tr>
                    ))
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
