"use client";
import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import AdminDashboardLayout from "../../adminLayout";

// Dynamically import html2pdf to avoid SSR issues
const html2pdf = dynamic(() => import("html2pdf.js"), { ssr: false });

export default function DropdownForm() {
  const [selectedTab, setSelectedTab] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);

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

  const startDrawing = (e) => {
    setIsDrawing(true);
    const context = canvasRef.current.getContext("2d");
    context.beginPath();
    context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const context = canvasRef.current.getContext("2d");
    context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!html2pdf) return; // Ensure html2pdf is available

    const formElement = document.getElementById("formContent");

    const options = {
      margin: 1,
      filename: `${selectedTab}-form.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf()
      .from(formElement)
      .set(options)
      .save();
  };

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

        <div>
          {tabs.map((tab) => {
            if (tab.name === selectedTab) {
              return (
                <div key={tab.name} className="p-4 border rounded-md shadow-sm bg-gray-50" id="formContent">
                  <h2 className="text-lg font-semibold mb-2">{tab.form}</h2>
                  <p className="text-gray-600">
                    This is the form for "{tab.form}". Fill out the required fields and submit.
                  </p>

                  <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email:
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700">Signature:</label>
                      <canvas
                        ref={canvasRef}
                        width="400"
                        height="200"
                        className="border border-gray-400 mt-2"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                      />
                      <div className="mt-2">
                        <button
                          type="button"
                          onClick={clearSignature}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                          Clear Signature
                        </button>
                      </div>
                    </div>

                    <div className="mt-4">
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

          {selectedTab === "" && (
            <div className="p-4 border rounded-md shadow-sm bg-gray-50">
              <p className="text-gray-600">Please select a tab to display the corresponding form.</p>
            </div>
          )}
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
