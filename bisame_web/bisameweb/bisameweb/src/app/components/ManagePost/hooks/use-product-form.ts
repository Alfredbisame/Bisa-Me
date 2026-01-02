import { useState, useEffect, useCallback } from "react";
import { Product } from "../types";

interface UseProductFormProps {
  product?: Product | null;
  productData?: any; // Data from useFetchProductById
}

export interface FormData {
  name: string;
  title?: string;
  description: string;
  location: string;
  price: string | number;
  category?: string;
  subCategory?: string;
  childCategory?: string | null;
  categoryGroup?: string;
  contactNumber?: string;
  negotiable?: boolean | string;
  attributes?: Record<string, any>;
  [key: string]:
    | string
    | number
    | boolean
    | null
    | undefined
    | Record<string, any>;
}

export const useProductForm = ({
  product,
  productData,
}: UseProductFormProps) => {
  const [formData, setFormData] = useState<FormData | null>(null);

  // Initialize form data from product or productData
  useEffect(() => {
    const dataSource = productData || product;

    if (dataSource) {
      setFormData({
        name: dataSource.name || dataSource.title || "",
        title: dataSource.title || dataSource.name || "",
        description: dataSource.description || "",
        location: dataSource.location || "",
        price: dataSource.price || "",
        category: dataSource.category || "",
        subCategory: dataSource.subCategory || "",
        childCategory: dataSource.childCategory || null,
        categoryGroup: dataSource.categoryGroup || "",
        contactNumber: dataSource.contactNumber || "",
        negotiable: dataSource.negotiable ?? true,
        attributes: dataSource.attributes || {},
      });
    }
  }, [product, productData]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
    },
    []
  );

  const updateField = useCallback((field: string, value: any) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev));
  }, []);

  const resetForm = useCallback(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        location: product.location || "",
        price: product.price || "",
        category: (product as any).category || "",
        subCategory: (product as any).subCategory || "",
        childCategory: (product as any).childCategory || null,
        contactNumber: (product as any).contactNumber || "",
      });
    }
  }, [product]);

  return {
    formData,
    setFormData,
    handleChange,
    updateField,
    resetForm,
  };
};
