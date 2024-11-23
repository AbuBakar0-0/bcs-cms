"use client";

import React from "react";

const Button = ({ title, onClick, icon, disabled }) => {
	return (
		<button
			disabled={disabled}
			onClick={(e) => onClick && onClick(e)} // Ensure onClick is defined
			className="bg-secondary px-4 py-3 rounded-lg text-white flex flex-row justify-center items-center gap-4"
		>
			{icon}
			<p>{title}</p>
		</button>
	);
};

export default Button;
