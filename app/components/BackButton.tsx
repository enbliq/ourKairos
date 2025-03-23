import React from "react";
import { ChevronLeft } from "lucide-react";

interface BackButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "expired" | "createCapsule";
  showIcon?: boolean;
  text?: string;
}

const BackButton = React.forwardRef<HTMLButtonElement, BackButtonProps>(
  (
    { variant, showIcon = true, text = "Back", className = "", ...props },
    ref,
  ) => {
    const baseStyles =
      "px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2";

    const variants = {
      expired: "bg-red-600 hover:bg-red-700 text-white",
      createCapsule: "bg-blue-600 hover:bg-blue-700 text-white",
    };

    return (
      <button
        ref={ref}
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${className}
        `}
        aria-label={text}
        type="button"
        {...props}
      >
        {showIcon && <ChevronLeft className="w-5 h-5" />}
        <span>{text}</span>
      </button>
    );
  },
);

BackButton.displayName = "BackButton";
export default BackButton;
