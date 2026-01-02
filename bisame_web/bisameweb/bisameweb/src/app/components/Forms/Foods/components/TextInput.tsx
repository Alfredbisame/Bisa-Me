import React from "react";

interface TextInputProps {
  title: string;
  inputName: string;
  placeholder: string;
  count?: number;
  value: string;
  handleNameChange: (name: string, value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  title,
  inputName,
  placeholder,
  count,
  value,
  handleNameChange,
}) => {
  return (
    <div className="relative space-y-2">
      <label htmlFor={title} className="text-blue-700 font-semibold">
        {title}
      </label>
      <input
        type="text"
        name={inputName}
        maxLength={60}
        id={title}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleNameChange(e.target.name, e.target.value)}
        className="w-full border border-blue-300 rounded-md p-2 text-[#7a9ebd] placeholder-[#7a9ebd] focus:outline-none focus:ring-1 focus:ring-blue-300 hover:border-orange-400 hover:bg-orange-50 transition-all duration-200"
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
