"use client";
import React, { useState } from "react";
import AdminDashboardLayout from "../../adminLayout";

export default function DropdownForm() {
  // State for selected form
  const [selectedTab, setSelectedTab] = useState("");

  // List of tabs and their corresponding forms
  const tabs = [
    { name: "Authorization and Consent", form: "Authorization Form" },
    { name: "Code of Conduct", form: "Code of Conduct Form" },
    { name: "Compliance Training Acknowledgement Form", form: "Compliance Training Form" },
    { name: "Conflict of Interest Policy", form: "Conflict of Interest Form" },
    { name: "Consent for Professional References", form: "Professional References Consent Form" },
    { name: "Consent to Drug Test", form: "Drug Test Consent Form" },
    { name: "Consent to Perform Credentialing", form: "Credentialing Consent Form" },
    { name: "Consent to Verify Employment", form: "Employment Verification Consent Form" },
    { name: "Employee Computer and Software Use Acknowledgmer", form: "Computer & Software Use Form" },
    { name: "Employee Immunization Verification and Authorization", form: "Immunization Verification Form" },
    { name: "Hepatitis B Vaccine Information Handout", form: "Hepatitis B Vaccine Information Form" },
    { name: "Universal Precautions", form: "Universal Precautions Form" },
  ];

  return (
    <AdminDashboardLayout barTitle="Apply Now">
        <div className="container mx-auto px-4 py-4">
      <h1 className="text-xl font-bold mb-4">Select a Document</h1>
      <div className="mb-4">
        <label htmlFor="documentDropdown" className="block text-sm font-medium text-gray-700 mb-2">
          Choose a tab to display its form:
        </label>
        <select
          id="documentDropdown"
          className="block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={selectedTab}
          onChange={(e) => setSelectedTab(e.target.value)}
        >
          <option value="">-- Select a Tab --</option>
          {tabs.map((tab) => (
            <option key={tab.name} value={tab.name}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>

      {/* Conditionally Render the Form */}
      <div>
        {tabs.map((tab) => {
          if (tab.name === selectedTab) {
            return (
              <div
                key={tab.name}
                className="p-4 border rounded-md shadow-sm bg-gray-50"
              >
                <h2 className="text-lg font-semibold mb-2">
                  {tab.form}
                </h2>
                <p className="text-gray-600">
                  This is the form for "{tab.form}". Fill out the required fields and submit.
                </p>
                {/* Example Form Fields */}
                <form className="mt-4 space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            );
          }
          return null;
        })}

        {/* Message if no tab is selected */}
        {selectedTab === "" && (
          <div className="p-4 border rounded-md shadow-sm bg-gray-50">
            <p className="text-gray-600">
              Please select a tab to display the corresponding form.
            </p>
          </div>
        )}
      </div>
    </div>
    </AdminDashboardLayout>
  );
}
