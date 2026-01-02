import { Product } from "../types";

export interface UpdateProductProps {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  category: string;
  subCategory: string;
  childCategory: string | null;
  contactNumber: string;
  images: Array<{ imageUrl: string; id: string }>;
  isPromoted: boolean;
  negotiable: boolean;
  attributes: {
    [key: string]: unknown;
  };
  uploadimage?: {
    image: string[];
  };
}

export interface ProductImage {
  id: string;
  imageUrl: string;
}

export interface UpdatePostResult {
  success: boolean;
  message?: string;
  data?: unknown;
}

export interface Products {
  id: string;
  _id: string;
  title: string;
  name: string;
  description: string;
  price: number | string;
  images: ProductImage[];
  location: string;
  status: string;
  message?: string;
  createdAt: string;
  updatedAt: string;
  category?: string;
  subCategory?: string;
  childCategory?: string;
  contactNumber?: string;
  isPromoted?: boolean;
  negotiable?: boolean;
  attributes?: Record<string, unknown>;
}

export interface EditModalProps {
  id: string;
  product?: Product | null;
  onCancel: () => void;
  onSuccess?: (res: UpdatePostResult) => void;
}

export interface FormValues {
  title: string;
  location: string;
  price: string;
  description: string;
  images?: FileList | null;
}

export interface ImageItem {
  imageUrl: string;
  id: string;
}

export interface UpdateProductProps {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  category: string;
  subCategory: string;
  childCategory: string | null;
  contactNumber: string;
  images: Array<{ imageUrl: string; id: string }>;
  isPromoted: boolean;
  negotiable: boolean;
  attributes: {
    [key: string]: unknown;
  };
}

export interface ProductImage {
  id: string;
  imageUrl: string;
}

export interface UpdatePostResult {
  success: boolean;
  message?: string;
  data?: unknown;
}

export interface EditModalProps {
  id: string;
  product?: Product | null;
  onCancel: () => void;
  onSuccess?: (res: UpdatePostResult) => void;
}

export interface FormValues {
  title: string;
  location: string;
  price: string;
  description: string;
  images?: FileList | null;
}

export interface ImageItem {
  imageUrl: string;
  id: string;
}
