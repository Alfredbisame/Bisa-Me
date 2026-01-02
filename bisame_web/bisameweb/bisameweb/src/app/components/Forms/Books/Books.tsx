"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CategoryHeader from "@/app/components/AllCategories/CategoryHeader";
import CategoryFormButton from "@/app/components/AllCategories/CategoryFormButton";
import BookFields from "./BookFields";
import useFetchFormOptions from "./hooks/useFetchFormOptions";
import { FormOptions } from "./interfaces";
import { LuLoaderCircle } from "react-icons/lu";
import useInitializeForm from "../Foods/hooks/useInitializeForm";
import { useFormContext } from "../Foods/context/FormContext";
import useHandleSubmit from "../Foods/hooks/useHandleSubmit";
import Title from "../Foods/context/Title";
import DescriptionField from "../OtherFields/DescriptionField";
import PricingSection from "../OtherFields/PricingSection";
import NegotiationOptions from "../OtherFields/NegotiationOptions";
import ContactFields from "../OtherFields/ContactFields";

export interface AllCategoriesProps {
  category: string;
  subCategory: string;
}

const Books: React.FC = () => {
  const router = useRouter();
  const SearchParams = useSearchParams();
  const group = SearchParams.get("group") as string;
  console.log(group);

  const { data, isLoading } = useFetchFormOptions(group);
  console.log(data);
  
  // Transform data to match InitializeFormProps
  const formOptions: { data: { name: string }[] } | undefined = 
    data && typeof data === 'object' && 'data' in data && Array.isArray(data.data)
      ? { data: data.data as { name: string }[] }
      : undefined;
  
  const { formData, initialFormData, setFormData } = useInitializeForm(formOptions);

  const { FormData, clearFormData } = useFormContext();

  console.log(FormData);
  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Logic to handle form submission
  const { handleSubmit, isSubmitting } = useHandleSubmit({
    FormData,
    formData,
    clearFormData,
  });

  const handleBack = () => {
    router.back();
  };

  const handleClear = () => {
    setFormData(initialFormData);
  };

  return (
    <div className="bg-[#edf4f9] min-h-screen flex justify-center items-start p-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl w-full bg-white rounded-lg p-6 space-y-6"
        aria-label="Auto mechanic saloon service details form"
      >
        <CategoryHeader
          onClear={handleClear}
          onBack={handleBack}
          title={`Sell Your Books`}
          description={`List Your Books for sale`}
        />
        <Title
          formTitle={formData.title as string}
          handleNameChange={handleInputChange}
          placeholder="Enter book title"
          title="Book title"
        />

        {isLoading ? (
          <span className="flex items-center justify-center">
            <LuLoaderCircle size={25} color="gray" className="animate-spin" />
          </span>
        ) : (
          <div>
            {data && data.data && Array.isArray(data.data) ? (
              <BookFields
                data={data.data as FormOptions[]}
                formData={formData}
                handleInputChange={handleInputChange}
              />
            ) : null}
          </div>
        )}

        <DescriptionField
          value={formData.description as string}
          handleNameChange={handleInputChange}
        />

        {/* Pricing input */}
        <PricingSection
          price={formData.price as string}
          handlePriceChange={handleInputChange}
        />

        {/* Negotiation input */}
        <NegotiationOptions
          value={formData.negotiable as string}
          handleChange={handleInputChange}
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

export default Books;
