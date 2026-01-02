"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface CheckboxInputProps {
  label: string;
  placeholder: string;
  options: string[];
  inputName: string;
  value?: string[];
  handleCheckboxInputChange: (
    field: string,
    value: string[], // Changed to string[] instead of string
    event?: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  label,
  placeholder,
  options,
  inputName,
  value,
  handleCheckboxInputChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const checkedValues = Array.isArray(value) ? value : [];

  console.log(checkedValues);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Add this new handler for checkbox changes
  const handleCheckboxChange = (
    option: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValues = checkedValues.includes(option)
      ? checkedValues.filter((item) => item !== option) // Remove if already checked
      : [...checkedValues, option]; // Add if not checked

    handleCheckboxInputChange(inputName, newValues, event);
  };

  return (
    <div className="relative col-span-2 flex flex-col" ref={dropdownRef}>
      <label htmlFor={label} className="text-gray-500">
        {label}
      </label>

      <button
        type="button"
        className="w-full border rounded-md text-base font-normal p-2 flex items-center justify-between transition-all duration-200 min-h-[48px]
        border-blue-300 text-[#6b8ba6] bg-white hover:border-blue-400 hover:bg-blue-50 hover:shadow-md transform hover:-translate-y-0.5 cursor-pointer relative"
        onClick={handleToggleDropdown}
      >
        {checkedValues.length > 0 && (
          <span className="flex">
            {checkedValues.slice(0, 4).map((item: string, index: number) => {
              return (
                <span
                  key={index}
                  className="flex items-center bg-blue-100 text-blue-700 border border-blue-300 rounded-full px-2 py-0.5 text-xs mr-1 whitespace-nowrap max-w-[90px] overflow-hidden text-ellipsis"
                  style={{ maxWidth: "90px" }}
                >
                  <span className="truncate">{item}</span>
                </span>
              );
            })}
            {checkedValues.length > 4 && (
              <span className="text-xs text-[#6b8ba6] whitespace-nowrap">
                +{checkedValues.length - 4} more
              </span>
            )}
          </span>
        )}

        {checkedValues.length === 0 && placeholder}

        <MdKeyboardArrowDown
          className={`transition-all absolute right-3 duration-400 ease-in ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute w-full h-auto overflow-hidden z-[99] bg-white top-20 flex flex-col justify-center divide-y-2 border border-blue-300 rounded-xl">
          {options.map((option) => (
            <label
              key={option}
              className="p-2 cursor-pointer hover:bg-blue-50 flex items-center"
            >
              <input
                type="checkbox"
                name={inputName}
                value={option}
                checked={checkedValues.includes(option)}
                onChange={(event) => handleCheckboxChange(option, event)}
                className="mr-2 accent-blue-500"
              />
              <span className="text-[#6b8ba6] cursor-pointer">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckboxInput;
