"use client";

import Button from "@/components/ui/Button";
import EmailInput from "@/components/ui/inputFields/EmailInput";
import PasswordInput from "@/components/ui/inputFields/PasswordInput";
import TextInput from "@/components/ui/inputFields/TextInput";
import Link from "next/link";

export default function page() {
  return (
    <div className="w-full h-screen flex justify-center items-center gap-4">
      <div className="w-1/3 flex flex-col justify-center items-center gap-4 shadow-lg rounded-lg p-4">
        <p className="text-6xl font-light my-10">Signin</p>
        <Link href="/register">
          <p className="">
            Don't Have an Account?{" "}
            <span className="text-secondary underline">Register Now</span>{" "}
          </p>
        </Link>
        <EmailInput title={"Email"} width={"w-full"} />
        <PasswordInput title={"Password"} width={"w-full"} />
        <Link href={"/adminDashboard"} className="mb-10">
          <Button title={"LOGIN"} />
        </Link>
      </div>
    </div>
  );
}
