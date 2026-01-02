import React from "react";

interface DescriptionFieldProps {
  name?: string;
  attribute?: string;
  placeholder?: string;
  value?: string;
  handleNameChange: (field: string, value: string) => void;
}

const DescriptionField: React.FC<DescriptionFieldProps> = ({
  name = "Description",
  placeholder = "Enter a detailed description of your listing...",
  value,
  attribute,
  handleNameChange,
}) => {
  const minLength = 20;
  const maxLength = 850;

  // KEY FIX: Always return a string
  const getTextAreaValue = (): string => {
    if (value !== undefined && value !== null && value !== "") {
      return value;
    }
    if (attribute !== undefined && attribute !== null) {
      return attribute;
    }
    return ""; // Always return empty string
  };

  return (
    <div className="space-y-1 col-span-2">
      <h2 className="text-gray-500 text-xs md:text-sm lg:text-base">{name}</h2>
      <div className="relative">
        <textarea
          rows={4}
          name={name.toLowerCase()}
          minLength={minLength}
          maxLength={maxLength}
          placeholder={placeholder}
          value={getTextAreaValue()}
          required
          onChange={(e) => handleNameChange(e.target.name, e.target.value)}
          className="w-full border border-blue-300 rounded-lg p-2 text-[#7a9ebd] placeholder-[#7a9ebd] focus:outline-none focus:ring-1 focus:ring-blue-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 resize-none text-xs md:text-sm lg:text-base"
        />
      </div>
    </div>
  );
};

export default DescriptionField;
