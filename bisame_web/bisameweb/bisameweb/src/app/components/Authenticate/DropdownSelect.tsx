import React from "react";
import { FaChevronDown } from "react-icons/fa";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: DropdownOption[];
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  required = false,
  disabled = false,
}) => (
  <div className="mb-4">
    <label className="block text-blue-600  text-sm font-semibold mb-2" htmlFor={id}>
      {label}
    </label>
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="border rounded px-3 py-2 w-full text-gray-700 text-sm leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none pr-10"
        required={required}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
        <FaChevronDown className="text-gray-500" />
      </div>
    </div>
  </div>
);

export default DropdownSelect;
