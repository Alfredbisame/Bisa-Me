import React from "react";
import {
  PostServiceFormProvider,
  usePostServiceForm,
} from "../PostServiceFormComponents";
import PostAdHeader from "../PostAdHeader";
import LocationSelector from "../LocationSelector";
import PhotoUploadSection from "../PhotoUploadSection";
import SubmitButton from "../SubmitButton";
import FormLayout from "../PostServiceFormComponents/FormLayout";
import FormProgressIndicator from "../PostServiceFormComponents/FormProgressIndicator";
import { FormSummary } from "../PostServiceFormComponents/FormSummary";
import { ServiceSelection } from "./useServiceSelector";
import { UploadedImage } from "../PostServiceFormComponents/usePostAdForm";
import {
  Group,
  handleGroupInput,
} from "@/app/sell/allcategory/utils/categories";
import { LocationProps } from "../PostServiceFormComponents/FormContext";
import { BottomNavigation } from "../../BottomNavigation";

interface PostServiceFormProps {
  onBack?: () => void;
  onServiceSelect?: (service: ServiceSelection) => void;
  onLocationSelect?: (city: string, region: string) => void;
  onSubmit?: (data: {
    service: ServiceSelection;
    location: LocationProps;
    images: string[];
  }) => void;
  onClear?: () => Promise<boolean> | void;
  className?: string;
  group?: Group; // optional to allow omission when using unified flow
}

export const PostServiceFormContent: React.FC<PostServiceFormProps> = ({
  onBack,
  onServiceSelect,
  onLocationSelect,
  onSubmit,
  onClear,
  group,
}) => {
  const {
    selectedService,
    selectedLocation,
    images,
    isSubmitting,
    handleServiceSelect,
    handleLocationSelect,
    handleImagesChange,
    handleClearForm,
    handleBack,
  } = usePostServiceForm({
    onBack,
    onServiceSelect,
    onLocationSelect,
    onSubmit,
    onClear,
  });

  const isFormValid = React.useMemo(
    () =>
      Boolean(
        selectedService?.category &&
          selectedService.subcategory &&
          selectedLocation.city &&
          selectedLocation.region &&
          images.length > 2
      ),
    [selectedService, selectedLocation, images.length]
  );

  const getProgressPercentage = React.useCallback(() => {
    let progress = 0;
    if (selectedService?.category && selectedService.subcategory) {
      console.log("selectedServices: " + JSON.stringify(selectedService));
      progress += 33;
      console.log(progress);
    }
    if (selectedLocation.city && selectedLocation.region) {
      console.log("selectedLocation: " + JSON.stringify(selectedLocation.city));
      progress += 33;
      console.log(progress);
    }
    if (images.length > 0) {
      console.log("images.length > 0: " + (images.length > 0));
      progress += 17;
      console.log(progress);
    }
    if (images.length > 2) {
      console.log("images.length > 2: " + (images.length > 2));
      progress += 17;
      console.log(progress);
    }

    console.log(progress);
    return progress;
  }, [selectedService, selectedLocation, images.length]);

  const props = React.useMemo(
    () => ({ onServiceSelect: handleServiceSelect, selectedService }),
    [handleServiceSelect, selectedService]
  );

  return (
    <FormLayout>
      <PostAdHeader
        onClear={handleClearForm}
        onBack={handleBack}
        group={group}
      />
      <main className="bg-white shadow-sm p-4 md:p-8 mx-4 mb-8">
        <div className="flex flex-col space-y-6">
          <FormProgressIndicator
            selectedCategory={
              selectedService
                ? `${selectedService.category} > ${selectedService.subcategory} > ${selectedService.childcategory}`
                : ""
            }
            selectedLocation={selectedLocation.city}
            imagesCount={images.length}
            getProgressPercentage={getProgressPercentage}
          />
          {group ? handleGroupInput(group, props) : null}
          <PhotoUploadSection
            onImagesChange={handleImagesChange}
            maxImages={10}
            maxFileSize={5}
          />
          <LocationSelector
            selectedLocation={selectedLocation}
            onSelect={handleLocationSelect}
          />
          <SubmitButton
            isEnabled={isFormValid}
            isLoading={isSubmitting}
            text={isSubmitting ? "Processing..." : "Next"}
            onClick={() => {
              if (isFormValid && onSubmit) {
                onSubmit({
                  service: selectedService!,
                  location: selectedLocation,
                  images: images.map((img) => img.preview),
                });
              }
            }}
          />
        </div>
        <FormSummary
          selectedService={selectedService}
          selectedLocation={selectedLocation.city}
          images={images}
        />
      </main>
      <BottomNavigation />
    </FormLayout>
  );
};

export const PostServiceForm: React.FC<PostServiceFormProps> = (props) => {
  return (
    <PostServiceFormProvider>
      <PostServiceFormContent {...props} />
    </PostServiceFormProvider>
  );
};
