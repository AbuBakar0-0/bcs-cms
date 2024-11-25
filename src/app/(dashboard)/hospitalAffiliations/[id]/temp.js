"use client";

import Button from "@/components/ui/Button";
import HeadingLine from "@/components/ui/HeadingLine";
import DateInput from "@/components/ui/inputFields/DateInput";
import Dropdown from "@/components/ui/inputFields/DropDown";
import TextInput from "@/components/ui/inputFields/TextInput";
import ZipCodeInput from "@/components/ui/inputFields/ZipcodeInput";
import NavBottom from "@/components/ui/NavBottom";
import SubmitButton from "@/components/ui/SubmitButton";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import submitForm from "@/hooks/postData";
import { useEffect, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { ClipLoader } from "react-spinners";

function HospitalAffiliations() {
	const [loading, setLoading] = useState(true); // Start with loading state as true
	const [hospitalData, setHospitalData] = useState([]);
	const [affiliation, showAffiliation] = useState(false);
	const [arrangements, showArrangements] = useState(false);

	const formRef = useRef();

	const handleAffiliation = () => {
		showAffiliation(!affiliation);
	};

	const handleshowArrangements = () => {
		showArrangements(!arrangements);
	};

	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await fetch("/api/hospital-affiliation");
			const data = await response.json();
			setHospitalData(data.result);
		} catch (error) {
			console.error("Error fetching hospital data:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData(formRef.current);
		const data = Object.fromEntries(formData.entries());
		const apiUrl = "/api/hospital-affiliation";

		submitForm(data, formRef, fetchData, apiUrl);
	};

	const getHospitalsByType = (type) => {
		return hospitalData?.filter((hospital) => hospital.type === type);
	};

	if (loading) {
		return <ClipLoader />; // Show the spinner while loading
	}

	return (
		<div className="w-full flex flex-col justify-center items-center gap-4">
			{/* Hospital Affiliations */}
			<HeadingLine title={"Hospital Affiliations"} />
			<p className="w-full">
				<span className="text-red-400">*</span> Required all fields are marked
				with red asterisk
			</p>

			{/* Admitting Privilages */}
			<div className="w-full flex flex-row justify-between items-center">
				<p className="w-full text-lg">Admitting Privilages</p>
				<Button
					title={"Add"}
					icon={<IoAddCircleOutline className="size-6" />}
					onClick={handleAffiliation}
				/>
			</div>

			{/* Display Admitting Privilages Form */}
			<div className="w-full flex flex-col justify-center items-center gap-4">
				{affiliation ? (
					<form
						onSubmit={handleSubmit}
						ref={formRef}
						className="w-full min-h-20 shadow-xl rounded-lg border-l-8 border-primary flex flex-col justify-start items-center gap-4 p-10"
					>
						<div className="w-full flex flex-wrap justify-start gap-4 items-start">
							<TextInput
								title={"Hospital Name"}
								width={"w-full"}
								name={"hospital_name"}
							/>
							<TextInput
								title={"Address 1"}
								width="w-[35%]"
								name={"address_line_1"}
							/>
							<TextInput
								title={"Address 2"}
								width={"w-[25%]"}
								required={false}
								name={"address_line_2"}
							/>
							<TextInput title={"City"} width={"w-[10%]"} name={"city"} />
							<Dropdown
								title={"State"}
								options={stateAbbreviations}
								width="w-[8%]"
								name={"state"}
							/>
							<ZipCodeInput
								title={"ZipCode"}
								width={"w-[8%]"}
								name={"zip_code"}
							/>
							<input type="hidden" value="Admitting Privilages" name={"type"} />
						</div>
						<SubmitButton />
					</form>
				) : (
					getHospitalsByType("Admitting Privilages")?.map((hospital) => (
						<div
							key={hospital.uuid}
							className="w-full h-24 shadow-xl rounded-lg border-l-8 border-primary flex flex-row justify-between items-center gap-4 p-10"
						>
							<p>{hospital.hospital_name}</p>
							<div className="flex flex-col justify-center items-start">
								<p>{hospital.address.address_line_1}</p>
								<p>
									{hospital.address.city}, {hospital.address.state}{" "}
									{hospital.address.zip}
								</p>
							</div>
							<div className="flex flex-row justify-center items-center gap-4">
								<CiEdit className="size-6 text-primary" />
								<MdDeleteOutline className="size-6 text-red-400" />
							</div>
						</div>
					))
				)}
			</div>

			{/* Admitting Arrangements */}
			<div className="w-full flex flex-row justify-between items-center mt-10">
				<p className="w-full text-lg">Admitting Arrangements</p>
				<Button
					title={"Add"}
					icon={<IoAddCircleOutline className="size-6" />}
					onClick={handleshowArrangements}
				/>
			</div>

			{/* Display Admitting Arrangements Form */}
			<div className="w-full flex flex-col justify-center items-center gap-4">
				{arrangements ? (
					<form
						onSubmit={handleSubmit}
						ref={formRef}
						className="w-full min-h-20 shadow-xl rounded-lg border-l-8 border-primary flex flex-col justify-start items-center gap-4 p-10"
					>
						<div className="w-full flex flex-wrap justify-start gap-4 items-start">
							<TextInput
								title={"Hospital Name"}
								width={"w-full"}
								name={"hospital_name"}
							/>
							<TextInput
								title={"Address 1"}
								width="w-[35%]"
								name={"address_line_1"}
							/>
							<TextInput
								title={"Address 2"}
								width={"w-[25%]"}
								required={false}
								name={"address_line_2"}
							/>
							<TextInput title={"City"} width={"w-[10%]"} name={"city"} />
							<Dropdown
								title={"State"}
								options={stateAbbreviations}
								width="w-[8%]"
								name={"state"}
							/>
							<ZipCodeInput
								title={"ZipCode"}
								width={"w-[8%]"}
								name={"zip_code"}
							/>
							<input
								type="hidden"
								value="Admitting Arrangements"
								name={"type"}
							/>
						</div>
						<SubmitButton />
					</form>
				) : (
					getHospitalsByType("Admitting Arrangements")?.map((hospital) => (
						<div
							key={hospital.uuid}
							className="w-full h-24 shadow-xl rounded-lg border-l-8 border-primary flex flex-row justify-between items-center gap-4 p-10"
						>
							<p>{hospital.hospital_name}</p>
							<div className="flex flex-col justify-center items-start">
								<p>{hospital.address.address_line_1}</p>
								<p>
									{hospital.address.city}, {hospital.address.state}{" "}
									{hospital.address.zip}
								</p>
							</div>
							<div className="flex flex-row justify-center items-center gap-4">
								<CiEdit className="size-6 text-primary" />
								<MdDeleteOutline className="size-6 text-red-400" />
							</div>
						</div>
					))
				)}
			</div>

			<NavBottom />
		</div>
	);
}

export default HospitalAffiliations;
