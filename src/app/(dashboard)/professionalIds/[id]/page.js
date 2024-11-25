"use client";
import { useRef, useCallback, useState } from "react";
import Button from "@/components/ui/Button";
import HeadingLine from "@/components/ui/HeadingLine";
import DateInput from "@/components/ui/inputFields/DateInput";
import Dropdown from "@/components/ui/inputFields/DropDown";
import PasswordInput from "@/components/ui/inputFields/PasswordInput";
import RadioButton from "@/components/ui/inputFields/RadioButtons";
import TextInput from "@/components/ui/inputFields/TextInput";
import NavBottom from "@/components/ui/NavBottom";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import { CiLink } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { CgTrash } from "react-icons/cg";
import toast from "react-hot-toast";
import { useEffect } from "react";

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const ProfessionalIds = () => {
	const [_, setForceUpdate] = useState({});
	const [disabledFields, setDisabledFields] = useState({});

	const formRef = useRef(null);
	const entriesRef = useRef({
		medicare: [{}],
		medicaid: [{}],
		stateLicense: [{}],
		clia: [{}],
		dea: [{}],
		cds: [{}],
	});
	const handleDropdownChange = (e) => {
		const { name, value } = e.target;
		setDisabledFields((prev) => ({
			...prev,
			[name]: value === "No",
		}));
		console.log("Dropdown changed:", name, value);
	};
	const handleAddField = (field, e) => {
		e.preventDefault();
		const newIndex = entriesRef.current[field].length;
		const dropdownName = `${field}[${newIndex}].has${capitalize(field)}`;
		entriesRef.current[field].push({});
		setDisabledFields((prev) => ({
			...prev,
			[dropdownName]: true,
		}));
		setForceUpdate({});
	};

	const handleRemoveField = (field, index) => {
		entriesRef.current[field].splice(index, 1);
		setForceUpdate({});
	};

	const validateForm = (formData) => {
		const requiredFields = ["npi1", "taxId"];
		const missingFields = [];

		requiredFields.forEach((field) => {
			if (!formData.get(field)) {
				missingFields.push(field);
			}
		});

		return missingFields;
	};

	const transformFormData = (formData) => {
		const arrayFields = [
			"medicare",
			"medicaid",
			"stateLicense",
			"clia",
			"dea",
			"cds",
		];
		const data = {};

		// Handle basic fields
		formData.forEach((value, key) => {
			if (!key.includes("[")) {
				data[key] = value;
			}
		});

		// Handle array fields
		arrayFields.forEach((field) => {
			data[field] = entriesRef.current[field].map((_, index) => ({
				number: formData.get(`${field}[${index}].number`) || "",
				state:
					formData.get(`${field}[${index}].state`) || stateAbbreviations[0],
				effectiveDate: formData.get(`${field}[${index}].effectiveDate`) || "",
				expiryDate: formData.get(`${field}[${index}].expiryDate`) || "",
				[`has${capitalize(field)}`]:
					formData.get(`${field}[${index}].has${capitalize(field)}`) || "No",
			}));
		});

		return data;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(formRef.current);

		const missingFields = validateForm(formData);
		if (missingFields.length > 0) {
			toast.error(`Required fields missing: ${missingFields.join(", ")}`);
			return;
		}

		const transformedData = transformFormData(formData);

		try {
			const response = await fetch("/api/professional-ids", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(transformedData),
			});

			if (!response.ok) throw new Error("Failed to save");
			toast.success("Professional information saved successfully!");
		} catch (error) {
			console.error("Error:", error);
			toast.error("Failed to save. Please try again.");
		}
	};

	// const renderMultiEntryField = (field, title, numberLabel) => (
	// 	<>
	// 		{entriesRef.current[field].map((_, index) => {
	// 			const dropdownName = `${field}[${index}].has${capitalize(field)}`;
	// 			const isDisabled = disabledFields[dropdownName];
	// 			return (
	// 				<div
	// 					className="w-full flex flex-wrap justify-start items-end gap-4"
	// 					key={index}
	// 				>
	// 					<Dropdown
	// 						title={`Do you have ${title}?`}
	// 						options={["Yes", "No"]}
	// 						width="w-1/6"
	// 						name={dropdownName}
	// 						defaultValue="No"
	// 						onChange={handleDropdownChange}
	// 					/>
	// 					<TextInput
	// 						title={numberLabel}
	// 						width="w-1/6"
	// 						name={`${field}[${index}].number`}
	// 						disabled={formRef.current?.[dropdownId]?.value === "No"}
	// 					/>
	// 					<Dropdown
	// 						title="Issue State"
	// 						options={stateAbbreviations}
	// 						width="w-1/12"
	// 						name={`${field}[${index}].state`}
	// 						defaultValue={stateAbbreviations[0]}
	// 						disabled={formRef.current?.[dropdownId]?.value === "No"}
	// 					/>
	// 					<DateInput
	// 						title="Effective Date"
	// 						width="w-1/5"
	// 						name={`${field}[${index}].effectiveDate`}
	// 						disabled={formRef.current?.[dropdownId]?.value === "No"}
	// 					/>
	// 					<DateInput
	// 						title="Expiry Date"
	// 						width="w-1/5"
	// 						name={`${field}[${index}].expiryDate`}
	// 						disabled={formRef.current?.[dropdownId]?.value === "No"}
	// 					/>
	// 					<div className="flex gap-2">
	// 						<Button
	// 							title="Add"
	// 							onClick={(e) => handleAddField(field, e)}
	// 							icon={<IoAddCircleOutline className="size-6" />}
	// 							className="bg-secondary text-white"
	// 							type="button"
	// 						/>
	// 						{index > 0 && (
	// 							<Button
	// 								title="delete"
	// 								icon={<CgTrash className="size-6" />}
	// 								onClick={() => handleRemoveField(field, index)}
	// 								type="button"
	// 							/>
	// 						)}
	// 					</div>
	// 				</div>
	// 			);
	// 		})}
	// 	</>
	// );
	const renderMultiEntryField = (field, title, numberLabel) => (
		<>
			{entriesRef.current[field].map((_, index) => {
				const dropdownName = `${field}[${index}].has${capitalize(field)}`;
				const isDisabled = disabledFields[dropdownName];

				return (
					<div
						className="w-full flex flex-wrap justify-start items-end gap-4"
						key={index}
					>
						<Dropdown
							title={`Do you have ${title}?`}
							options={["Yes", "No"]}
							width="w-1/6"
							name={dropdownName}
							defaultValue="No"
							onChange={handleDropdownChange}
						/>
						<TextInput
							title={numberLabel}
							width="w-1/6"
							name={`${field}[${index}].number`}
							readonly={isDisabled}
						/>
						<Dropdown
							title="Issue State"
							options={stateAbbreviations}
							width="w-1/12"
							name={`${field}[${index}].state`}
							defaultValue={stateAbbreviations[0]}
						/>
						<DateInput
							title="Effective Date"
							width="w-1/5"
							name={`${field}[${index}].effectiveDate`}
							readonly={isDisabled}
						/>
						<DateInput
							title="Expiry Date"
							width="w-1/5"
							name={`${field}[${index}].expiryDate`}
							readonly={isDisabled}
						/>
						<div className="flex gap-2">
							<Button
								title="Add"
								onClick={(e) => handleAddField(field, e)}
								icon={<IoAddCircleOutline className="size-6" />}
								className="bg-secondary text-white"
								type="button"
							/>
							{index > 0 && (
								<Button
									title="delete"
									icon={<CgTrash className="size-6" />}
									onClick={() => handleRemoveField(field, index)}
									type="button"
								/>
							)}
						</div>
					</div>
				);
			})}
		</>
	);
	const renderInsuranceSection = (prefix, title) => (
		<>
			<div className="text-lg w-full">{title}</div>
			<div className="w-full flex flex-wrap justify-start gap-4 items-start">
				<TextInput
					title="Policy #"
					width="w-[23.9%]"
					name={`${prefix}PolicyNumber`}
				/>
				<DateInput
					title="Effective Date"
					width="w-[23.9%]"
					name={`${prefix}EffectiveDate`}
				/>
				<DateInput
					title="Expiry Date"
					width="w-[23.9%]"
					name={`${prefix}ExpiryDate`}
				/>
				<Dropdown
					title="Aggregate"
					width="w-[23.9%]"
					options={[
						"1,000,000 - 2,000,000",
						"1,000,000 - 3,000,000",
						"2,000,000 - 4,000,000",
					]}
					name={`${prefix}Aggregate`}
				/>
			</div>
		</>
	);

	const renderPortalCredentials = (prefix, title, link) => (
		<div className="w-full flex flex-wrap justify-start gap-4 items-end">
			{prefix === "caqh" && (
				<TextInput
					title="CAQH User Id"
					width="w-[30.8%]"
					name={`${prefix}UserId`}
				/>
			)}
			<TextInput
				title={`${title} Username`}
				width={prefix === "caqh" ? "w-[30.8%]" : "w-[46.9%]"}
				name={`${prefix}Username`}
			/>
			<PasswordInput
				title={`${title} Password`}
				width={prefix === "caqh" ? "w-[30.8%]" : "w-[46.9%]"}
				name={`${prefix}Password`}
			/>
			{link && (
				<a
					href={link}
					className="bg-secondary text-white size-10 flex justify-center items-center rounded-lg"
				>
					<CiLink className="size-8" />
				</a>
			)}
		</div>
	);

	return (
		<form
			ref={formRef}
			onSubmit={handleSubmit}
			className="w-full flex flex-col justify-center items-center gap-4"
		>
			<HeadingLine title="Professional Information" />

			<div className="w-full flex flex-wrap justify-start gap-4 items-end">
				<Dropdown
					title="Do you have an individual NPI #"
					options={["Yes", "No"]}
					width="w-1/5"
					name="hasNPI"
					defaultValue="No"
				/>
				<TextInput
					title="NPI 1 (if applicable)"
					width="w-[1/12]"
					required={true}
					name="npi1"
				/>
				<TextInput
					title="NPI 2 (if applicable)"
					width="w-[1/12]"
					required={false}
					name="npi2"
				/>
				<TextInput title="Tax ID #" name="taxId" required={true} />
				<TextInput title="UPIN #" name="upin" />
			</div>

			{renderMultiEntryField("medicare", "Medicare", "Ind. Medicare PTAN #")}
			{renderMultiEntryField("medicaid", "Medicaid", "Ind. Medicaid #")}
			{renderMultiEntryField(
				"stateLicense",
				"State License",
				"State License #"
			)}
			{renderMultiEntryField("clia", "CLIA", "Ind. CLIA #")}
			{renderMultiEntryField("dea", "DEA", "Ind. DEA #")}
			{renderMultiEntryField("cds", "CDS", "Ind. CDS #")}

			<HeadingLine title="Medical Malpractice Information" />

			{renderInsuranceSection(
				"professionalLiability",
				"Professional Liability Insurance"
			)}
			{renderInsuranceSection(
				"generalLiability",
				"General Liability Insurance"
			)}

			<HeadingLine title="Web Portal Info" />

			{renderPortalCredentials(
				"caqh",
				"CAQH",
				"https://proview.caqh.org/Login/Index?ReturnUrl=%2fpo"
			)}
			{renderPortalCredentials(
				"pecos",
				"Pecos",
				"https://pecos.cms.hhs.gov/pecos/login.do#headingLv1"
			)}
			{renderPortalCredentials(
				"uhc",
				"UHC",
				"https://www.uhcprovider.com/en/resource-library/provider-portal-resources.html"
			)}
			{renderPortalCredentials(
				"optum",
				"Optum",
				"https://www.uhcprovider.com/en/resource-library/provider-portal-resources.html"
			)}
			{renderPortalCredentials(
				"availity",
				"Availity",
				"https://apps.availity.com/web/onboarding/availity-fr-ui/#/login"
			)}
			{renderPortalCredentials("medicaid", "Medicaid")}

			<NavBottom onSave={handleSubmit} />
		</form>
	);
};

export default ProfessionalIds;
