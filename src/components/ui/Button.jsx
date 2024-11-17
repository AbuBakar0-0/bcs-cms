"use client";

import React from "react";

const Button = ({ title, onClick, icon }) => {
    return (
        <button
            onClick={() => onClick && onClick()} // Ensure onClick is defined
            className="bg-secondary px-4 py-3 rounded-lg text-white flex flex-row justify-center items-center gap-4"
        >
            {icon}
            <p>{title}</p>
        </button>
    );
};

export default Button;
