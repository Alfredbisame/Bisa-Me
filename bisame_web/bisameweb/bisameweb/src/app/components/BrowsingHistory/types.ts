import { ImageLink } from '../ProductDetails/utils/imageUtils';

export interface RecentViewImage {
  imageUrl: ImageLink;
  id: string;
}

export interface RecentViewListing {
  _id: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string | null;
  createdBy: string | null;
  userId: string;
  listingId: string;
  category: string;
  subCategory: string;
  childCategory: string | null;
  totalViews: number;
  listingStatus: string;
  title: string;
  price: number;
  images: RecentViewImage[];
  location: string | null;
  description: string;
  __v: number;
}

export interface RecentViewsResponse {
  code: number;
  data: {
    results: RecentViewListing[];
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
  message: string;
}