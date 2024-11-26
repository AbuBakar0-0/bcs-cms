"use client";
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { IoAddCircleOutline } from "react-icons/io5";
import EmailInput from "@/components/ui/inputFields/EmailInput";
import TextInput from "@/components/ui/inputFields/TextInput";
import AdminDashboardLayout from "../../adminLayout";

// Stepper Component
const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center gap-4">
        {steps.map((step, index) => (
          <div key={index} className={`flex flex-col items-center`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index + 1 === currentStep
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            <span className="text-sm mt-2">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function UserManagement() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = ["Permissions", "Add Users", "Review and Accept"];

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <AdminDashboardLayout barTitle="User Management">
      <div className="p-6">
        {/* Stepper Navigation */}
        <Stepper steps={steps} currentStep={currentStep} />

        {/* Step Content */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-lg font-bold mb-4">Permissions</h2>
            <p className="mb-6">
              Choose permissions to be assigned to the users that you are
              inviting. Invite users separately to grant them different
              permissions.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-gray-700">Member Services</h3>
                <div className="flex flex-wrap gap-4 ">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Authorization Requests</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Authorization History</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>SMI Reporting</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Restraint Reporting</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>POMS Reporting</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>ID Lookup : ALDA</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>ID Lookup : ALMH </span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Downloads</h3>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Downloads</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Survey Center</h3>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Guide Survey, View Survey Results</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Survey Data Entry</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Provider Reporting</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Business Center</h3>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Service Validation</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Ownership</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Fee Schedules</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Contract Lookup</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">User Management</h3>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Invite Users and Manage Permissions</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Claims</h3>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Provider Online (Health Choices)</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Electronic Data Interchange (EDI)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <>
            <div className="w-full flex flex-col gap-4 p-6 ">
              <h2 className="text-lg font-bold mb-4">Add Users</h2>
              <p className="mb-6">
                Enter one or multiple users. All users will be granted the
                permissions that you indicated on the previous screen. When
                finished adding users, click Next.
              </p>

              <div className="w-full flex flex-wrap justify-start items-end gap-4">
                <TextInput title={"First Name"} />
                <TextInput title={"Last Name"} />
                <EmailInput title={"Email"} />
                <Button
                  title={"Add"}
                  icon={<IoAddCircleOutline className="size-6" />}
                />
              </div>
            </div>
          </>
        )}

        {currentStep === 3 && (
          <div className="w-full flex flex-col gap-4 p-6 ">
            <h2 className="text-lg font-bold mb-4">Review and Accept</h2>
            <p className="mb-6">
              As the designated Online Facility Administrator, I understand that
              it is my responsibility to ensure that I only grant access to
              those individuals who are properly contracted with and/or
              representatives of Test Facility.
            </p>

            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <span>I accept the terms of this agreement.</span>
            </label>

            <div className="mt-6">
              <Button title={"Submit"} />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            title="Back"
            onClick={handlePrevStep}
            disabled={currentStep === 1}
          />
          {currentStep < steps.length && (
            <Button title="Next" onClick={handleNextStep} />
          )}
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
