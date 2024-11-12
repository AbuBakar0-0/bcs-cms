import React from "react";

const Dropdown = ({ title, options, width = "w-[32%]", required = true }) => {
    return (
        <div className={`flex flex-col gap-2 ${width}`}>
            <label className="block text-sm font-medium text-black">
                {title} {required ? <span className="text-red-500">*</span> : null}
            </label>
            <select className="border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:border-blue-500">
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
