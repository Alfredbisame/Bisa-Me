import React from "react";
// import KeyBooksDropdown from "./KeyBooksDropdown";
// import TextInput from "./components/TextInput";
// import SelectOptionInput from "./components/SelectOptionInput";
// import { DescriptionField } from "../LaptopComputers";
import { FormOptions } from "../Books/interfaces";
import DynamicFormDisplay from "../Books/components/DynamicFormDisplay";

interface JobFieldsProps {
  data: FormOptions[];
  formData: Record<string, string | string[] | (string | string[])[]>;
  handleInputChange: (field: string, value: string | string[]) => void;
}

const JobFields: React.FC<JobFieldsProps> = ({
  data,
  formData,
  handleInputChange,
}) => {
  // const [nameCount, setNameCount] = useState({
  //   jobTitle: 0,
  //   requirement: 0,
  //   deadline: 0,
  // });

  // const handleNameChange = (name: string, value: string) => {
  //   if (value.length <= 60) {
  //     onInputChange(name, value);
  //     setNameCount((prev) => ({ ...prev, [name]: value.length }));
  //   }
  // };

  return (
    <div className="grid grid-cols-2 gap-2 md:gap-5">
      <DynamicFormDisplay
        formData={formData}
        data={data}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default JobFields;
