import OrganizationCard from "@/components/organizationManagement/OrganizationCard";
import AdminDashboardLayout from "../../adminLayout";
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import Button from "@/components/ui/Button";
import { IoAddCircleOutline } from "react-icons/io5";

export default function OrgDocs() { 

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
      </div>      <div className="min-h-screen flex flex-col md:flex-row">
        <main className="flex-1 py-4">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-200 text-left">
                  <tr>
                    <th className="p-3">Document Type</th>
                    <th className="p-3">Expiration Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3">Appointment Application</td>
                    <td className="p-3">09/29/2023</td>
                    <td className="p-3 text-red-500">Expired 159 Days Ago</td>
                    <td className="p-3 flex flex-row justify-start items-center gap-2">
                      <FaEye className="text-secondary"/> /
                      <CiEdit className="text-primary"/> /
                      <MdDeleteOutline className="text-red-400"/>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </AdminDashboardLayout>
  );
}
