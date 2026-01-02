import React from "react";
import { FormOptions } from "../Books/interfaces";
import DynamicFormDisplay from "../Books/components/DynamicFormDisplay";

interface EngineFieldsProps {
  data: FormOptions[];
  formData: Record<string, string | string[] | (string | string[])[]>;
  handleInputChange: (field: string, value: string | string[]) => void;
  handleCheckboxInputChange: (field: string, value: string[]) => void;
}

const ProductsFields: React.FC<EngineFieldsProps> = ({
  data,
  formData,
  handleInputChange,
  handleCheckboxInputChange
}) => {
  // const [businessNameCount, setBusinessNameCount] = useState(0);

  // useEffect(() => {
  //   setBusinessNameCount(formData.businessName?.length || 0);
  // }, [formData.businessName]);

  // const handleBusinessNameChange = (value: string) => {
  //   if (value.length <= 60) {
  //     onInputChange("businessName", value);
  //     setBusinessNameCount(value.length);
  //   }
  // };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-5">
        <DynamicFormDisplay
          formData={formData}
          data={data}
          handleCheckboxInputChange={handleCheckboxInputChange}
          handleInputChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default ProductsFields;
