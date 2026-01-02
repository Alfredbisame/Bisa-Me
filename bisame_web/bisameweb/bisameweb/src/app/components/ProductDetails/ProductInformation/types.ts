export type TabType = 'DESCRIPTION' | 'ADDITIONAL INFORMATION' | 'REVIEW';

export interface ProductImage {
  imageUrl: string;
  id: string;
  [key: string]: unknown;
}

export interface Product {
  _id: string;
  id: string;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  childCategory?: string | null;
  price: number | string;
  contactNumber: string;
  totalViews: number;
  location: string;
  userId: string;
  isPromoted: boolean;
  images: ProductImage[];
  userInfo: {
    name: string;
    profilePicture: string;
    [key: string]: unknown;
  };
  status: string;
  negotiable: boolean;
  attributes: {
    [key: string]: unknown;
  };
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
  totalReviews: number;
  isFollowed: boolean;
  [key: string]: unknown;
}