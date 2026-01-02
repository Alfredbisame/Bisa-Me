"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CategoryFormButton from "@/app/components/AllCategories/CategoryFormButton";
import ProductsFields from "./ProductsFields";

import useFetchFormOptions from "../Books/hooks/useFetchFormOptions";
import { FormOptions } from "../Books/interfaces";
import useInitializeForm from "../Foods/hooks/useInitializeForm";
import { useFormContext } from "../Foods/context/FormContext";
import useHandleSubmit from "../Foods/hooks/useHandleSubmit";
import Title from "../Foods/context/Title";
import { LuLoaderCircle } from "react-icons/lu";
import PostAdHeader from "../../PostAd/PostAdHeader";
import DescriptionField from "../OtherFields/DescriptionField";
import PricingSection from "../OtherFields/PricingSection";
import ContactFields from "../OtherFields/ContactFields";
import NegotiationOptions from "../OtherFields/NegotiationOptions";

export interface AllCategoriesProps {
  category: string;
  subCategory: string;
}

const Products: React.FC = () => {
  const router = useRouter();
  const SearchParams = useSearchParams();
  const group = SearchParams.get("group") as string;
  const category = SearchParams.get("category") as string;
  const subCategory = SearchParams.get("subCategory") as string;
  console.log(group);

  const { data, isLoading } = useFetchFormOptions(group, category, subCategory);

  console.log(data);
  
  // Transform data to match InitializeFormProps
  const formOptions: { data: { name: string }[] } | undefined = 
    data && typeof data === 'object' && 'data' in data && Array.isArray(data.data)
      ? { data: data.data as { name: string }[] }
      : undefined;

  const { formData, initialFormData, setFormData } = useInitializeForm(formOptions);

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
    <div className="bg-[#edf4f9] min-h-screen flex justify-center items-start p-6">
      <div className="max-w-4xl w-full">
        <PostAdHeader
          onClear={handleClear}
          onBack={handleBack}
          group={category}
          styles="mx-0 mt-0"
        />
        <form
          onSubmit={handleSubmit}
          className=" bg-white p-6 space-y-6"
          aria-label="Auto mechanic saloon service details form"
        >
          {/* <CategoryHeader
          onClear={handleClear}
          onBack={handleBack}
          title={`Post Your Products`}
          description="List Your Products for sale"
        /> */}

          <Title
            formTitle={formData.title as string}
            handleNameChange={handleInputChange}
            placeholder="Enter product title"
            title="Product title"
          />

          {isLoading ? (
            <span className="flex items-center justify-center">
              <LuLoaderCircle size={25} color="gray" className="animate-spin" />
            </span>
          ) : (
            <div>
              {data && data.data && Array.isArray(data.data) ? (
                <ProductsFields
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
    </div>
  );
};

export default Products;
