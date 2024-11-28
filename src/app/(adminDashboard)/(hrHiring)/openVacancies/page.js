"use client";

import React, { useState } from "react";
import AdminDashboardLayout from "../../adminLayout";
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";

export default function Page() {
  // State for active dropdowns
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Timer to handle delay
  let timer = null;

  // Handlers for mouse events
  const handleMouseEnter = (dropdown) => {
    clearTimeout(timer); // Clear any existing timer
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    timer = setTimeout(() => setActiveDropdown(null), 1000); // 1 second delay
  };

  return (
    <AdminDashboardLayout barTitle="HR Hiring">
      <div className="relative">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex space-x-6">
            {/* Company Location */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("location")}
              onMouseLeave={handleMouseLeave}
            >
              <span className="cursor-pointer flex items-center">
                Company Location <FaChevronDown className="ml-2" />
              </span>
              {activeDropdown === "location" && (
                <div className="absolute text-sm rounded-md mt-2 w-64 shadow-lg bg-white z-10">
                  <ul className="p-2 space-y-2 max-h-64 overflow-auto">
                    {[
                      "MyCHN Adoue",
                      "Women & Children's Health Center",
                      "Pearland Family Health Center",
                      "MyCHN Freeport",
                      "Bay Area Family Care",
                      "MyCHN League City",
                      "MyCHN Clute",
                      "Scarsdale Family Health Center",
                    ].map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="block hover:bg-secondary hover:text-white px-2 py-1 rounded"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Job Category */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("category")}
              onMouseLeave={handleMouseLeave}
            >
              <span className="cursor-pointer flex items-center">
                Job Category <FaChevronDown className="ml-2" />
              </span>
              {activeDropdown === "category" && (
                <div className="absolute text-sm rounded-md mt-2 w-64 shadow-lg bg-white z-10">
                  <ul className="p-2 space-y-2">
                    {[
                      "Medical (18)",
                      "Dental (9)",
                      "Behavioral Health (7)",
                      "Patient Services (4)",
                    ].map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="block hover:bg-secondary hover:text-white px-2 py-1 rounded"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Schedule */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("schedule")}
              onMouseLeave={handleMouseLeave}
            >
              <span className="cursor-pointer flex items-center">
                Schedule <FaChevronDown className="ml-2" />
              </span>
              {activeDropdown === "schedule" && (
                <div className="absolute text-sm rounded-md mt-2 w-64 shadow-lg bg-white z-10">
                  <ul className="p-2 space-y-2">
                    {["Full Time (38)", "Part Time (1)"].map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="block hover:bg-secondary hover:text-white px-2 py-1 rounded"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Job Location Type */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("locationType")}
              onMouseLeave={handleMouseLeave}
            >
              <span className="cursor-pointer flex items-center">
                Job Location Type <FaChevronDown className="ml-2" />
              </span>
              {activeDropdown === "locationType" && (
                <div className="absolute text-sm rounded-md mt-2 w-64 shadow-lg bg-white z-10">
                  <ul className="p-2 space-y-2">
                    {["Hybrid (5)", "On-Site (33)", "Remote (1)"].map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="block hover:bg-secondary hover:text-white px-2 py-1 rounded"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Apply Button */}
          <div>
            <Link href="/applyNow" className="bg-secondary hover:bg-primary text-white font-semibold px-4 py-2 rounded shadow">
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
