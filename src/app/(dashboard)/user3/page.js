import Button from "@/components/ui/Button";
import React from "react";

export default function User3() {
  return (
    <div className="w-full flex flex-col gap-4 p-6 ">
      <h2 className="text-lg font-bold mb-4">Permissions</h2>
      <p className="mb-6">
        As the designated Online Facility Administrator for Test Facility, I
        understand that it is my responsibility to ensure that I only grant
        access to those individuals who are properly contracted with and/or
        representatives of Test Facility (Authorized Users). I also certify that
        it is the responsibility of Test Facility to ensure that said Authorized
        Users only access sensitive information regarding individuals in your
        care in full adherence to and compliance with all applicable HIPAA
        standards in the course of rendering legitimate professional services on
        behalf of Test Facility.
      </p>

      <label className="flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4"/>
          <span>I accept the terms of this agreement.</span>
        </label>


      <div className="mt-6">
        <Button title={"Next"}/>
      </div>
    </div>
  );
}
