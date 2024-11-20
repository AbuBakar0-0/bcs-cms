"use client";

import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import emailjs from "emailjs-com";
import FormTextField from "@/components/about/FormTextField";
import Header from "@/components/ui/Header";
import Hero from "@/components/credentialing/Hero";
import ImportantFeatures from "@/components/home/ImportantFeatures";
import Clients from "@/components/home/Clients";
import Footer from "@/components/ui/Footer";
import TextInput from "@/components/ui/inputFields/TextInput";

function Credentialing() {
	const initialFormData = {
		last_name: "",
		first_name: "",
		contact_number: "",
		no_of_providers: "",
		practice_type: "",
		phone: "",
		email: "",
	};

	const [formData, setFormData] = useState(initialFormData);

	// Update form data in state
	const handleChange = (field, value) => {
		setFormData((prevData) => ({
			...prevData,
			[field]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Send the form data using emailjs
		emailjs
			.send(
				"service_5qe514z",
				"template_m4vazqe",
				formData,
				"J8mPA0rHkN5D87yHl"
			)
			.then((response) => {
				console.log("Email sent successfully!", response.status, response.text);
				alert("Email sent successfully!");

				// Clear the form after successful submission
				setFormData(initialFormData);
			})
			.catch((error) => {
				console.error("Failed to send email:", error);
				alert(`Failed to send email. Error: ${JSON.stringify(error)}`);
			});
	};
	return (
		<>
			<Header />
			<Hero />
			<div className="container mx-auto flex flex-col justify-center items-center gap-5 p-10">
				<div className="w-full flex flex-col justify-center items-center gap-5 mt-10">
					<span className="text-4xl font-semibold text-center">
						Ready to explore more about CMS by
						<span className="text-secondary mx-4">Billing Care Solutions?</span>
					</span>
					<span className="text-4xl font-semibold">
						Request a<span className="text-secondary mx-4">Demo</span>
					</span>
					<div className="w-1/4 h-[4px] bg-primary my-2"></div>
				</div>

				<div className="w-full flex flex-col lg:flex-row justify-center items-center gap-5 lg:p-10">
					<div className="w-full lg:w-1/2 flex flex-col justify-start items-start gap-5">
						<span className="w-full text-3xl text-secondary font-semibold">
							A more efficient way to manage your provider team.
						</span>
						<div className="w-1/4 h-[4px] bg-primary my-2"></div>
						<p className="text-xl w-full text-left pr-5">
							<strong>BCS-CMS</strong> is a credentialing management platform
							designed to help your organization stay compliant, all while being
							simple to use and budget-friendly.
						</p>
						<div className="border-2 border-secondary rounded-full px-4 py-3 flex flex-row justify-center items-center gap-4 text-primary text-xl">
							<span>Provider Portal</span>
							<div className="bg-primary rounded-full size-8 flex justify-center items-center text-white">
								<IoIosArrowForward />
							</div>
						</div>
						<img src="./assets/credentialing/credentialing-2.png" alt="" />
					</div>
					<div className="w-full lg:w-1/2 flex flex-col justify-start items-start gap-5">
						<div className="bg-zinc-300 rounded-lg p-10 flex flex-col justify-center items-center gap-3 scale-90">
							<form onSubmit={handleSubmit} className="flex flex-col gap-5">
								<p className="text-center mb-5 text-xl">
									Get in touch with our credentialing experts and schedule your 
									<strong>free demo</strong> today!
								</p>
								<FormTextField
									title="Last Name"
									label="last_name"
									value={formData.last_name}
									onChange={handleChange}
								/>
								<FormTextField
									title="First Name"
									label="first_name"
									value={formData.first_name}
									onChange={handleChange}
								/>
								<FormTextField
									title="Contact Person"
									label="contact_person"
									value={formData.contact_person}
									onChange={handleChange}
								/>
								<FormTextField
									title="No. of Providers"
									label="no_of_providers"
									value={formData.no_of_providers}
									onChange={handleChange}
								/>
								<FormTextField
									title="Practice Type"
									label="practice_type"
									value={formData.practice_type}
									onChange={handleChange}
								/>
								<FormTextField
									title="Phone Number"
									label="phone"
									value={formData.phone}
									onChange={handleChange}
								/>
								<FormTextField
									title="Email Address"
									label="email"
									value={formData.email}
									onChange={handleChange}
								/>
								<input
									type="submit"
									value="Schedule a Demo"
									className="bg-secondary text-white px-4 py-3 rounded-lg text-xl"
								/>
							</form>
						</div>
					</div>
				</div>

				<ImportantFeatures />
				<Clients />
			</div>
			<Footer />
		</>
	);
}

export default Credentialing;
