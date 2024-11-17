import React from "react";

export default function User1() {
  return (
    <div className="p-6">
      <h2 className="text-lg font-bold mb-4">Permissions</h2>
      <p className="mb-6">
        Choose permissions to be assigned to the users that you are inviting.
        Invite users separately to grant them different permissions.
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

      <div className="mt-6">
        <Button title={"Next"} />
      </div>
    </div>
  );
}
