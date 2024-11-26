import React from "react";
import AdminDashboardLayout from "../../adminLayout";
import OrganizationCard from "@/components/organizationManagement/OrganizationCard";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import Button from "@/components/ui/Button";
import { IoAddCircleOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";

export default function OrganizationDetail() {
  const data = [
    {
      legal_business_name: "Billing Care Solutions",
      npi_2: "1184215352",
      code: "171100000X",
      address: "10851 SCARSDALE BLVD STE 200 HOUSTON TX 77089-5738",
      phone: "(302) 244-0434",
    },
    {
      legal_business_name: "Community Health Network",
      doing_name: "1184215352",
      code: "211D00000X",
      address: "30 N GOULD, ST, STE R",
      phone: "281-824-1497",
    },
    {
      legal_business_name: "CreativeTrex",
      doing_name: "1184215352",
      code: "331L00000X",
      address: "30 N GOULD, ST, STE R",
      phone: "(302) 244-0434",
    },
  ];

  return (
    <AdminDashboardLayout barTitle="Organization Management">
      <OrganizationCard />
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
      <div className="min-h-screen flex flex-col md:flex-row">
        <main className="flex-1 py-4">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-200 text-left">
                  <tr>
                    <th className="p-3">Provider Ino</th>
                    <th className="p-3">NPI 2</th>
                    <th className="p-3">Taxonomy Code</th>
                    <th className="p-3">Address</th>
                    <th className="p-3">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr className="border-b" key={index}>
                      <td className="p-3">{item.legal_business_name}</td>
                      <td className="p-3">{item.npi_2}</td>
                      <td className="p-3">{item.code}</td>
                      <td className="p-3 ">{item.address}</td>
                      <td className="p-3 ">{item.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </AdminDashboardLayout>
  );
}
