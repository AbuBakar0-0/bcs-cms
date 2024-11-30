"use client";

import Button from "@/components/ui/Button";
import EmailInput from "@/components/ui/inputFields/EmailInput";
import PasswordInput from "@/components/ui/inputFields/PasswordInput";
import PhoneInput from "@/components/ui/inputFields/PhoneInput";
import TextInput from "@/components/ui/inputFields/TextInput";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Page() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const loadingToast = toast.loading("Signing up...");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push("/adminDashboard");
      toast.success("Registration successful!", { id: loadingToast });
    } catch (err) {
      toast.error(err.message || "Registration failed", { id: loadingToast });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center gap-4">
      <div className="w-2/3 flex flex-row justify-center items-center gap-4 shadow-lg rounded-lg p-10">
        <div className="w-full">
          <img
            src="/assets/BCS Logo billingcaresolutions.com.svg"
            alt="BCS Logo"
            className="w-2/3 h-auto"
          />
          <p className="text-4xl font-light my-10">Welcome to BCS-CMS</p>
          <div className="w-full flex flex-row justify-start items-center gap-4 my-4">
            <span>Login With </span>
            <img src="/assets/google-icon.png" alt="Google Icon" className="size-6" />
          </div>
          <Link href="/signin">
            <p className="">
              Already have an account? <span className="text-secondary underline">LOGIN</span>
            </p>
          </Link>
        </div>
        <div className="w-full flex flex-col gap-2">
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <TextInput
              title="First Name"
              width="w-full"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <TextInput
              title="Last Name"
              width="w-full"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <EmailInput
              title="Email"
              width="w-full"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <PasswordInput
              title="Password"
              width="w-full"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <PasswordInput
              title="Confirm Password"
              width="w-full"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <PhoneInput
              title="Phone Number"
              width="w-full"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <Button title="Signup" type="submit" style={"solid"}/>
          </form>
        </div>
      </div>
    </div>
  );
}
