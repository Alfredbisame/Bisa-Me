import React from "react";

const Label: React.FC<{ children?: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <label
    className={`block text-sm font-medium text-gray-700 ${className || ""}`}
  >
    {children}
  </label>
);

export default Label;
