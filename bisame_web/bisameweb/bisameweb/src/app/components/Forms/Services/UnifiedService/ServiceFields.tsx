import React, { useState } from "react";
import KeyServiceDropdown from "../../Products/KeyProductDropdown";
import TextInput from "../../Jobs/components/TextInput";

interface EngineFieldsProps {
  formData: Record<string, string | string[] | (string | string[])[]>;
  onInputChange: (field: string, value: string | string[]) => void;
  category: string;
  subCategory: string;
}

const ServiceFields: React.FC<EngineFieldsProps> = ({
  formData,
  onInputChange,
  category,
  subCategory,
}) => {
  const [nameCount, setNameCount] = useState(0);

  const handleNameChange = (name: string, value: string) => {
    if (value.length <= 60) {
      onInputChange(name, value);
      setNameCount(value.length);
    }
  };

  return (
    <div className="space-y-6">
      {/* Service type */}
      <div className="space-y-3">
        <p className="text-md text-gray-500">
          Select keywords that describe your service
        </p>

        {/* Service Keywords Dropdown */}
        <div className="grid grid-cols-1 gap-4">
          <KeyServiceDropdown
            selectedServices={(formData.serviceKeywords as string[]) || []}
            onServicesChange={(services) =>
              onInputChange("serviceKeywords", services)
            }
            required={true}
            category={category}
            subCategory={subCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceFields;
