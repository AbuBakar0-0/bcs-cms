import OrganizationCard from "@/components/organizationManagement/OrganizationCard";
import AdminDashboardLayout from "../../adminLayout";
import Button from "@/components/ui/Button";
import { IoAddCircleOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";

export default function OrgLocation() {
  const data = [
    {
      type: "Service",
      line_1: "30 N Gould St",
      line_2: "STE R",
      city: "Sheridan",
      state: "WY",
      zip: "82801",
      phone: "(281) 824 1497",
      email: "lttran@sfachc.org",
    },
    {
      type: "Mailing",
      line_1: "1234 Elm St",
      line_2: "Apt 101",
      city: "Casper",
      state: "WY",
      zip: "82601",
      phone: "(281) 824 1497",
      email: "lttran@sfachc.org",
    },
    {
      type: "Correspondence",
      line_1: "5678 Maple Ave",
      line_2: "",
      city: "Gillette",
      state: "WY",
      zip: "82716",
      phone: "(281) 824 1497",
      email: "lttran@sfachc.org",
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
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-3">Address Type</th>
                    <th className="p-3">Address Line 1</th>
                    <th className="p-3">Address Line 2</th>
                    <th className="p-3">City</th>
                    <th className="p-3">State</th>
                    <th className="p-3">Zip</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, key) => (
                    <tr key={key} className="border-b">
                      <td className="p-3">{item.type}</td>
                      <td className="p-3">{item.line_1}</td>
                      <td className="p-3">{item.line_2}</td>
                      <td className="p-3">{item.city}</td>
                      <td className="p-3">{item.state}</td>
                      <td className="p-3">{item.zip}</td>
                      <td className="p-3">{item.phone}</td>
                      <td className="p-3">{item.email}</td>
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
