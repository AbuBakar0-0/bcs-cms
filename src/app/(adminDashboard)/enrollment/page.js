import React from "react";
import AdminDashboardLayout from "../adminLayout";
import ProvidersNavbar from "@/components/providersDashboard/ProvidersNavbar";
import ProvidersCard from "@/components/providersDashboard/ProvidersCard";
import { IoAddCircleOutline } from "react-icons/io5";

export default function page() {
  return (
    <AdminDashboardLayout>
      <ProvidersCard />
      <div className="w-full flex flex-col justify-start items-start gap-4">
        <div className="w-full flex flex-row justify-end items-center gap-4 my-4">
          <button className="flex flex-row gap-2 justify-center items-center border-4 border-primary rounded-lg px-6 py-2">
            <IoAddCircleOutline />
            <span>New Credentialing</span>
          </button>
          <button className="flex flex-row gap-2 justify-center items-center border-4 border-primary rounded-lg px-6 py-2">
            <IoAddCircleOutline />
            <span>Add Payer</span>
          </button>
        </div>

        <div className="w-full bg-gradient-to-r from-primary to-secondary flex flex-row justify-between items-center px-4 py-2 rounded-lg text-white">
          <span>Payers</span>
          <span>Application Status</span>
          <span>Actions</span>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
