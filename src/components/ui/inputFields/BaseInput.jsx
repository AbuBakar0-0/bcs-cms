"use client";

import { placeholder } from '@/utils/placeholders';
import { useState } from 'react';

const BaseInput = ({ title, required = true, readonly, type, formatInput, width = "w-1/5", labelColor ="text-black"}) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        let value = e.target.value;
        const formattedValue = formatInput ? formatInput(value) : value;
        setInputValue(formattedValue);
    };

    return (
        <div className={width}>
            <label className={`block mb-2 text-sm font-medium ${labelColor}`}>
                {title} {required ? <span className="text-red-500">*</span> : null}
            </label>
            <input
                type={type}
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-semibold"
                placeholder={placeholder({ title: title })}
                value={inputValue}
                onChange={handleInputChange}
                required={required}
                readOnly={readonly}
            />
        </div>
    );
};

export default BaseInput;
