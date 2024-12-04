"use client";

import { useEffect, useState } from "react";
import BaseInput from "./BaseInput";

const DateInput = ({
  title,
  required,
  width = "w-1/8",
  value,
  onChange,
  name,
}) => {
  const [clientDate, setClientDate] = useState(null);

  useEffect(() => {
    setClientDate(new Date());
  }, []);

  const handleChange = (e) => {
    // Get the raw date input value
    const rawValue = e.target.value;

    // Trigger the onChange handler with the raw value (no formatting)
    onChange({ target: { name: name, value: rawValue } });
  };

  if (clientDate === null) {
    return <div>Loading...</div>;
  }

  // Set the maximum date to 2050-12-31
  const maxDate = "2050-12-31";

  return (
    <BaseInput
      title={title}
      type="date"
      required={required}
      value={value || ""}
      onChange={handleChange}
      width={width}
      name={name}
      max={maxDate} // Pass maxDate to BaseInput
    />
  );
};

export default DateInput;
