"use client";
import ProvidersCard from "@/components/providersDashboard/ProvidersCard";
import AdminDashboardLayout from "../../adminLayout";
import { useParams } from "next/navigation";

export default function Information() {
  const { id } = useParams();

  return (
    <AdminDashboardLayout barTitle={"Providers Dashboard"}>
      <ProvidersCard id={id} />
      <div className="w-full flex flex-row justify-start items-center gap-4 my-4">
        <span className="border-x-2 border-b-2 border-gray-400 p-2">
          Provider Info
        </span>
        <span className="border-x-2 border-b-2 border-gray-400 p-2">
          Professional Ids
        </span>
        <span className="border-x-2 border-b-2 border-gray-400 p-2">
          Education & Training
        </span>
        <span className="border-x-2 border-b-2 border-gray-400 p-2">
          Specialities
        </span>
        <span className="border-x-2 border-b-2 border-gray-400 p-2">
          Employment Info
        </span>
      </div>
    </AdminDashboardLayout>
  );
}
