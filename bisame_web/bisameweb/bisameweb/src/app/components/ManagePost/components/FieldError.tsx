import React from "react";

const FieldError: React.FC<{ children?: React.ReactNode }> = ({ children }) =>
  children ? <p className="text-xs text-red-500 mt-1">{children}</p> : null;

export default FieldError;
