"use client";

import Checkbox from "@/components/ui/inputFields/CheckBox";
import EmailInput from "@/components/ui/inputFields/EmailInput";
import PasswordInput from "@/components/ui/inputFields/PasswordInput";
import { useUserData } from "@/context/UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
	const router = useRouter();
	const { setUserData } = useUserData();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const loadingToast = toast.loading("Signing in...");
		try {
			const res = await fetch("/api/signin", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data.error);

			console.log(data.user);
			setUserData(data.user);
			// Assuming the UUID is in data.user.uuid
			const userUuid = data.user.uuid;

			// Store the UUID in localStorage
			localStorage.setItem("user_uuid", userUuid);

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

				<form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
					<EmailInput
						title="Email Address"
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
					<div className="w-full flex flex-row justify-between items-center gap-2">
						<Checkbox options={["Remember Me"]} width="w-1/4" />
						<span className="text-secondary hover:cursor-pointer">
							Forgot Password?
						</span>
					</div>
					<button
						type="submit"
						className="w-full flex justify-center items-center px-4 py-3 bg-primary text-white"
					>
						LOGIN
					</button>
				</form>
				<div className="w-full flex flex-row justify-center items-center gap-4">
					<div className="w-1/3 h-[1px] bg-black"></div>
					<span>OR</span>
					<div className="w-1/3 h-[1px] bg-black"></div>
				</div>
				<div className="w-full flex flex-row justify-center items-center gap-4">
					<span>Login With </span>
					<img src="/assets/google-icon.png" alt="" className="size-6" />
				</div>

				<Link href="/signup">
					<p className="">
						Don't Have an Account?
						<span className="text-secondary underline">Register Now</span>
					</p>
				</Link>
			</div>
		</div>
	);
}
