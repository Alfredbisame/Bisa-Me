import React from "react";

interface NegotiationOptionsProps {
  value: string;
  handleChange: (field: string, value: string) => void;
}

const NegotiationOptions: React.FC<NegotiationOptionsProps> = ({
  value,
  handleChange,
}) => {
  const options = [
    { value: "yes", label: "Yes", color: "text-green-600" },
    { value: "no", label: "No", color: "text-red-600" },
    { value: "not-sure", label: "Not sure", color: "text-orange-600" },
  ];

  return (
    <fieldset className="space-y-1">
      <legend className="text-gray-500 text-sm lg:text-base">Are you open to negotiation?</legend>
      <div className="flex flex-row  items-center sm:space-y-0 space-x-5 md:space-x-8 text-base font-medium">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-center  space-x-3 cursor-pointer text-sm lg:text-base p-1 md:p-3 rounded-lg transition-all duration-200 w-full sm:w-auto ${
              value === option.value
                ? "bg-orange-100 border-2 border-orange-300 shadow-md"
                : "hover:bg-blue-50 border-2 border-transparent"
            }`}
          >
            <input
              type="radio"
              name="negotiable"
              value={option.value}
              checked={value === option.value}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              className="form-radio text-orange-500 focus:ring-orange-400"
              aria-label={option.label}
            />
            <span className={`${option.color} font-thin`}>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default NegotiationOptions;
