import React from "react";

const Checkbox = ({ title, options }) => {
  return (
    <div className="w-1/5">
      <label htmlFor={title} className="block mb-2 text-sm font-medium text-black">
        {title}
      </label>
      <div className="w-full flex flex-col gap-2">
        {options.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              type="checkbox"
              id={option}
              name={title}
              value={option}
              className="mr-2"
            />
            <label htmlFor={option} className="text-sm">
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checkbox;
