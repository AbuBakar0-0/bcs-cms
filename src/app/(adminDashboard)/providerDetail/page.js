import ProvidersNavbar from "@/components/adminDashboard/ProvidersNavbar";
import React from "react";
import { CiUser } from "react-icons/ci";

export default function ProviderDetail() {
  return (
    <div className="">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-bold">2750 - Christina Hospital</h1>
      </div>

      <div className="flex space-x-4 p-4 bg-secondary rounded-lg text-white">
        <div className="w-[12.5%] flex flex-col items-center">
          <CiUser className="border-2 border-white rounded-full size-20 p-2" />
          <h2 className="text-lg font-semibold">Erica Locke</h2>
          <p className="text-sm">Provider type: -</p>
          <p className="text-sm">Specialty: -</p>
        </div>

        <div className="flex-grow">
          <h3 className="font-semibold">Provider Information</h3>
          <p>Date of Birth: -</p>
          <p>Home Phone Number: -</p>
          <p>Int Email: elocke@medreview.com</p>
          <p>Primary Provider Email: -</p>
          <p>SSN: -</p>
          <p>NPI: -</p>
        </div>

        <div className="flex-grow">
          <h3 className="font-semibold">Location Information</h3>
          <p>Location: Location 1</p>
          <p>Tax ID: -</p>
          <p>Org NPI: -</p>
          <p>Address: -</p>
          <p>Phone Number: -</p>
        </div>
      </div>

      <ProvidersNavbar />
    </div>
  );
}
