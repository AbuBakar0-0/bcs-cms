"use client";

import { useState } from "react";
import TextInput from "./TextInput";

const Dropdown = ({ title, options, width = "w-1/5", required = true }) => {
    const isTaxonomy = title.toLowerCase().includes("taxonomy");

    const [other,setOther]=useState(false);
    const handleOther=(e)=>{
        setOther(false);
        if(e.target.value=="Other"){
            setOther(true);
        }
        
    }

    return (
        <div className={`flex flex-col gap-2 ${width}`}>
            <label className="block text-sm font-medium text-black">
                {title} {required ? <span className="text-red-500">*</span> : null}
            </label>
            <select onChange={handleOther} className="border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:border-blue-500">
                {options.map((option, index) => (
                    <option key={index} value={isTaxonomy ? option.code : option}>
                        {isTaxonomy ? `${option.code} : ${option.name}` : option}
                    </option>
                ))}
            </select>
            {other?<TextInput title={"Please Specify"} width={"w-full"}/>:<></>}
        </div>
    );
};

export default Dropdown;
