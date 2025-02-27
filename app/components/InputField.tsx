import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type InputFieldProps = {
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: () => void;
};

const InputField = ({
  type = "text",
  placeholder,
  value,
  onChange,
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative w-full">
      <input
        type={type === "password" && !showPassword ? "password" : "text"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-lg p-2 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-green-300 text-gray-600"
      />
      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
};

export default InputField;
