import React, { createContext, useContext, useState, ReactNode } from "react";
import { UploadedImage } from "./usePostAdForm";
import type { ServiceSelection } from "../ServiceCategorySelector/useServiceSelector";

export interface AllCategoriesProps {
  category: string;
  subCategory: string;
}

export interface LocationProps {
  city: string;
  region: string;
}

interface PostServiceFormContextType {
  selectedService: ServiceSelection | null;
  setSelectedService: (service: ServiceSelection | null) => void;
  selectedLocation: LocationProps;
  setSelectedLocation: (location: LocationProps) => void;
  images: UploadedImage[];
  setImages: (images: UploadedImage[]) => void;
  clearForm: () => void;
  allCategories: AllCategoriesProps | undefined;
  updateCategories: (categories: AllCategoriesProps) => void;
}

const PostServiceFormContext = createContext<
  PostServiceFormContextType | undefined
>(undefined);

export const PostServiceFormProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedService, setSelectedService] =
    useState<ServiceSelection | null>(null);

  const [selectedLocation, setSelectedLocation] = useState<LocationProps>({
    city: "",
    region: "",
  });

  const [images, setImages] = useState<UploadedImage[]>([]);

  const [allCategories, setAllCategories] = useState<AllCategoriesProps>();

  const updateCategories = (categories: AllCategoriesProps) => {
    setAllCategories(categories);
  };

  const clearForm = () => {
    setSelectedService(null);
    setSelectedLocation({ city: "", region: "" });
    setImages([]);
    setAllCategories(undefined);
  };

  return (
    <PostServiceFormContext.Provider
      value={{
        selectedService,
        setSelectedService,
        selectedLocation,
        setSelectedLocation,
        images,
        setImages,
        clearForm,
        allCategories,
        updateCategories,
      }}
    >
      {children}
    </PostServiceFormContext.Provider>
  );
};

export const usePostServiceFormContext = () => {
  const context = useContext(PostServiceFormContext);
  if (!context) {
    throw new Error(
      "usePostServiceFormContext must be used within a PostServiceFormProvider"
    );
  }
  return context;
};
