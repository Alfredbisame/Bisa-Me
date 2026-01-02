import React from "react";
import CarLoadingSpinner from "../Forms/Cars/CarLoadingSpinner";

interface CategoryFormButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const CategoryFormButton: React.FC<CategoryFormButtonProps> = ({
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  children,
  onClick,
  className = "",
}) => {
  const baseClasses =
    "font-semibold rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-orange-400",
    secondary:
      "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-blue-400",
    outline:
      "border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 focus:ring-blue-400",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const disabledClasses =
    "opacity-50 cursor-not-allowed transform-none hover:shadow-none";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled || loading ? disabledClasses : ""}
        ${className}
      `}
    >
      {loading && <CarLoadingSpinner size="sm" color="teal" />}
      <span>{children}</span>
    </button>
  );
};

export default CategoryFormButton;
