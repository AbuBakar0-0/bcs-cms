"use client";

import React from "react";

const Button = ({ title, onClick, icon, style = "solid", width = "w-52", disabled = false }) => {
    let type = "";
    if (style == "outline") {
        type = "border-2 border-primary rounded-lg text-black"
    }
    else if (style == 'solid') {
        type = "text-white rounded-lg"
    }
    return (
        <button
            disabled={disabled}
            onClick={(e) => onClick && onClick(e)} // Ensure onClick is defined
            className={`${width} ${type} px-4 py-3 flex flex-row justify-center items-center gap-4 ${disabled?"bg-gray-400":"bg-secondary"}`}
        >
            {icon}
            <p>{title}</p>
        </button>
    );
};

export default Button;
