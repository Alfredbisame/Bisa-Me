import React from "react";
import { FormOptions } from "../Books/interfaces";
import DynamicFormDisplay from "../Books/components/DynamicFormDisplay";

interface JobSeekerFieldsProps {
  data: FormOptions[];
  formData: Record<string, string | string[] | (string | string[])[]>;
  handleInputChange: (field: string, value: string | string[]) => void;
}

const JobSeekerFields: React.FC<JobSeekerFieldsProps> = ({
  data,
  formData,
  handleInputChange,
}) => {
  // const [nameCount, setNameCount] = useState({
  //   jobTitle: 0,
  // });

  // const handleNameChange = (name: string, value: string) => {
  //   if (value.length <= 60) {
  //     onInputChange(name, value);
  //     setNameCount((prev) => ({ ...prev, [name]: value.length }));
  //   }
  // };

  return (
    <div className="grid grid-cols-2 gap-5">
      <DynamicFormDisplay
        formData={formData}
        data={data}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default JobSeekerFields;
