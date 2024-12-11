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
	const [searchQuery, setSearchQuery] = useState("");
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	// Filter options based on the search query
	const filteredOptions = options.filter((option) =>
		isTaxonomy
			? `${option.code} : ${option.name}`
					.toLowerCase()
					.includes(searchQuery.toLowerCase())
			: option.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleSelection = (selectedValue) => {
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

		setIsDropdownOpen(false); // Close the dropdown
	};

	const handleOtherChange = (e) => {
		if (onChange) {
			onChange({
				target: { name, value: e.target.value },
			});
		}
	};

	const toggleDropdown = () => {
		setIsDropdownOpen((prev) => !prev);
	};

	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
	};

	// Get the display value for the selected option
	const getDisplayValue = () => {
		if (isTaxonomy && value) {
			const selectedOption = options.find(
				(option) => option.code === value || option.name === value
			);
			return selectedOption
				? `${selectedOption.code} : ${selectedOption.name}`
				: `Select ${title}`;
		}
		return value || `Select ${title}`;
	};

	return (
		<div className={`relative flex flex-col gap-2 ${width}`}>
			<label className="block text-sm font-medium text-black">
				{title} {required ? <span className="text-red-500">*</span> : null}
			</label>
			<div
				className="border border-gray-300 rounded px-3 py-2 text-gray-700 relative cursor-pointer"
				onClick={toggleDropdown}
			>
				{getDisplayValue()}
			</div>
			{isDropdownOpen && (
				<div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded mt-1 shadow-lg z-10">
					<input
						type="text"
						placeholder="Search..."
						value={searchQuery}
						onChange={handleSearch}
						className="border-b border-gray-300 w-full px-3 py-2 text-gray-700 focus:outline-none"
					/>
					<ul className="max-h-40 overflow-y-auto">
						{filteredOptions.map((option, index) => (
							<li
								key={index}
								onClick={() =>
									handleSelection(isTaxonomy ? option.code : option)
								}
								className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
							>
								{isTaxonomy
									? `${option.code} : ${option.name}`
									: option}
							</li>
						))}
						{filteredOptions.length === 0 && (
							<li className="px-3 py-2 text-gray-500">No options found</li>
						)}
					</ul>
				</div>
			)}
			{showOther ? (
				<TextInput
					title={"Please Specify"}
					width={"w-full"}
					onChange={handleOtherChange}
					name={`${name}-other`}
				/>
			) : null}
		</div>
	);
};

export default Dropdown;
