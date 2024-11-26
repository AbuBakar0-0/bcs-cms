import React from "react";
import AdminDashboardLayout from "../../adminLayout";
import OrganizationCard from "@/components/organizationManagement/OrganizationCard";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

export default function OrganizationDetail() {

    const data = [
        {
          legal_business_name: "Billing Care Solutions",
          doing_name: "BCS",
          code: "171100000X",
          address: "10851 SCARSDALE BLVD STE 200 HOUSTON TX 77089-5738",
          phone: "(302) 244-0434",
        },
        {
          legal_business_name: "Community Health Network",
          doing_name: "CHN",
          code: "211D00000X",
          address: "30 N GOULD, ST, STE R",
          phone: "281-824-1497",
        },
        {
          legal_business_name: "CreativeTrex",
          doing_name: "CT",
          code: "331L00000X",
          address: "30 N GOULD, ST, STE R",
          phone: "(302) 244-0434",
        },
      ];

      
  return (
    <AdminDashboardLayout barTitle="Organization Management">
        <OrganizationCard/>
        <div className="min-h-screen flex flex-col md:flex-row">
        <main className="flex-1 py-4">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-200 text-left">
                  <tr>
                    <th className="p-3">Legal Business Name</th>
                    <th className="p-3">Doing Business Name</th>
                    <th className="p-3">Taxonomy Code</th>
                    <th className="p-3">Address</th>
                    <th className="p-3">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item,index) => (
                    <tr className="border-b" key={index}>
                      <td className="p-3">{item.legal_business_name}</td>
                      <td className="p-3">{item.doing_name}</td>
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
