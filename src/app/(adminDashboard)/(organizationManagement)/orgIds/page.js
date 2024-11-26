import OrganizationCard from "@/components/organizationManagement/OrganizationCard";
import AdminDashboardLayout from "../../adminLayout";
import Button from "@/components/ui/Button";
import { IoAddCircleOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";

export default function OrgIds() {
  const data = [
    {
      npi_2: "1184215352",
      tax_id: "854192539",
      medicare: "2H7008",
      medicaid: "143377311",
    },
  ];

  const fieldNames = {
    npi_2: "NPI 2",
    tax_id: "Tax ID",
    medicare: "Medicare",
    medicaid: "Medicaid",
  };

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
                    <th className="p-3">Field Name</th>
                    <th className="p-3">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    // Mapping each field name with its corresponding value
                    Object.entries(item).map(([key, value]) => (
                      <tr className="border-b" key={`${index}-${key}`}>
                        <td className="p-3">{fieldNames[key]}</td>
                        <td className="p-3">{value}</td>
                      </tr>
                    ))
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
