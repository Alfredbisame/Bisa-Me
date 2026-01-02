import { useState } from "react";
import { usePostAdFormContext } from "./FormContext";

export interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  isMain?: boolean;
}

export interface Category {
  id: string;
  name: string;
  group?: string;
}

export interface PostAdFormData {
  category: Category;
  location: string;
  images: UploadedImage[];
}

export interface PostAdFormCallbacks {
  onClear?: () => Promise<boolean> | void;
  onCategorySelect?: (category: Category) => void;
  onLocationSelect?: (location: string) => void;
  onBack?: () => void;
  onSubmit?: (data: PostAdFormData) => void;
}

export const usePostAdForm = (callbacks: PostAdFormCallbacks) => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedLocation,
    setSelectedLocation,
    images,
    setImages,
    clearForm,
  } = usePostAdFormContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    callbacks.onCategorySelect?.(category);
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    callbacks.onLocationSelect?.(location);
  };

  const handleImagesChange = (
    hasImages: boolean,
    uploadedImages?: UploadedImage[]
  ) => {
    if (uploadedImages) {
      setImages(uploadedImages);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategory && selectedLocation && images.length > 0) {
      setIsSubmitting(true);
      try {
        await callbacks.onSubmit?.({
          category: selectedCategory,
          location: selectedLocation,
          images: images,
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
    // Only clear the form if the callback returns true (user confirmed) or if no callback is provided
    if (result !== false) {
      clearForm();
      images.forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });
    }
  };

  const handleBack = () => {
    callbacks.onBack?.();
  };

  return {
    selectedCategory,
    selectedLocation,
    images,
    isSubmitting,
    handleCategorySelect,
    handleLocationSelect,
    handleImagesChange,
    handleSubmit,
    handleClearForm,
    handleBack,
  };
};
