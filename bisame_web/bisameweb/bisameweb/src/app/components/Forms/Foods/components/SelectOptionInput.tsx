import React from "react";

interface SelectOptionProps {
  name: string;
  options: string[];
  handleNameChange: (name: string, value: string) => void;
}

const SelectOptionInput: React.FC<SelectOptionProps> = ({
  name,
  options,
  handleNameChange,
}) => {
  return (
    <div className="relative space-y-2">
      <label htmlFor={name} className="text-blue-700 font-semibold">
        {name[0].toUpperCase() + name.slice(1)}
      </label>
      <select
        name={name}
        className="w-full border border-blue-300 rounded-md p-2 text-[#7a9ebd] placeholder-[#7a9ebd] focus:outline-none focus:ring-1 focus:ring-blue-300 hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 "
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
