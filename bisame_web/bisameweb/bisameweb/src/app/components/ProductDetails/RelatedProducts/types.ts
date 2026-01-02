export interface ProductImage {
  imageUrl: string;
  id: string;
  [key: string]: unknown;
}

export interface ProductUserInfo {
  name: string;
  profilePicture: string;
  [key: string]: unknown;
}
export interface Product {
  _id: string;
  id: string;

  title: string;
  description: string;
  category: string;
  subCategory: string;
  childCategory?: string;

  price: number | string;
  contactNumber: string;
  totalViews: number;
  location: string;

  userId?: string;
  isPromoted?: boolean;

  image?: ProductImage[];
  images?: ProductImage[];

  userInfo?: ProductUserInfo;
  status?: string;
  negotiable?: boolean;
  attributes?: {
    [key: string]: unknown;
  };

  createdAt: string;
  updatedAt: string;

  [key: string]: unknown;
}
export interface RelatedProductsProps {
  selectedProduct?: Product;
}
