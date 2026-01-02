import React from "react";
import { FormOptions } from "../Books/interfaces";
import DynamicFormDisplay from "../Books/components/DynamicFormDisplay";

interface EngineFieldsProps {
  data: FormOptions[];
  formData: Record<string, string | string[] | (string | string[])[]>;
  handleInputChange: (field: string, value: string | string[]) => void;
}

const ProductsFields: React.FC<EngineFieldsProps> = ({
  data,
  formData,
  handleInputChange,
}) => {
  // const [nameCount, setNameCount] = useState({
  //   healthTitle: 0,
  //   description: 0,
  //   price: 0,
  //   negotiation: 0,
  //   phone: 0,
  // });

  // const handleNameChange = (name: string, value: string) => {
  //   if (value.length <= 60) {
  //     onInputChange(name, value);
  //     setNameCount((prev) => ({ ...prev, [name]: value.length }));
  //   }
  // };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-5">
        <DynamicFormDisplay
          formData={formData}
          data={data}
          handleInputChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default ProductsFields;
