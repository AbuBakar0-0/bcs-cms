import React from "react";

const RadioButton = ({ title, options, required = true }) => {
    return (
        <div className="w-1/5">
            <label htmlFor={title} className="block mb-2 text-sm font-medium text-black">
                {title} {required ? <span className="text-red-500">*</span> : null}
            </label>
            <div className="w-full flex flex-row justify-start items-center gap-4">
                {options.map((option, index) => (
                    <div key={index} className="flex items-center">
                        <input
                            type="radio"
                            id={option}
                            name={title}
                            value={option}
                            className="mr-2"
                        />
                        <label htmlFor={title} className="text-sm">
                            {option}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RadioButton;
