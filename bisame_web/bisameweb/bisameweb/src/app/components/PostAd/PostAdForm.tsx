"use client";

import React from "react";
import PostAdHeader from "./PostAdHeader";
import CategorySelector from "./CategorySelector";
import LocationSelector from "./LocationSelector";
import PhotoUploadSection from "./PhotoUploadSection";
import SubmitButton from "./SubmitButton";
import FormLayout from "./PostAdFormComponents/FormLayout";
import FormProgressIndicator from "./PostAdFormComponents/FormProgressIndicator";
import FormSummary from "./PostAdFormComponents/FormSummary";
import {
  usePostAdForm,
  PostAdFormCallbacks,
  UploadedImage,
  Category,
} from "./PostAdFormComponents/usePostAdForm";
import { PostAdFormProvider } from "./PostAdFormComponents/FormContext";
import type { LocationProps } from "./PostServiceFormComponents/FormContext";

interface PostAdFormProps extends PostAdFormCallbacks {
  onSubmit?: (data: {
    category: Category;
    location: string;
    images: UploadedImage[];
  }) => void;
}

const PostAdForm = (props: PostAdFormProps) => {
  return (
    <PostAdFormProvider>
      <PostAdFormInner {...props} />
    </PostAdFormProvider>
  );
};

const PostAdFormInner = (props: PostAdFormProps) => {
  const {
    selectedCategory,
    selectedLocation, // likely a string from your hook
    images,
    isSubmitting,
    handleCategorySelect,
    handleLocationSelect,
    handleImagesChange,
    handleClearForm,
    handleBack,
  } = usePostAdForm(props);

  const isFormValid = Boolean(
    selectedCategory && selectedLocation && images.length > 0
  );

  const getProgressPercentage = () => {
    let progress = 0;
    if (selectedCategory) progress += 33;
    if (selectedLocation) progress += 33;
    if (images.length > 0) progress += 34;
    return progress;
  };

  return (
    <FormLayout>
      <PostAdHeader
        onClear={handleClearForm}
        onBack={handleBack}
        group={selectedCategory?.group ?? ""}
      />
      <main className="bg-white rounded-xl shadow-xl border border-gray-100 p-8 mt-4 mx-4 mb-8">
        <div className="flex flex-col space-y-6">
          <CategorySelector
            selectedCategory={selectedCategory}
            onSelect={handleCategorySelect}
          />

          {/* Cast to LocationProps for the LocationSelector only */}
          <LocationSelector
            selectedLocation={selectedLocation as unknown as LocationProps}
            onSelect={handleLocationSelect}
          />

          <PhotoUploadSection
            onImagesChange={handleImagesChange}
            maxImages={10}
            maxFileSize={5}
          />

          <SubmitButton
            isEnabled={isFormValid}
            isLoading={isSubmitting}
            text={isSubmitting ? "Processing..." : "Next"}
            onClick={() => {
              if (isFormValid && props.onSubmit) {
                props.onSubmit({
                  category: selectedCategory!,
                  location: selectedLocation, // still a string here
                  images: images,
                });
              }
            }}
          />
        </div>

        <FormProgressIndicator
          selectedCategory={selectedCategory?.name || ""}
          selectedLocation={selectedLocation}
          imagesCount={images.length}
          getProgressPercentage={getProgressPercentage}
        />

        <FormSummary
          selectedCategory={selectedCategory?.name || ""}
          selectedLocation={selectedLocation}
          imagesCount={images.length}
        />
      </main>
    </FormLayout>
  );
};

export default PostAdForm;
