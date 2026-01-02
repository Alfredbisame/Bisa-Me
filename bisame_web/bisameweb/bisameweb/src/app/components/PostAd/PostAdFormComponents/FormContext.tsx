"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { UploadedImage } from "./usePostAdForm";

interface Category {
  id: string;
  name: string;
  group?: string;
}

interface PostAdFormContextType {
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category | null) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  images: UploadedImage[];
  setImages: (images: UploadedImage[]) => void;
  clearForm: () => void;
}

const PostAdFormContext = createContext<PostAdFormContextType | undefined>(
  undefined
);

export const PostAdFormProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedLocation, setSelectedLocation] = useState("");
  const [images, setImages] = useState<UploadedImage[]>([]);

  const clearForm = () => {
    setSelectedCategory(null);
    setSelectedLocation("");
    setImages([]);
  };

  return (
    <PostAdFormContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedLocation,
        setSelectedLocation,
        images,
        setImages,
        clearForm,
      }}
    >
      {children}
    </PostAdFormContext.Provider>
  );
};

export const usePostAdFormContext = () => {
  const context = useContext(PostAdFormContext);
  if (!context) {
    throw new Error(
      "usePostAdFormContext must be used within a PostAdFormProvider"
    );
  }
  return context;
};
