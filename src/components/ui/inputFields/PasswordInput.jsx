import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import BaseInput from "./BaseInput";

const PasswordInput = ({
  title,
  required,
  readonly,
  width="w-[36%]",
  value,
  onChange,
  name,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div  className={`relative ${width}`}>
      <BaseInput
        title={title}
        placeholder="Enter your password"
        required={required}
        readonly={readonly}
        type={showPassword ? "text" : "password"}
        width="100%"
        value={value}
        onChange={onChange}
        name={name}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        style={{
          position: "absolute",
          right: "10px",
          top: "70%",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0",
          height: "100%",
        }}
      >
        {showPassword ? (
          <AiOutlineEyeInvisible size={20} />
        ) : (
          <AiOutlineEye size={20} />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
