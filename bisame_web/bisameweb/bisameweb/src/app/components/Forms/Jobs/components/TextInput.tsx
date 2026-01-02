import React, { HTMLInputTypeAttribute } from "react";

interface TextInputProps {
  type?: HTMLInputTypeAttribute;
  title: string;
  inputName: string;
  placeholder?: string;
  count?: number;
  value: string;
  styles?: string;
  handleNameChange: (name: string, value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  type = "text",
  title,
  inputName,
  placeholder,
  count,
  value,
  styles,
  handleNameChange,
}) => {
  return (
    <div className={`relative md:space-y-1 ${styles}`}>
      <label htmlFor={title} className="text-gray-500 text-sm md:text-base">
        {title}
      </label>
      <input
        type={type}
        name={inputName}
        maxLength={60}
        id={title}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleNameChange(e.target.name, e.target.value)}
        className="w-full border border-blue-300 rounded-lg p-2 text-[#7a9ebd] placeholder-[#7a9ebd] focus:outline-none focus:ring-1 focus:ring-blue-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
        aria-required="true"
      />
      <div
        className="absolute top-0 right-3 text-xs text-[#7a9ebd] select-none"
        aria-live="polite"
      >
        {count} / 60
      </div>
    </div>
  );
};

export default TextInput;
