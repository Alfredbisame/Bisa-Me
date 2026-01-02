"use client";
import React, { useEffect } from "react";
import { MetaDataProps } from "../interfaces";
import useHandleDynamicOptions from "../hooks/useHandleDynamicOptions";
import { useFormContext } from "../../Foods/context/FormContext";

export type ObjectProps = Record<
  string,
  string | string[] | (string | string[])[]
>;

interface SelectOptionProps {
  name: string;
  attribute?: string;
  inputName?: string;
  options: string[];
  metaData?: MetaDataProps;
  formData: ObjectProps;
  placeholder?: string;
  handleNameChange: (name: string, value: string) => void;
}

const SelectOptionInput: React.FC<SelectOptionProps> = ({
  name,
  options,
  inputName,
  metaData,
  formData,
  attribute,
  placeholder,
  handleNameChange,
}) => {
  const hasCustomInput = metaData?.allowCustomInput;
  const dynamicOptions = metaData?.dynamicOptions;
  const optionKey = inputName as string;

  const { optionData, newOptions, handleUpdateOptions } = useFormContext();
  const { triggerValue, handleTriggerValue, handleTrigger } =
    useHandleDynamicOptions(metaData as MetaDataProps, formData, optionKey);

  useEffect(() => {
    if (!dynamicOptions) return;

    // If the dynamic fetcher indicates the options are for this specific input, update the options
    if (
      optionData?.optionKey &&
      String(optionData.optionKey).toLowerCase() ===
        String(inputName).toLowerCase() &&
      optionData.options
    ) {
      handleUpdateOptions({ [inputName as string]: optionData.options });
    }
  }, [optionData, dynamicOptions, inputName, handleUpdateOptions]);

  // Keep selected value valid when options update: if current value is no longer present
  // and the input doesn't allow custom values, clear the selection.
  useEffect(() => {
    if (!dynamicOptions) return;

    const availableOptions: string[] =
      newOptions?.[inputName as string] ?? options;

    if (metaData?.allowCustomInput) return; // respect custom input permission

    const currentValue = formData[optionKey as string];
    if (
      currentValue !== undefined &&
      currentValue !== null &&
      currentValue !== "" &&
      !availableOptions.map(String).includes(String(currentValue))
    ) {
      // Clear invalid value
      handleNameChange(inputName as string, "");
    }
  }, [
    newOptions,
    options,
    formData,
    inputName,
    optionKey,
    metaData?.allowCustomInput,
    handleNameChange,
  ]);

  const availableOptions = newOptions?.[inputName as string] ?? options;

  // KEY FIX: Get the current value from formData or use empty string
  const getSelectValue = (): string => {
    const formValue = formData[optionKey];
    if (formValue !== undefined && formValue !== null && formValue !== "") {
      return String(formValue);
    }
    if (attribute !== undefined && attribute !== null && attribute !== "") {
      return attribute;
    }
    return ""; // Always return string
  };

  return (
    <div className="relative md:space-y-2">
      <label htmlFor={name} className="text-gray-500 text-sm lg:text-base">
        {name[0].toUpperCase() + name.slice(1)}
      </label>
      <select
        name={inputName}
        required
        value={getSelectValue()}
        className="w-full border border-blue-300 rounded-lg p-2 text-[#7a9ebd] placeholder-[#7a9ebd] focus:outline-none focus:ring-1 focus:ring-blue-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 text-xs md:text-sm lg:text-base"
        aria-required="true"
        onChange={(e) => {
          handleNameChange(e.target.name, e.target.value);
          if (dynamicOptions || hasCustomInput) {
            handleTriggerValue({
              triggerAttribute: e.target.name,
              triggerValue: e.target.value,
            });
            handleTrigger(true);
          }
        }}
      >
        <option value="">{placeholder || "Select an option"}</option>
        {availableOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectOptionInput;
