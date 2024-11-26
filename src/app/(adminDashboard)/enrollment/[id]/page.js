import ProvidersCard from "@/components/providersDashboard/ProvidersCard";
import { IoAddCircleOutline } from "react-icons/io5";
import AdminDashboardLayout from "../../adminLayout";

export default function page() {
  return (
    <AdminDashboardLayout barTitle={"Providers Dashboard"}>
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

      <div className="w-full min-h-screen flex flex-col md:flex-row">
        <main className="w-full flex-1 py-4">
          <div className="w-full bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-200 text-left">
                  <tr>
                    <th className="p-3">Payer</th>
                    <th className="p-3">Application Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="w-1/5 p-3">HUMANA</td>
                    <td className="w-1/2 p-3">
                      Application Submitted on 09/26/2023.ID#PR-458426. Call to this
                      #800-454-3730 speak with# Christina T ref#I-185806694 Adress 8610
                      Martin Luther King Jr.Blvd Houston TX 77033 KYMBERLY send an email
                      on that adress and ask them to update the tax id
                      txcredentialing@amerigroup.com
                    </td>
                    <td className="w-1/5 text-green-500 font-bold p-3">
                      Submitted
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="w-1/5 p-3">Atena</td>
                    <td className="w-1/2 p-3">
                      Application Submitted on 09/26/2023.ID#PR-458426. Call to this
                      #800-454-3730 speak with# Christina T ref#I-185806694 Adress 8610
                      Martin Luther King Jr.Blvd Houston TX 77033 KYMBERLY send an email
                      on that adress and ask them to update the tax id
                      txcredentialing@amerigroup.com
                    </td>
                    <td className="w-1/5 text-yellow-500 font-bold p-3">
                      In-Progress
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="w-1/5 p-3">Cigna</td>
                    <td className="w-1/2 p-3">
                      Application Submitted on 09/26/2023.ID#PR-458426. Call to this
                      #800-454-3730 speak with# Christina T ref#I-185806694 Adress 8610
                      Martin Luther King Jr.Blvd Houston TX 77033 KYMBERLY send an email
                      on that adress and ask them to update the tax id
                      txcredentialing@amerigroup.com
                    </td>
                    <td className="w-1/5 text-gray-500 font-bold p-3">
                      Missing Information
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      </div>
    </AdminDashboardLayout>
  );
}
