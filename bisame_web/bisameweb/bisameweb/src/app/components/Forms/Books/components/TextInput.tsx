import React from "react";

interface TextInputProps {
  title: string;
  inputName: string;
  placeholder: string;
  count?: number;
  value?: string;
  attribute?: string;
  handleNameChange: (name: string, value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  title,
  inputName,
  placeholder,
  value,
  attribute,
  handleNameChange,
}) => {
  // KEY FIX: Always return a string, never undefined
  const getInputValue = (): string => {
    if (value !== undefined && value !== null && value !== "") {
      return value;
    }
    if (attribute !== undefined && attribute !== null) {
      return attribute;
    }
    return ""; // Always return empty string as fallback
  };

  return (
    <div className="relative md:space-y-2">
      <label htmlFor={title} className="text-gray-500 text-sm lg:text-base">
        {title}
      </label>
      <input
        type="text"
        name={inputName}
        maxLength={60}
        id={title}
        placeholder={placeholder}
        value={getInputValue()}
        required
        onChange={(e) => handleNameChange(e.target.name, e.target.value)}
        className="w-full border border-blue-300 rounded-lg p-2 text-[#7a9ebd] placeholder-[#7a9ebd] focus:outline-none focus:ring-1 focus:ring-blue-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 text-sm lg:text-base"
        aria-required="true"
      />
    </div>
  );
};

export default TextInput;
