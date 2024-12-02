"use client";

const BaseInput = ({
  title,
  required = true,
  readonly = false,
  type,
  formatInput,
  width = "w-1/5",
  labelColor = "text-black",
  value,
  onChange,
  is_number = false,
  name,
  placeholder,
  minLength = 0,
  maxLength = 100,
}) => {
  const handleInputChange = (e) => {
    let inputValue = e.target.value;

    // Prevent alphanumeric input if `is_number` is true
    if (is_number) {
      inputValue = inputValue.replace(/[^0-9]/g, ""); // Allow only numbers
    }

    if (formatInput) {
      inputValue = formatInput(inputValue);
    }

    if (onChange) {
      onChange({
        target: {
          name: name || title.toLowerCase(),
          value: inputValue,
        },
      });
    }
  };

  return (
    <div className={width}>
      <label className={`block mb-2 text-sm font-medium ${labelColor}`}>
        {title} {required ? <span className="text-red-500">*</span> : null}
      </label>
      <input
        type={type}
        className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-semibold"
        value={value}
        placeholder={placeholder}
        onChange={handleInputChange}
        required={required}
        readOnly={readonly}
        name={name}
        minLength={minLength}
        maxLength={maxLength}
      />
    </div>
  );
};

export default BaseInput;
