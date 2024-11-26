import OrganizationCard from "@/components/organizationManagement/OrganizationCard";
import AdminDashboardLayout from "../../adminLayout";

export default function OrgInfo() {
  const data = [
    {
      practice_type: "Medical",
      type_of_service: "Solo Primary Care",
      credentialing_type: "Initial Credentialing",
      lbn: "Community Health Network",
      dbn: "CHN",
      tc1: "171100000X : Acupuncturist",
      tc2: "211DOOOOOX : Assistant Podiatric",
      sla: "30 N GOULD, ST, STE R",
      practice_phone: "(281) 824 1497",
      practice_appointment_phone: "(281) 824 1497",
      practice_fax: "(281) 824 1497",
      practice_email: "lttran@sfachc.org",
    },
  ];

  const fieldNames = {
    practice_type: "Practice Type",
    type_of_service: "Type of Service",
    credentialing_type: "Credentialing Type",
    lbn: "Legal Business Name",
    dbn: "Doing Business As",
    tc1: "Taxonomy Code 1",
    tc2: "Taxonomy Code 2",
    sla: "Service Location Address",
    practice_phone: "Practice Phone",
    practice_appointment_phone: "Practice Appointment Phone",
    practice_fax: "Practice Fax",
    practice_email: "Practice Email",
  };

  return (
    <AdminDashboardLayout barTitle="Organization Management">
      <OrganizationCard />
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
