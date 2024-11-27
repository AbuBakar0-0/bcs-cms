"use client";

import Button from "@/components/ui/Button";
import EmailInput from "@/components/ui/inputFields/EmailInput";
import PasswordInput from "@/components/ui/inputFields/PasswordInput";
import PhoneInput from "@/components/ui/inputFields/PhoneInput";
import TextInput from "@/components/ui/inputFields/TextInput";
import Link from "next/link";

export default function page() {
  return (
    <div className="w-full h-screen flex justify-center items-center gap-4">
      <div className="w-2/3 flex flex-row justify-center items-center gap-4 shadow-lg rounded-lg p-10">
        <div className="w-full">
          <p className="text-6xl font-light my-10">Register Now</p>
          <Link href="/signin">
            <p className="">
              Already have account?
              <span className="text-secondary underline">LOGIN</span>{" "}
            </p>
          </Link>
        </div>
        <div className="w-full flex flex-col gap-2">
          <TextInput title={"First Name"} width={"w-full"} />
          <TextInput title={"Last Name"} width={"w-full"} />
          <EmailInput title={"Email"} width={"w-full"} />
          <PasswordInput title={"Password"} width={"w-full"} />
          <PasswordInput title={"Confirm Password"} width={"w-full"} />
          <PhoneInput title={"Phone Number"} width={"w-full"} />
          <Link href={"/adminDashboard"} className="mb-10">
            <Button title={"Signup"} />
          </Link>
        </div>
      </div>
    </div>
  );
}
