import React from "react";
import EditFields, { FormDataShape, FormPrimitive } from "./EditFields";
import DescriptionField from "../../Forms/OtherFields/DescriptionField";
import PricingSection from "../../Forms/OtherFields/PricingSection";
import NegotiationOptions from "../../Forms/OtherFields/NegotiationOptions";
import ContactFields from "../../Forms/OtherFields/ContactFields";
import TextInput from "../../Forms/Books/components/TextInput";
import { FormOptions } from "../../Forms/Books/interfaces";

type AttributeValue = string | string[];

interface ProductEditData {
  title?: string;
  location?: string;
  attributes?: Record<string, AttributeValue>;
  description?: string;
  price?: string;
  negotiable?: string;
  contactNumber?: string;
  [key: string]:
    | string
    | AttributeValue
    | Record<string, AttributeValue>
    | undefined;
}

interface FormTextFieldProps {
  data: { data: FormOptions[] } | null;
  formData: FormDataShape;
  newProductData: ProductEditData | null;
  onInputChange: (field: string, value: FormPrimitive) => void;
}

const getStringValue = (
  value: FormDataShape[keyof FormDataShape] | undefined
): string => {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    const first = value[0];
    if (typeof first === "string") return first;
    if (Array.isArray(first) && first.length > 0) {
      const innerFirst = first[0];
      if (typeof innerFirst === "string") return innerFirst;
    }
  }
  return "";
};

const FormTextField: React.FC<FormTextFieldProps> = ({
  data,
  formData,
  newProductData,
  onInputChange,
}) => {
  const titleValue = getStringValue(formData.title);
  const locationValue = getStringValue(formData.location);
  const descriptionValue = getStringValue(formData.description);
  const priceValue = getStringValue(formData.price);
  const negotiableValue = getStringValue(formData.negotiable);
  const contactNumberValue = getStringValue(formData.contactNumber);

  return (
    <>
      <div>
        <TextInput
          title="Title"
          inputName="title"
          attribute={newProductData?.title}
          placeholder="Select your title"
          value={titleValue}
          handleNameChange={onInputChange}
        />
      </div>

      <div>
        <TextInput
          title="Location"
          inputName="location"
          attribute={newProductData?.location}
          placeholder="Select your location"
          value={locationValue}
          handleNameChange={onInputChange}
        />
      </div>

      {data && (
        <EditFields
          data={data.data}
          formData={formData}
          attributes={newProductData?.attributes as Record<string, string>}
          handleInputChange={onInputChange}
        />
      )}

      <DescriptionField
        attribute={newProductData?.description}
        value={descriptionValue}
        handleNameChange={onInputChange}
      />

      <PricingSection
        price={priceValue}
        attribute={newProductData?.price}
        handlePriceChange={onInputChange}
      />

      <NegotiationOptions
        value={negotiableValue}
        handleChange={onInputChange}
      />

      <ContactFields
        phone={contactNumberValue}
        attribute={newProductData?.contactNumber}
        name="contactNumber"
        onPhoneChange={(value) => onInputChange("contactNumber", value || "")}
        onNameChange={(value) => onInputChange("name", value || "")}
      />
    </>
  );
};

export default FormTextField;
