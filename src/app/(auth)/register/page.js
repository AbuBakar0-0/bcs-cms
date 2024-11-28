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

const validateForm = (formData) => {
	if (!formData.firstName.trim()) {
		toast.error("First name is required");
		return false;
	}
	if (!formData.lastName.trim()) {
		toast.error("Last name is required");
		return false;
	}
	if (!formData.email) {
		toast.error("Email is required");
		return false;
	}
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!formData.email || !emailRegex.test(formData.email)) {
		toast.error("Invalid email format ");
		return false;
	}

	if (!formData.password || formData.password.length < 8) {
		toast.error("Password must be at least 8 characters");
		return false;
	}

	if (formData.confirmPassword !== formData.password) {
		toast.error("Passwords do not match");
		return false;
	}

	if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
		toast.error("Phone number must be at least 10 characters");
		return false;
	}

	return true;
};

const DEFAULT_STATE = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
	phoneNumber: "",
};

export default function Page() {
	const [formData, setFormData] = useState(DEFAULT_STATE);
	const router = useRouter();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async () => {
		if (!validateForm(formData)) return;

		const loadingToast = toast.loading("Signing up...");
		try {
			const res = await fetch("/api/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data.error);
			router.push("/providersInformation");
			toast.success("Registration successful!", { id: loadingToast });
		} catch (err) {
			toast.error(err.message || "Registration failed", { id: loadingToast });
		}
	};

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
					<TextInput
						title={"First Name"}
						width={"w-full"}
						name={"firstName"}
						value={formData.firstName}
						onChange={handleChange}
					/>
					<TextInput
						title={"Last Name"}
						width={"w-full"}
						name={"lastName"}
						value={formData.lastName}
						onChange={handleChange}
					/>
					<EmailInput
						title={"Email"}
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
					<PasswordInput
						title={"Confirm Password"}
						width={"w-full"}
						name={"confirmPassword"}
						value={formData.confirmPassword}
						onChange={handleChange}
					/>
					<PhoneInput
						title={"Phone Number"}
						width={"w-full"}
						name={"phoneNumber"}
						value={formData.phoneNumber}
						onChange={handleChange}
					/>
					<Button title={"Signup"} onClick={handleSubmit} />
				</div>
			</div>
		</div>
	);
}
