"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { PostServiceFormContent } from "@/app/components/PostAd/ServiceCategorySelector/PostServiceForm";
import { PostServiceFormProvider } from "@/app/components/PostAd/PostServiceFormComponents";
import PostAdHeader from "@/app/components/PostAd/PostAdHeader";
import FormLayout from "@/app/components/PostAd/PostServiceFormComponents/FormLayout";

// extracted imports
import useUnifiedPostForm from "../hooks/useUnifiedPostForm";
import CategoryFieldsRenderer from "./CategoryFieldsRenderer";
import CategoryFormButton from "@/app/components/AllCategories/CategoryFormButton";

interface BaseData {
  service: any;
  location: any;
  images: string[];
}

const UnifiedPostForm: React.FC = () => {
  const searchParams = useSearchParams();
  const groupParam = searchParams.get("group") || "";

  // Use extracted hook for state and handlers
  const {
    step,
    baseData,
    formData,
    handleInitialSubmit,
    handleInputChange,
    handleCheckboxInputChange,
    handleBackToSelect,
    resetToSelect,
    submitListing,
    currentGroup,
    enabledForGroup,
  } = useUnifiedPostForm();

  // Category rendering delegated to `CategoryFieldsRenderer` component (keeps this file focused on layout and high-level flow)

  return (
    <PostServiceFormProvider>
      <div>
        {step === "select" && (
          <PostServiceFormContent
            onSubmit={handleInitialSubmit as any}
            onClear={() => {}}
            onServiceSelect={() => {}}
            onLocationSelect={() => {}}
            group={(groupParam as any) || undefined}
          />
        )}

        {step === "category" && (
          <FormLayout>
            <PostAdHeader
              onClear={() => {
                // Reset local and context data and return to select step
                resetToSelect();
              }}
              onBack={handleBackToSelect}
              group={baseData?.service?.group || groupParam || ""}
            />

            <main className="bg-white shadow-sm p-4 md:p-8 mx-4 mb-8">
              <div className="flex flex-col space-y-6">
                <CategoryFieldsRenderer
                  currentGroup={currentGroup}
                  baseData={baseData}
                  formData={formData}
                  handleCheckboxInputChange={handleCheckboxInputChange}
                  handleInputChange={handleInputChange}
                  enabledForGroup={enabledForGroup}
                />

                <div className="flex justify-end pt-6 border-t border-[#7ea3b8]">
                  <CategoryFormButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    onClick={submitListing}
                  >
                    Post
                  </CategoryFormButton>
                </div>
              </div>
            </main>
          </FormLayout>
        )}
      </div>
    </PostServiceFormProvider>
  );
};

export default UnifiedPostForm;
