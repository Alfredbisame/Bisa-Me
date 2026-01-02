"use client";

import React from "react";
import dynamic from "next/dynamic";
import DescriptionField from "@/app/components/Forms/OtherFields/DescriptionField";
import PricingSection from "@/app/components/Forms/OtherFields/PricingSection";
import NegotiationOptions from "@/app/components/Forms/OtherFields/NegotiationOptions";
import ContactFields from "@/app/components/Forms/OtherFields/ContactFields";
import Title from "@/app/components/Forms/Foods/context/Title";
import useFetchFormOptions from "@/app/components/Forms/Books/hooks/useFetchFormOptions";

// dynamic imports
const FoodFields = dynamic(
  () => import("@/app/components/Forms/Foods/FoodFields"),
  { ssr: false }
);
const ProductsFields = dynamic(
  () => import("@/app/components/Forms/Products/ProductsFields"),
  { ssr: false }
);
const ServiceFields = dynamic(
  () => import("@/app/components/Forms/Services/UnifiedService/ServiceFields"),
  { ssr: false }
);
const JobsFields = dynamic(
  () => import("@/app/components/Forms/Jobs/JobFields"),
  { ssr: false }
);
const BooksFields = dynamic(
  () => import("@/app/components/Forms/Books/BookFields"),
  { ssr: false }
);
const HealthFields = dynamic(
  () => import("@/app/components/Forms/Health/HealthFields"),
  { ssr: false }
);

interface RendererProps {
  currentGroup: string;
  baseData: any;
  formData: Record<string, any>;
  handleInputChange: (field: string, value: any) => void;
  handleCheckboxInputChange: (field: string, value: string[]) => void;
  enabledForGroup: (g: string) => boolean;
}

const CategoryFieldsRenderer: React.FC<RendererProps> = ({
  currentGroup,
  baseData,
  formData,
  handleInputChange,
  handleCheckboxInputChange,
  enabledForGroup,
}) => {
  const { data: foodOptions, isLoading: foodsLoading } = useFetchFormOptions(
    "Food",
    baseData?.service?.category,
    baseData?.service?.subcategory,
    enabledForGroup("food") || enabledForGroup("foods")
  );

  const { data: productOptions, isLoading: productsLoading } =
    useFetchFormOptions(
      "Buy and Sell",
      baseData?.service?.category,
      baseData?.service?.subcategory,
      enabledForGroup("products") || enabledForGroup("buy and sell")
    );

  const { data: jobOptions, isLoading: jobsLoading } = useFetchFormOptions(
    "Jobs",
    baseData?.service?.category,
    baseData?.service?.subcategory,
    enabledForGroup("jobs")
  );

  const { data: bookOptions, isLoading: booksLoading } = useFetchFormOptions(
    "Books",
    baseData?.service?.category,
    baseData?.service?.subcategory,
    enabledForGroup("books")
  );

  const { data: healthOptions, isLoading: healthLoading } = useFetchFormOptions(
    "Health",
    baseData?.service?.category,
    baseData?.service?.subcategory,
    enabledForGroup("health")
  );

  switch (currentGroup) {
    case "foods":
    case "food":
      return (
        <div>
          <Title
            formTitle={formData.title || ""}
            handleNameChange={handleInputChange}
            placeholder="Enter food title"
            title="Food title"
          />
          {foodsLoading ? (
            <div>Loading...</div>
          ) : foodOptions?.data ? (
            <FoodFields
              data={foodOptions.data as any}
              formData={formData}
              handleCheckboxInputChange={handleCheckboxInputChange}
              handleInputChange={handleInputChange}
            />
          ) : null}
          <DescriptionField
            value={formData.description || ""}
            handleNameChange={handleInputChange}
          />
          <PricingSection
            price={formData.price || ""}
            handlePriceChange={handleInputChange}
          />
          <NegotiationOptions
            value={formData.negotiable || ""}
            handleChange={handleInputChange}
          />
          <PricingSection
            price={formData.price || ""}
            handlePriceChange={handleInputChange}
          />
          <ContactFields
            phone={formData.contactNumber || ""}
            name={`contactNumber`}
            onPhoneChange={(value: any) =>
              handleInputChange("contactNumber", value || "")
            }
            onNameChange={(value: any) =>
              handleInputChange("name", value || "")
            }
          />
        </div>
      );

    case "products":
    case "buy and sell":
      return (
        <div>
          <Title
            formTitle={formData.title || ""}
            handleNameChange={handleInputChange}
            placeholder="Enter product title"
            title="Product title"
          />
          {productsLoading ? (
            <div>Loading...</div>
          ) : productOptions?.data ? (
            <ProductsFields
              data={productOptions.data as any}
              formData={formData}
              handleCheckboxInputChange={handleCheckboxInputChange}
              handleInputChange={handleInputChange}
            />
          ) : null}
          <DescriptionField
            value={formData.description || ""}
            handleNameChange={handleInputChange}
          />
          <PricingSection
            price={formData.price || ""}
            handlePriceChange={handleInputChange}
          />
          <NegotiationOptions
            value={formData.negotiable || ""}
            handleChange={handleInputChange}
          />
          <ContactFields
            phone={formData.contactNumber || ""}
            name={`contactNumber`}
            onPhoneChange={(value: any) =>
              handleInputChange("contactNumber", value || "")
            }
            onNameChange={(value: any) =>
              handleInputChange("name", value || "")
            }
          />
        </div>
      );

    case "services":
      return (
        <div>
          <Title
            formTitle={formData.title || ""}
            handleNameChange={handleInputChange}
            placeholder="Enter service title"
            title="Service title"
          />
          {/** Service-specific async options could be added here **/}
          <ServiceFields
            formData={formData}
            onInputChange={handleInputChange}
            category={baseData?.service?.category}
            subCategory={baseData?.service?.subcategory}
          />
          <DescriptionField
            value={formData.description || ""}
            handleNameChange={handleInputChange}
          />
          <ContactFields
            phone={formData.contactNumber || ""}
            name={`contactNumber`}
            onPhoneChange={(value: any) =>
              handleInputChange("contactNumber", value || "")
            }
            onNameChange={(value: any) =>
              handleInputChange("name", value || "")
            }
          />
        </div>
      );

    case "jobseek":
    case "jobs":
      return (
        <div>
          <Title
            formTitle={formData.title || ""}
            handleNameChange={handleInputChange}
            placeholder="Enter job title"
            title="Job title"
          />
          {jobsLoading ? (
            <div>Loading...</div>
          ) : jobOptions?.data ? (
            <JobsFields
              data={jobOptions.data as any}
              formData={formData}
              handleInputChange={handleInputChange}
            />
          ) : null}
          <DescriptionField
            value={formData.description || ""}
            handleNameChange={handleInputChange}
          />
          <ContactFields
            phone={formData.contactNumber || ""}
            name={`contactNumber`}
            onPhoneChange={(value: any) =>
              handleInputChange("contactNumber", value || "")
            }
            onNameChange={(value: any) =>
              handleInputChange("name", value || "")
            }
          />
        </div>
      );

    case "books":
      return (
        <div>
          <Title
            formTitle={formData.title || ""}
            handleNameChange={handleInputChange}
            placeholder="Enter book title"
            title="Book title"
          />
          {booksLoading ? (
            <div>Loading...</div>
          ) : bookOptions?.data ? (
            <BooksFields
              data={bookOptions.data as any}
              formData={formData}
              handleInputChange={handleInputChange}
            />
          ) : null}
          <DescriptionField
            value={formData.description || ""}
            handleNameChange={handleInputChange}
          />
          <PricingSection
            price={formData.price || ""}
            handlePriceChange={handleInputChange}
          />
          <ContactFields
            phone={formData.contactNumber || ""}
            name={`contactNumber`}
            onPhoneChange={(value: any) =>
              handleInputChange("contactNumber", value || "")
            }
            onNameChange={(value: any) =>
              handleInputChange("name", value || "")
            }
          />
        </div>
      );

    case "health":
      return (
        <div>
          <Title
            formTitle={formData.title || ""}
            handleNameChange={handleInputChange}
            placeholder="Enter health service title"
            title="Health service title"
          />
          {healthLoading ? (
            <div>Loading...</div>
          ) : healthOptions?.data ? (
            <HealthFields
              data={healthOptions.data as any}
              formData={formData}
              handleInputChange={handleInputChange}
            />
          ) : null}
          <DescriptionField
            value={formData.description || ""}
            handleNameChange={handleInputChange}
          />
          <PricingSection
            price={formData.price || ""}
            handlePriceChange={handleInputChange}
          />
          <ContactFields
            phone={formData.contactNumber || ""}
            name={`contactNumber`}
            onPhoneChange={(value: any) =>
              handleInputChange("contactNumber", value || "")
            }
            onNameChange={(value: any) =>
              handleInputChange("name", value || "")
            }
          />
        </div>
      );

    default:
      return <div>Category not supported yet.</div>;
  }
};

export default React.memo(CategoryFieldsRenderer);
