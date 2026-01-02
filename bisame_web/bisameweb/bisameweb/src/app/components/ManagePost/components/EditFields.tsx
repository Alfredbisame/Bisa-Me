// ./EditFields.tsx
import React from "react";
import { FormOptions } from "../../Forms/Books/interfaces";
import DynamicFormDisplay from "../../Forms/Books/components/DynamicFormDisplay";

// Primitive and form data types shared with the main form
export type FormPrimitive = string | string[];

export type FormDataValue = FormPrimitive | FormPrimitive[];

export type FormDataShape = Record<string, FormDataValue>;

interface BookFieldsProps {
  data: FormOptions[];
  attributes: Record<string, string>;
  formData: FormDataShape;
  handleInputChange: (field: string, value: FormPrimitive) => void;
}

const EditFields: React.FC<BookFieldsProps> = ({
  data,
  attributes,
  formData,
  handleInputChange,
}) => {
  return (
    <div className="grid grid-cols-2 gap-5">
      <DynamicFormDisplay
        formData={formData}
        attributes={attributes}
        data={data}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default EditFields;
