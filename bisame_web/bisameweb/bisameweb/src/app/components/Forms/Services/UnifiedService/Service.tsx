"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import CategoryHeader from "@/app/components/AllCategories/CategoryHeader";
import CategoryFormButton from "@/app/components/AllCategories/CategoryFormButton";
import ServiceFields from "./ServiceFields";
import useHandleSubmit from "../../Foods/hooks/useHandleSubmit";
import { useFormContext } from "../../Foods/context/FormContext";
import DescriptionField from "../../OtherFields/DescriptionField";
import ContactFields from "../../OtherFields/ContactFields";

export interface AllCategoriesProps {
  category: string;
  subCategory: string;
}

const Service: React.FC = () => {
  const router = useRouter();

  const initialFormData = {
    title: "",
    serviceKeywords: [] as string[],
    description: "",
    contactNumber: "",
  };

  const [formData, setFormData] =
    useState<Record<string, string | string[] | (string | string[])[]>>(
      initialFormData
    );
  console.log(formData);

  const { FormData, clearFormData } = useFormContext();

  const handleInputChange = (
    field: string,
    value: string | string[],
    event?: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const eventTarget = event?.target;

    if (eventTarget?.type == "checkbox") {
      const { name, checked } = eventTarget;
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...((prev[name] as string[]) || []), value]
          : ((prev[name] as string[]) || []).filter((v) => v !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleClear = () => {
    setFormData(initialFormData);
  };

  // Logic to handle form submission
  const { handleSubmit, isSubmitting } = useHandleSubmit({
    FormData,
    formData,
    clearFormData,
  });

  return (
    <div className="bg-[#edf4f9] min-h-screen flex justify-center items-start p-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl w-full bg-white rounded-lg p-6 space-y-6"
        aria-label="Auto mechanic saloon service details form"
      >
        <CategoryHeader
          onClear={handleClear}
          onBack={handleBack}
          title={`Post Your Service`}
          description="Share your services with the community"
        />

        {/* <ServiceFields formData={formData} onInputChange={handleInputChange} /> */}

        <DescriptionField
          value={formData.description as string}
          handleNameChange={handleInputChange}
        />

        <ContactFields
          phone={formData.contactNumber as string}
          name={`contactNumber`}
          onPhoneChange={(value) =>
            handleInputChange("contactNumber", value || "")
          }
          onNameChange={(value) => handleInputChange("name", value || "")}
        />

        <div className="flex justify-end pt-6 border-t border-[#7ea3b8]">
          <CategoryFormButton
            type="submit"
            variant="primary"
            size="lg"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting Service..." : "Post"}
          </CategoryFormButton>
        </div>
      </form>
    </div>
  );
};

export default Service;