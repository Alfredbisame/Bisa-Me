import React from "react";

interface SelectOptionProps {
  name: string;
  options: string[];
  styles?: string;
  handleNameChange: (name: string, value: string) => void;
}

const SelectOptionInput: React.FC<SelectOptionProps> = ({
  name,
  options,
  styles,
  handleNameChange,
}) => {
  return (
    <div className={`relative md:space-y-1 text-sm md:text-base ${styles}`}>
      <label htmlFor={name} className="text-gray-500">
        {name[0].toUpperCase() + name.slice(1)}
      </label>
      <select
        name={name}
        className="w-full border border-blue-300 rounded-lg p-2 text-[#7a9ebd] placeholder-[#7a9ebd] focus:outline-none focus:ring-1 focus:ring-blue-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
        aria-required="true"
        onChange={(e) => handleNameChange(e.target.name, e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectOptionInput;
