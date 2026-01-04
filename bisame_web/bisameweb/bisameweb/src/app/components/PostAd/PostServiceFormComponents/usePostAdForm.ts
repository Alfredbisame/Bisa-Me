import { useState } from "react";
import { LocationProps, usePostServiceFormContext } from "./FormContext";
import { ServiceSelection } from "../ServiceCategorySelector";

export interface UploadedImage {
  id: string;
  file?: File | null;
  preview: string;
  isMain?: boolean;
}

export interface PostServiceFormData {
  service: ServiceSelection;
  location: LocationProps;
  images: string[];
}

export interface PostServiceFormCallbacks {
  onClear?: () => Promise<boolean> | void;
  onServiceSelect?: (service: ServiceSelection) => void;
  onLocationSelect?: (city: string, region: string) => void;
  onBack?: () => void;
  onSubmit?: (data: PostServiceFormData) => void;
}

export const usePostServiceForm = (callbacks: PostServiceFormCallbacks) => {
  const {
    selectedService,
    setSelectedService,
    selectedLocation,
    setSelectedLocation,
    images,
    setImages,
    clearForm,
  } = usePostServiceFormContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleServiceSelect = (service: ServiceSelection) => {
    setSelectedService(service);
    callbacks.onServiceSelect?.(service);
  };

  const handleLocationSelect = (city: string, region: string) => {
    setSelectedLocation({ city, region });
    callbacks.onLocationSelect?.(city, region);
  };

  const handleImagesChange = (
    hasImages: boolean,
    uploadedImages?: UploadedImage[] | string[]
  ) => {
    if (!uploadedImages) return;

    // If caller provided an array of strings (server URLs), convert to UploadedImage[]
    if (
      Array.isArray(uploadedImages) &&
      typeof uploadedImages[0] === "string"
    ) {
      const urls = uploadedImages as string[];
      const imgs: UploadedImage[] = urls.map((url, idx) => ({
        id: `from-urls-${idx}-${Math.random().toString(36).substr(2, 9)}`,
        file: null,
        preview: url,
        isMain: idx === 0,
      }));
      setImages(imgs);
      return;
    }

    // Otherwise assume UploadedImage[]
    setImages(uploadedImages as UploadedImage[]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedService && selectedLocation && images.length >= 3) {
      setIsSubmitting(true);
      try {
        await callbacks.onSubmit?.({
          service: selectedService,
          location: selectedLocation,
          images: images.map((img) => img.preview),
        });
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleClearForm = async () => {
    const result = await callbacks.onClear?.();
    if (result !== false) {
      clearForm();
      images.forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });
    }

    localStorage.removeItem("baseFormData");
  };

  const handleBack = () => {
    callbacks.onBack?.();
  };

  return {
    selectedService,
    selectedLocation,
    images,
    isSubmitting,
    handleServiceSelect,
    handleLocationSelect,
    handleImagesChange,
    handleSubmit,
    handleClearForm,
    handleBack,
  };
};
