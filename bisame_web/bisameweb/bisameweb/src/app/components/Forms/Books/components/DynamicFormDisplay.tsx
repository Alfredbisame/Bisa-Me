import React from "react";
import { FormOptions } from "../interfaces";
import TextInput from "./TextInput";
import SelectOptionInput from "./SelectOptionInput";
import CheckboxInput from "./CheckboxInput";
import DescriptionField from "../../OtherFields/DescriptionField";
interface DynamicFormDisplayProps {
  data: FormOptions[];
  attributes?: Record<string, string>;
  formData: Record<string, string | string[] | (string | string[])[]>;
  handleInputChange: (field: string, value: string) => void;
  handleCheckboxInputChange?: (field: string, value: string[]) => void;
}
const DynamicFormDisplay: React.FC<DynamicFormDisplayProps> = ({
  data,
  attributes = {},
  formData,
  handleInputChange,
  handleCheckboxInputChange,
}) => {
  return (
    <>
      {/* Dynamically display forms */}
      {data &&
        data?.map(
          (
            { name, label, options, type, placeholder, metaData },
            index: number
          ) => {
            let attribute;
            if (name in attributes) {
              attribute = attributes[name];
            }
            switch (type) {
              case "string":
                return (
                  <TextInput
                    title={label}
                    inputName={name}
                    placeholder={placeholder}
                    value={formData?.[name] as string}
                    attribute={attribute}
                    // count={nameCount.bookTitle}
                    handleNameChange={handleInputChange}
                    key={placeholder}
                  />
                );

              case "dropdown":
                return (
                  <SelectOptionInput
                    name={label}
                    inputName={name}
                    options={options}
                    metaData={metaData}
                    formData={formData}
                    placeholder={placeholder}
                    handleNameChange={handleInputChange}
                    attribute={attribute}
                    key={index}
                  />
                );

              case "textarea":
                return (
                  <DescriptionField
                    name={label}
                    placeholder={placeholder}
                    key={placeholder}
                    value={formData[name] as string}
                    handleNameChange={handleInputChange}
                  />
                );
              case "checkbox":
                return (
                  <CheckboxInput
                    placeholder={placeholder}
                    label={label}
                    options={options}
                    inputName={name}
                    value={formData[name] as string[]}
                    handleCheckboxInputChange={
                      handleCheckboxInputChange as (
                        field: string,
                        value: string[]
                      ) => void
                    }
                    key={placeholder}
                  />
                );

              default:
                break;
            }
          }
        )}
    </>
  );
};

export default DynamicFormDisplay;
