"use client";

import Button from "@/components/ui/Button";
import EmailInput from "@/components/ui/inputFields/EmailInput";
import PasswordInput from "@/components/ui/inputFields/PasswordInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Checkbox from "@/components/ui/inputFields/CheckBox";

const validateForm = (formData) => {
  if (!formData.email) {
    toast.error("Email is required");
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    toast.error("Invalid email format");
    return false;
  }
  if (!formData.password) {
    toast.error("Password is required");
    return false;
  }
  return true;
};

export default function Page() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!validateForm(formData)) return;

    const loadingToast = toast.loading("Signing in...");
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success("Sign in successful!", { id: loadingToast });
      router.push("/adminDashboard");
    } catch (err) {
      toast.error(err.message || "Sign in failed", { id: loadingToast });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center gap-4">
      <div className="w-1/3 flex flex-col justify-center items-center gap-4 shadow-lg rounded-lg p-4">
        <img
          src="/assets/BCS Logo billingcaresolutions.com.svg"
          alt=""
          className="w-2/3 h-auto"
        />
        <p className="text-5xl font-light">Sign in</p>
        <p className="text-xl font-extralight">Access Your Dashboard</p>
        
        <EmailInput
          title={"Email Address"}
          width={"w-full"}
          name={"email"}
          value={formData.email}
          onChange={handleChange}
        />
        <PasswordInput
          title={"Password"}
          width={"w-full"}
          name={"password"}
          value={formData.password}
          onChange={handleChange}
        />
        <div className="w-full flex flex-row justify-between items-center gap-2">
          <Checkbox options={["Remember Me"]} width="w-1/4" />
		  <span className="text-secondary hover:cursor-pointer">Forgot Password?</span>
        </div>
		<button onClick={handleSubmit} className="w-full flex justify-center items-center px-4 py-3 bg-primary text-white">
			LOGIN
		</button>
		<div className="w-full flex flex-row justify-center items-center gap-4">
			<div className="w-1/3 h-[1px] bg-black"></div>
			<span>OR</span>
			<div className="w-1/3 h-[1px] bg-black"></div>
		</div>
		<div className="w-full flex flex-row justify-center items-center gap-4">
			<span>Login With </span>
			<img src="/assets/google-icon.png" alt="" className="size-6" />
		</div>


		<Link href="/register">
          <p className="">
            Don't Have an Account?{" "}
            <span className="text-secondary underline">Register Now</span>
          </p>
        </Link>
      </div>
    </div>
  );
}
