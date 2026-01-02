export interface MetaDataProps {
  dynamicOptions: boolean;
  dependsOn: string | string[];
  apiEndpoint: string;
  allowCustomInput: boolean;
}

// export interface FormOptions {
//   id: string;
//   name: string;
//   label: string;
//   errorLabel: string;
//   type: "string" | "dropdown" | "textarea" | "checkbox";
//   placeholder: "string";
//   options: [];
//   metaData?: MetaDataProps;
// }

// ../../Forms/Books/interfaces.ts

export type FormFieldType = "string" | "dropdown" | "textarea" | "checkbox";

export interface MetaDataProps {
  // Flexible metadata container without using any/unknown
  [key: string]:
    | string
    | number
    | boolean
    | string[]
    | number[]
    | boolean[]
    | null
    | undefined;
}

export interface FormOptions {
  id: string;
  name: string;
  label: string;
  errorLabel: string;
  type: FormFieldType;
  placeholder: string;
  // For dropdown / checkbox fields; can be empty for others
  options: string[];
  metaData?: MetaDataProps;
}
