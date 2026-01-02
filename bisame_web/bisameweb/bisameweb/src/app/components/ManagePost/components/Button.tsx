import React from "react";

const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "muted";
  }
> = ({ children, variant = "primary", ...rest }) => {
  const base =
    "px-4 py-2 rounded text-sm font-medium focus:outline-none transition-colors";
  const v =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-gray-100 text-gray-800 hover:bg-gray-200";
  return (
    <button className={`${base} ${v}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
