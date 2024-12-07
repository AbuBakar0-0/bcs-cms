"use client";

import ProvidersCard from "@/components/providersDashboard/ProvidersCard";
import AdminDashboardLayout from "../../adminLayout";
import { useParams } from "next/navigation";

export default function Verification() {
  const {id} = useParams();
  return (
    <AdminDashboardLayout barTitle={"Providers Dashboard"}>
      <ProvidersCard id={id}/>
      
        <div className="w-full flex flex-wrap items-center justify-between bg-gray-100 p-4 rounded-md gap-4 mt-4">
          <div className="flex gap-4">
            <div>
              <label className="font-medium text-gray-700">
                Verification Status:
              </label>
              <select className="ml-2 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option>All</option>
                <option>Manual</option>
                <option>Native</option>
                <option>Uploaded</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              New Verification
            </button>
            <button className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400">
              Export Report
            </button>
            <button className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400">
              Not Applicable List
            </button>
          </div>

          <div className="w-full mt-6">
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 text-sm text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 border-b">Verification Type</th>
                    <th className="px-4 py-2 border-b">License Number</th>
                    <th className="px-4 py-2 border-b">Verification Status</th>
                    <th className="px-4 py-2 border-b">License Status</th>
                    <th className="px-4 py-2 border-b">License Expiration</th>
                    <th className="px-4 py-2 border-b">Date Verified</th>
                    <th className="px-4 py-2 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border-b">
                      Controlled Substance Registration
                    </td>
                    <td className="px-4 py-2 border-b">q231431</td>
                    <td className="px-4 py-2 border-b text-green-600">
                      ● Verified
                    </td>
                    <td className="px-4 py-2 border-b text-green-600">
                      Active
                    </td>
                    <td className="px-4 py-2 border-b">10/31/2021</td>
                    <td className="px-4 py-2 border-b">03/16/2021</td>
                    <td className="px-4 py-2 border-b">
                      <div className="flex space-x-2">
                        <button className="text-blue-500 hover:underline">
                          Edit
                        </button>
                        <button className="text-red-500 hover:underline">
                          Delete
                        </button>
                        <button className="text-gray-500 hover:underline">
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="w-full mt-6">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Premium Verifications
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 text-sm text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 border-b">Verification Type</th>
                    <th className="px-4 py-2 border-b">License Number</th>
                    <th className="px-4 py-2 border-b">Verification Status</th>
                    <th className="px-4 py-2 border-b">Report Expiration</th>
                    <th className="px-4 py-2 border-b">Date Verified</th>
                    <th className="px-4 py-2 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border-b">
                      Background Check
                      <span className="text-blue-500">Premium</span>
                    </td>
                    <td className="px-4 py-2 border-b">-</td>
                    <td className="px-4 py-2 border-b text-gray-500">
                      ● Not Enabled
                    </td>
                    <td className="px-4 py-2 border-b">-</td>
                    <td className="px-4 py-2 border-b">-</td>
                    <td className="px-4 py-2 border-b">
                      <div className="flex space-x-2">
                        <button className="text-blue-500 hover:underline">
                          Enable
                        </button>
                        <button className="text-gray-500 hover:underline">
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </AdminDashboardLayout>
  );
}
