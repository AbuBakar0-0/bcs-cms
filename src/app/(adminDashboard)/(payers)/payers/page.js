"use client";

import Button from "@/components/ui/Button";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { BarLoader } from "react-spinners";
import AdminDashboardLayout from "../../adminLayout";
import { CiSearch } from "react-icons/ci";

export default function Payers() {
  const [activeTab, setActiveTab] = useState("provider");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uuid, setUuid] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setUuid(localStorage.getItem("user_uuid"));
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/payers?uuid=${localStorage.getItem("user_uuid")}`
        );
        setData(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  function getColor(status) {
    const statusClasses = {
      Submitted: "text-blue-500",
      "In-Progress": "text-yellow-500",
      Approved: "text-green-500",
      Rejected: "text-red-500",
      "Panel Closed": "text-purple-500",
      "Missing Information": "text-orange-500",
    };
    return statusClasses[status] || "bg-gray-500 text-white";
  }

  const renderDocuments = () => {
    const filteredDocs = data.filter((doc) => {
      const searchFields = [
        doc.plan_type,
        doc.business,
        doc.providers_info?.first_name,
        doc.providers_info?.last_name,
        doc.payer_name,
        doc.status,
        doc.application_date,
        doc.note,
      ];

      return searchFields.some(
        (field) =>
          field &&
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    return filteredDocs.map((doc, index) => (
      <tr className="border-b" key={index}>
        {activeTab === "provider" && (
          <td className="p-3">
            {doc.providers_info?.first_name} {doc.providers_info?.middle_initial}{" "}
            {doc.providers_info?.last_name}
          </td>
        )}
        <td className="p-3">{doc.business}</td>
        <td className="p-3">{doc.payer_name}</td>
        <td className="p-3">{doc.plan_type}</td>
        <td className={`p-3 ${getColor(doc.status)}`}>{doc.status}</td>
        <td className="p-3">{doc.application_date}</td>
        <td className="p-3">{doc.note}</td>
      </tr>
    ));
  };

  return (
    <AdminDashboardLayout barTitle="Payers">
      <div className="flex flex-row justify-between items-center mt-4 mb-2 gap-4">
        <div className="w-1/3 flex flex-row justify-start items-center gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 rounded-full px-4 py-2 text-black"
            placeholder="Search"
          />
          <div className="size-10 bg-primary text-white p-2 rounded-full flex justify-center items-center">
            <CiSearch className="size-8" />
          </div>
        </div>
        <Link href={`/payerSetup/${uuid}`}>
          <Button
            title={"Add"}
            icon={<IoAddCircleOutline className="size-6" />}
          />
        </Link>
      </div>

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
          {loading ? (
            <div className="w-full flex justify-center items-center">
              <BarLoader />
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead className="bg-gray-200 text-left">
                    <tr>
                      {activeTab === "provider" && (
                        <th className="p-3">Provider Name</th>
                      )}
                      <th className="p-3">Business</th>
                      <th className="p-3">Payer Name</th>
                      <th className="p-3">Plan Type</th>
                      <th className="p-3">Application Status</th>
                      <th className="p-3">Application Date</th>
                      <th className="p-3">Application Details</th>
                    </tr>
                  </thead>
                  <tbody>{renderDocuments()}</tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </AdminDashboardLayout>
  );
}
