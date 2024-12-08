"use client";

import { useEffect, useState } from "react";

import Button from "@/components/ui/Button";
import axios from "axios";
import { CiEdit, CiSearch } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { BarLoader } from "react-spinners";
import AdminDashboardLayout from "./../../adminLayout";

export default function CredentialingStatus() {
  const [activeTab, setActiveTab] = useState("provider");
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const organizationDocuments = [
    {
      uuid: "0db637cb-c379-4a95-abb0-a02a075fda09",
      provider_id: "1558073f-124f-4bce-b95e-ded58186a706",
      practice_type: "Medical",
      type_of_service_provided: "Group Speciality Care",
      credentialing_type: "Re Credentialing",
      npi_2: "1111111111",
      tax_id: "111111111",
      legal_business_name: "111111",
      doing_business_name: "111111111111111",
      taxonomy_code_1: "111N00000X",
      taxonomy_code_2: "171100000X",
      service_address_id: "da03fa92-a850-43f0-8e58-55de62060c5d",
      service_contact_id: "931caca0-a6cf-4bcc-97dc-4b6836ea8dde",
      mailing_address_id: "20ee9e2b-f5c2-47cb-be1a-db5a45122f4c",
      mailing_contact_id: "0a136494-3dae-4792-b672-fdad30ef974b",
      correspondance_address_id: "17586d9d-8af2-4fca-89a0-ed0f45d3cf45",
      correspondance_contact_id: "cc751bd0-c695-4d95-bca4-e352f622e739",
      ptan_medicare_number: "1111111111111111111111111",
      medicaid_number: "1111111111111111111111111",
      start_date: "2024-12-17",
      practice_contact_id: "0d5604d9-cc5b-4dc4-ab74-5a36fc28a69b",
      deleted_at: null,
      providers_info: {
        dob: "2024-12-30",
        ssn: "***-**-1111",
        uuid: "1558073f-124f-4bce-b95e-ded58186a706",
        gender: "Female",
        added_by: "84bf9e75-6e97-430d-b123-4af0101a1592",
        image_url: null,
        last_name: "ASD",
        birth_city: "asdaads",
        contact_id: "e96a6693-ecac-4f07-bab0-0712855f8267",
        deleted_at: null,
        first_name: "Test",
        issue_date: "2024-12-31",
        license_id: "111111111111111",
        birth_state: "AZ",
        expiry_date: "2024-12-31",
        picture_url:
          "https://res.cloudinary.com/db7z9hknv/image/upload/v1733342732/providers-profiles/hwpqnmrlgcxnzmulge6h.png",
        state_issued: "AK",
        birth_country: "Pakistan",
        middle_initial: "S    ",
        provider_title: "DPM",
        home_address_id: "06932997-c316-4d95-8a0c-648bcabd07a7",
        picture_public_id: "providers-profiles/hwpqnmrlgcxnzmulge6h",
        mailing_address_id: "c1682c99-4e8e-45b1-a1f6-e6e6be0c84e1",
        emergency_contact_id: "e1182b73-c184-493c-b5db-4ab78f29563c",
        service_location_address_id: "5c3c6821-cd50-4f48-8275-0abd81b7d422",
      },
    },
  ];

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("user_uuid");
      const response = await axios.get(
        `/api/credentialing-status?uuid=${userId}`
      );

      console.log(response);
      const data = response.data;

      if (data) {
        setDocuments(data);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const renderDocuments = () => {
    const docs = activeTab === "provider" ? documents : organizationDocuments;
  
    const filteredDocs = docs.filter((doc) => {
      const fieldsToSearch = [
        `${doc.providers_info.first_name} ${doc.providers_info.last_name}`,
        doc.practice_type,
        doc.type_of_service_provided,
        doc.credentialing_type,
        doc.ptan_medicare_number,
        doc.medicaid_number,
      ];
  
      return fieldsToSearch.some((field) =>
        field?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  
    return filteredDocs.map((doc, index) => (
      <tr className="border-b" key={index}>
        <td className="p-3">
          {doc.providers_info.first_name} {doc.providers_info.middle_initial}
          {doc.providers_info.last_name}
        </td>
        <td className="p-3">{doc.practice_type}</td>
        <td className="p-3">{doc.type_of_service_provided}</td>
        <td className="p-3">{doc.credentialing_type}</td>
        <td className="p-3">
          {doc.ptan_medicare_number} <br /> {doc.medicaid_number}
        </td>
        <td className="p-3 flex flex-row justify-start items-center gap-2">
          <CiEdit className="text-primary" /> /
          <MdDeleteOutline className="text-red-400" />
        </td>
      </tr>
    ));
  };
  

  return (
    <AdminDashboardLayout barTitle="Credentialing Status">
      <div className="flex flex-row justify-between items-center mt-4 mb-2 gap-4">
        <div className="w-1/3 flex flex-row justify-start items-center gap-4">
          <input
            type="text"
            className="w-full bg-gray-100 rounded-full px-4 py-2 text-black"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="size-10 bg-primary text-white p-2 rounded-full flex justify-center items-center">
            <CiSearch className="size-8" />
          </div>
        </div>
        {/* <Button
          title={"Add"}
          icon={<IoAddCircleOutline className="size-6" />}
        /> */}
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
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex justify-center">
                  <BarLoader />
                </div>
              ) : (
                <>
                  <table className="w-full table-auto">
                    <thead className="bg-gray-200 text-left">
                      <tr>
                        <th className="p-3">Provider Name</th>
                        <th className="p-3">Practice Type</th>
                        <th className="p-3">Type of Service</th>
                        <th className="p-3">Credentialing Type</th>
                        <th className="p-3">Numbers</th>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>{renderDocuments()}</tbody>
                  </table>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </AdminDashboardLayout>
  );
}
