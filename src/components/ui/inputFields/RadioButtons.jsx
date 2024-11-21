import React from "react";

const RadioButton = ({ title, options, required = true,name,width="w-1/6" }) => {
    return (
        <div className={width}>
            <label htmlFor={title} className="gap-2 flex flex-row mb-2 text-sm font-medium text-black">
                {title} {required ? <span className="text-red-500">*</span> : null}
            </label>
            <div className="w-full flex flex-row justify-start items-center gap-4">
                {options.map((option, index) => (
                    <div key={index} className="flex items-center">
                        <input
                            type="radio"
                            id={option}
                            name={name}
                            value={option}
                            className="mr-2"
                            required={required}
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
