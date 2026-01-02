import React from "react";

interface SelectOptionProps {
  name: string;
  inputName?: string;
  options: string[];
  placeholder?: string;
  handleNameChange: (name: string, value: string) => void;
}

const SelectOption = ({
  name,
  inputName,
  handleNameChange,
  options,
  placeholder,
}: SelectOptionProps) => {
  return (
    <>
      <div className="relative md:space-y-2">
        <label htmlFor={name} className="text-gray-500 text-sm lg:text-base">
          {name[0].toUpperCase() + name.slice(1)}
        </label>
        <select
          name={inputName}
          required
          className="w-full border border-blue-300 rounded-lg p-2 text-[#7a9ebd] placeholder-[#7a9ebd] focus:outline-none focus:ring-1 focus:ring-blue-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 text-xs md:text-sm lg:text-base"
          aria-required="true"
          onChange={(e) => {
            handleNameChange(e.target.name, e.target.value);
          }}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SelectOption;
