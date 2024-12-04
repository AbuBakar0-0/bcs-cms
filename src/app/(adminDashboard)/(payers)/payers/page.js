"use client";

import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { BarLoader } from "react-spinners";
import AdminDashboardLayout from "../../adminLayout";
import axios from "axios";
import Link from "next/link";

export default function Payers() {
  const [activeTab, setActiveTab] = useState("provider");

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let added_by = localStorage.getItem("user_uuid");
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        added_by = localStorage.getItem("user_uuid");
        const response = await axios.get(`/api/payers?added_by=${added_by}`);
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

  const organizationDocuments = [
    {
      uuid: "0553cb45-49c3-4236-a894-5c42623259b9",
      provider_id: "e3b85558-7e41-4567-97d3-1a82baa43dc9",
      state: "AK",
      plan_type: "HMO",
      deleted_at: null,
      business: "CHN Medical Support",
      payer_name: "Humana",
      status: "Submitted",
      application_date: "1111-10-01",
      note: "asdasd",
      providers_info: {
        dob: "1111-11-11",
        ssn: "***-**-1111",
        uuid: "e3b85558-7e41-4567-97d3-1a82baa43dc9",
        gender: "male",
        added_by: "e9a05727-1f57-4447-b985-b0beecaebd6a",
        image_url: null,
        last_name: "ASD",
        birth_city: "asdaads",
        contact_id: "9e4b61cf-6b3d-403d-afd3-c29062e02257",
        deleted_at: null,
        first_name: "Test",
        issue_date: "1111-01-01",
        license_id: "111111111111111",
        birth_state: "AL",
        expiry_date: "1111-01-01",
        state_issued: "AL",
        birth_country: "Pakistan",
        middle_initial: "SA   ",
        provider_title: "DO",
        home_address_id: "7aa9183e-6cc3-4a73-aa2a-d95a32f188a0",
        mailing_address_id: "6ff185c3-0445-430f-aefa-6d17e9c9b865",
        emergency_contact_id: "f0269968-7fd5-440e-99fa-47a7d5ed8d8d",
        service_location_address_id: "eeaab40c-0064-4286-ab63-e91466e7bde3",
      },
    },
  ];

  // Function to toggle between the two tabs
  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  // Render the appropriate documents based on the active tab
  const renderDocuments = () => {
    const documents = activeTab === "provider" ? data : organizationDocuments;

    return data.providers_info != null ? (
      documents.map((doc, index) => (
        <tr className="border-b" key={index}>
          <td className="p-3">
            {doc.providers_info.last_name} {doc.providers_info.middle_initial}{" "}
            {doc.providers_info.first_name}
          </td>
          <td className="p-3">{doc.plan_type}</td>
          <td className="p-3">{doc.business}</td>
          <td className="p-3">{doc.payer_name}</td>
          <td className="p-3">{doc.status}</td>
          <td className="p-3">{doc.note}</td>
          <td className="p-3 flex flex-row items-center gap-3">
            <FaEye className="text-secondary" />
            <CiEdit className="text-primary" />
            <MdDeleteOutline className="text-red-400" />
          </td>
        </tr>
      ))
    ) : (
      <tr><td colSpan={7} className="text-center text-gray-500">No Data Found</td></tr>
    );
  };

  return (
    <AdminDashboardLayout barTitle="Organization Management">
      <div className="flex flex-row justify-end items-center mt-4 mb-2 gap-4">
        <Link href={`/payerSetup/${added_by}`}>
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
                      <th className="p-3">Full Name</th>
                      <th className="p-3">Plan Type</th>
                      <th className="p-3">Business</th>
                      <th className="p-3">Payer Name</th>
                      <th className="p-3">Application Status</th>
                      <th className="p-3">Application Details</th>
                      <th className="p-3">Actions</th>
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
