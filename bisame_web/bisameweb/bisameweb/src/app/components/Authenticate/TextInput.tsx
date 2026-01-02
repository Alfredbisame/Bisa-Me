import React from "react";

interface TextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  optional?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
  optional = false,
}) => (
  <div className="mb-4">
    <label className="block text-blue-600 text-sm font-semibold mb-2" htmlFor={id}>
      {label} {optional && "(optional)"}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="border rounded px-3 py-2 w-full text-sm text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      placeholder={placeholder}
      required={required}
      disabled={disabled}
    />
  </div>
);

export default TextInput; 