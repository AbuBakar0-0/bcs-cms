"use client";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import AdminDashboardLayout from "../../adminLayout";

// Dynamically import html2pdf to avoid SSR issues
const html2pdf = dynamic(() => import("html2pdf.js"), { ssr: false });

export default function DropdownForm() {
  const [selectedTab, setSelectedTab] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);
  const [file, setFile] = useState(null); // State for the selected file
  const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling modal visibility
  const [acceptChecked, setAcceptChecked] = useState(false); // State for "I Accept" checkbox
  const canvasRef = useRef(null);

  const tabs = [
    {
      title: "Authorization and Consent",
      path: "/forms/Authorization and Consent.jpg",
    },
    { title: "Code of Conduct", path: "/forms/Code of Conduct.jpg" },
    {
      title: "Compliance Training Acknowledgement Form",
      path: "/forms/Authorization and Consent.jpg",
    },
    {
      title: "Consent for Professional References",
      path: "/forms/Code of Conduct.jpg",
    },
    {
      title: "Employee Computer and Software Use Acknowledgement",
      path: "/forms/Employee Computer and Software Use Acknowledgment.jpg",
    },
    {
      title: "Hepatitis B Vaccine Information Handout",
      path: "/forms/Hepatitis B Vaccine Information Handout.jpg",
    },
    { title: "Universal Precautions", path: "/forms/Universal Precautions.pdf" },
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
  
    if (!html2pdf) return;
  
    const signatureCanvas = canvasRef.current;
    const signatureDataUrl = signatureCanvas.toDataURL();
  
    const formContentElement = document.getElementById("formContent");
  
    // Set up the options for the PDF generation
    const options = {
      margin: 0.2,
      filename: `${selectedTab}-form.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
  
    // Create a new div to hold the form content and signature
    const formWithSignature = document.createElement("div");
    formWithSignature.innerHTML = formContentElement.innerHTML;
  
    // Create an image element for the selected form image
    const imageElement = document.createElement("img");
    imageElement.src = file || '/forms/Authorization and Consent.jpg'; // Use the selected file's path
    imageElement.style.width = "100%"; // Ensure the image covers the full width of the page
  
    // Add the image to the form
    formWithSignature.appendChild(imageElement);
  
    // Get the current date and time
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
  
    // Create a text element for the date and time
    const dateTimeElement = document.createElement("div");
    dateTimeElement.textContent = `${formattedDate}`;
    dateTimeElement.style.position = "absolute";
    dateTimeElement.style.top = "72%"; // Adjust the position as needed
    dateTimeElement.style.left = "73%";
    dateTimeElement.style.transform = "translateX(-50%)";
    dateTimeElement.style.fontSize = "12px";
    dateTimeElement.style.color = "black"; // Or any color you prefer
  
    // Add the date and time text to the form
    formWithSignature.appendChild(dateTimeElement);
  
    // Now, add the signature image on top of the form
    const signatureImage = document.createElement("img");
    signatureImage.src = signatureDataUrl;
    signatureImage.style.position = "absolute";
    signatureImage.style.top = "68%"; // Adjust as necessary for placement
    signatureImage.style.left = "32%";
    signatureImage.style.transform = "translateX(-50%)";
    signatureImage.style.width = "200px";
    signatureImage.style.zIndex = "1"; // Make sure it stays on top
  
    formWithSignature.appendChild(signatureImage);
  
    // Use html2pdf to generate the PDF
    const { default: pdfLib } = await import("html2pdf.js");
    pdfLib()
      .from(formWithSignature)
      .set(options)
      .save();
  };
  
  
  
  const handleFileChange = (e) => {
    const selectedValue = e.target.value;
    const selectedTabDetails = tabs.find((tab) => tab.title === selectedValue);
    if (selectedTabDetails) {
      setFile(selectedTabDetails.path); // Ensure the path is correct
      setSelectedTab(selectedValue);
      setIsModalOpen(true); // Open the modal
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setFile(null); // Clear file when closing modal
  };

  return (
    <AdminDashboardLayout barTitle="Apply Now">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-xl font-bold mb-4">Select a Document</h1>
        <div className="mb-4">
          <label
            htmlFor="documentDropdown"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Choose a tab to display its form:
          </label>
          <select
            id="documentDropdown"
            className="block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={selectedTab}
            onChange={handleFileChange}
          >
            <option value="">-- Select a Tab --</option>
            {tabs.map((tab) => (
              <option key={tab.title} value={tab.title}>
                {tab.title}
              </option>
            ))}
          </select>
        </div>

        {selectedTab === "" && (
          <div className="p-4 border rounded-md shadow-sm bg-gray-50">
            <p className="text-gray-600">
              Please select a tab to display the corresponding form.
            </p>
          </div>
        )}

        {/* Modal to display the selected file */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 max-h-screen overflow-auto">
            <div className="bg-white p-6 rounded-lg w-full md:w-2/3 lg:w-1/2 relative mt-52">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-red-500 text-2xl scale-100"
              >
                &times;
              </button>
              {file && (
                <img
                  src={file}
                  title="Selected File"
                  className="w-full h-full border"
                />
              )}
            </div>
          </div>
        )}

        {/* "I Accept" checkbox */}
        <div className="mt-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={acceptChecked}
              onChange={(e) => setAcceptChecked(e.target.checked)}
              className="mr-2"
            />
            I Accept the terms and conditions
          </label>
        </div>

        {/* Signature Box */}
        {acceptChecked && (
          <div className="mt-4 border rounded-md p-4 bg-gray-50">
            <p className="text-gray-700 mb-2">Please provide your signature:</p>
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              width={200}
              height={100}
              className="border border-gray-400"
            ></canvas>
            <div className="mt-2 flex justify-between">
              <button
                onClick={clearSignature}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Clear Signature
              </button>
            </div>
          </div>
        )}

        {/* Form content (this will be used for the PDF generation) */}
        <div id="formContent" style={{ display: "none" }}>
        </div>

        {/* Submit button */}
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            disabled={!acceptChecked || !selectedTab}
          >
            Download PDF
          </button>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
