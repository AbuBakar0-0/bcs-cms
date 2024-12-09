"use client";

import React from "react";

const Button = ({ title, onClick, icon, style="solid" }) => {
    let type = "";
    if (style == "outline") {
        type = "border-2 border-primary rounded-lg text-black"
    }
    else if (style == 'solid') {
        type = "bg-secondary text-white rounded-lg"
    }
    return (
        <button
            onClick={(e) => onClick && onClick(e)} // Ensure onClick is defined
            className={`w-52 ${type} px-4 py-3 flex flex-row justify-center items-center gap-4`}
        >
            {icon}
            <p>{title}</p>
        </button>
    );
};

export default Button;
