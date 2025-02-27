import { Eye, EyeOff } from "lucide-react";
import React, { forwardRef, InputHTMLAttributes, useState } from "react";

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const EYE_COLOR = "#94A3B8";
const EYE_FOCUS_COLOR = "#10B981";
const ERROR_CLASS = "border-red-500";
const ERROR_TEXT_CLASS = "text-red-500";

export const InputForm = forwardRef<HTMLInputElement, InputFormProps>(
  ({ label, error, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="w-full">
        <label
          htmlFor={rest.id}
          className="block text-sm font-medium text-label"
        >
          {label}
        </label>
        <div className="relative w-full">
          <input
            ref={ref}
            {...rest}
            type={
              rest.type === "password" && !showPassword ? "password" : "text"
            }
            className={`mt-1 block w-full ${rest.type === "password" ? "pl-3 pr-10" : "px-3"} py-2 border border-input-border rounded-md shadow-sm focus:outline-none focus:text-Heading/H1-main focus:border-Heading/H1-main ${error ? ERROR_CLASS : ""} placeholder:text-placeholder bg-input-background`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {rest.type === "password" && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              {showPassword ? (
                <EyeOff
                  color={isFocused ? EYE_FOCUS_COLOR : EYE_COLOR}
                  size={20}
                />
              ) : (
                <Eye
                  color={isFocused ? EYE_FOCUS_COLOR : EYE_COLOR}
                  size={20}
                />
              )}
            </button>
          )}
        </div>
        {error && <p className={`${ERROR_TEXT_CLASS} text-sm`}>{error}</p>}
      </div>
    );
  },
);

InputForm.displayName = "InputForm";
