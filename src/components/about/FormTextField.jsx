import React from 'react';

const FormTextField = ({ title, label, required = true, type = "text", value, onChange }) => {
    let placeholder = title;

    // Formatting function for phone number
    const formatPhoneNumber = (value) => {
        value = value.replace(/\D/g, ''); // Remove non-numeric characters
        if (value.length > 3 && value.length <= 6) {
            return `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else if (value.length > 6) {
            return `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
        return value;
    };

    const handleInputChange = (e) => {
        let newValue = e.target.value;
        if (title === "Phone Number") {
            newValue = formatPhoneNumber(newValue);
        }
        onChange(label, newValue); // Call parent’s onChange with label and new value
    };

    if (title === "Phone Number") {
        placeholder = "(XXX) XXX-XXXX";
    }
    if (title === "Email Address") {
        placeholder = "yourname@company.com";
        type = "email";
    }

    // List of practice types
    const practiceTypes = [
        "Private Practice",
        "Group practice",
        "ASC (Ambulatory surgical center)",
        "Home Health Agency",
        "Independent Lab",
        "Pharmacy",
        "Behavioral Health",
        "Hospice and Palliative Care",
        "Urgent Care",
        "FQHC",
        "Other"
    ];

    // List of providers options
    const providerOptions = [
        "1-5",
        "6-10",
        "11-15",
        "16-20",
        "21-25",
        "26-30",
        "31-35",
        "36-40",
        "41-45",
        "46-50"
    ];

    return (
        <div className="w-full">
            <label htmlFor={label} className="block mb-2 text-sm font-semibold text-black">
                {title} {required ? <span className="text-red-500">*</span> : null}
            </label>
            {/* Conditionally render the select dropdown for "Practice Type" */}
            {title === "Practice Type" ? (
                <select
                    id={label}
                    name={label}
                    value={value}
                    onChange={(e) => onChange(label, e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-semibold"
                >
                    <option value="">Select a Practice Type</option>
                    {practiceTypes.map((type, index) => (
                        <option key={index} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            ) : title === "No. of Providers" ? (
                <select
                    id={label}
                    name={label}
                    value={value}
                    onChange={(e) => onChange(label, e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-semibold"
                >
                    <option value="">Select No. of Providers</option>
                    {providerOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    id={label}
                    name={label}
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-semibold"
                    placeholder={placeholder}
                    required={required}
                    value={value || ""}
                    onChange={handleInputChange}
                />
            )}
        </div>
    );
};

export default FormTextField;
