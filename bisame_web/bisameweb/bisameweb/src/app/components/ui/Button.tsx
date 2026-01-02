"use client";
import React from "react";

interface ButtonProps {
  icon?: React.ReactNode;
  label: string;
  styles?: string;
  isDisabled?: boolean;
  type?: "reset" | "submit" | "button";
  action?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  icon,
  label,
  styles,
  isDisabled,
  type,
  action,
}) => {
  return (
    <button
      className={`${styles} ${isDisabled ? "cursor-not-allowed" : ""}`}
      type={type}
      onClick={action}
      disabled={isDisabled}
    >
      <span>{icon}</span>
      {label}
    </button>
  );
};

export default Button;
