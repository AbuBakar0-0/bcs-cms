"use client";

import { useState } from "react";
import TextInput from "./TextInput";

const Dropdown = ({
	title,
	options,
	width = "w-1/5",
	required = true,
	onChange,
	name,
	value,
}) => {
	const isTaxonomy = title.toLowerCase().includes("taxonomy");

	const [showOther, setShowOther] = useState(false);
	const handleChange = (e) => {
		const selectedValue = e.target.value;

		if (selectedValue === "Other") {
			setShowOther(true);
		} else {
			setShowOther(false);
		}

		if (onChange) {
			onChange({
				target: { name, value: selectedValue },
			});
		}
	};

	const handleOtherChange = (e) => {
		if (onChange) {
			onChange({
				target: { name, value: e.target.value },
			});
		}
	};
	
	return (
		<div className={`flex flex-col gap-2 ${width}`}>
			<label className="block text-sm font-medium text-black">
				{title} {required ? <span className="text-red-500">*</span> : null}
			</label>
			<select
				name={name}
				value={value}
				onChange={handleChange}
				className="border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
			>
				{options.map((option, index) => (
					<option key={index} value={isTaxonomy ? option.code : option}>
						{isTaxonomy ? `${option.code} : ${option.name}` : option}
					</option>
				))}
			</select>
			{showOther ? (
				<TextInput
					title={"Please Specify"}
					width={"w-full"}
					onChange={handleOtherChange}
					name={`${name}-other`}
				/>
			) : (
				<></>
			)}
		</div>
	);
};

export default Dropdown;
