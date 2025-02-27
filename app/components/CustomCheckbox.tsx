// components/CustomCheckbox.tsx
import React from "react";
import { CheckSquare, Square } from "lucide-react";

interface CustomCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className="focus:outline-none"
      >
        {checked ? (
          <CheckSquare className="w-6 h-6 text-Checkbox/Checked" />
        ) : (
          <Square className="w-6 h-6 rounded-none text-Checkbox/Unchecked bg-Checkbox/Unchecked" />
        )}
      </button>
      <label htmlFor={id} className="ml-2 block text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
};
