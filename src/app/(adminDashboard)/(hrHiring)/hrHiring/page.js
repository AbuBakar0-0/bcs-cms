"use client";

import Link from "next/link";
import AdminDashboardLayout from "../../adminLayout";
import dynamic from "next/dynamic";

export default function page() {
  const hrData = [
    { name: "Total Employee", value: 100, type: "Employees", link: "" },
    { name: "On Boarding", value: 90, type: "Employees", link: "" },
    { name: "Probation", value: 5, type: "Employees", link: "" },
    { name: "Resigned Employees", value: 5, type: "Employees", link: "" },
    { name: "Open Vacancies", value: 15, type: "Vacancies", link: "/applyNow" },
  ];

  const EmployeeChart = dynamic(() => import("./employeeChart.js"), {
    ssr: false, // Ensure this component is only rendered on the client
  });
  const MonthlyChart = dynamic(() => import("./monthlyChart.js"), {
    ssr: false, // Ensure this component is only rendered on the client
  });
  return (
    <AdminDashboardLayout barTitle="HR Hiring">
      <div className="w-full flex flex-row justify-start items-center gap-4">
        {hrData.map((item, index) => (
          <Link
            href={item.link}
            key={index}
            className="w-1/6 border-2 border-gray-300 rounded-lg flex flex-col justify-start items-start p-4"
          >
            <span className="text-lg font-semibold">{item.name}</span>
            <span className="text-6xl font-semibold">{item.value}</span>
            <span>{item.type}</span>
          </Link>
        ))}
      </div>

      <div className="w-full flex flex-row justify-between items-center gap-4 mt-4">
        <div className="w-1/2 h-[27rem] flex flex-col justify-start items-start gap-4 border-2 border-gray-300 p-4 rounded-lg">
          <div className="w-full flex flex-row justify-between items-center">
            <span className="text-lg font-semibold">Employee</span>
            <button className="bg-secondary px-3 py-1 text-white">
              Filter & Sort
            </button>
          </div>
          <div className="w-full flex flex-row justify-between items-center gap-4">
            <span>Employee Status</span>
            <span>Department</span>
            <span>Age</span>
            <span>Discipline</span>
            <span>Status</span>
          </div>
        </div>

        <div className="w-1/2 flex flex-col justify-between items-center gap-4 border-2 border-gray-300 p-4 rounded-lg">
          <span className="w-full text-lg font-semibold">
            Employee Composition
          </span>
          <EmployeeChart />
        </div>
      </div>

      <div className="w-full flex flex-row justify-between items-center mt-10">
      <div className="w-1/2 flex flex-col justify-between items-center gap-4 border-2 border-gray-300 p-4 rounded-lg">
          <span className="w-full text-lg font-semibold">
            Job Statistics
          </span>
          <MonthlyChart />
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
