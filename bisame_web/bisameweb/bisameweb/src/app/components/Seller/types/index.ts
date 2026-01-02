// types.ts or seller-types.ts
// Place this file in your Seller component directory

export interface UserInfo {
  name: string;
  image?: string;
  upgrade?: string;
  email?: string;
  phone?: string;
  memberSince?: string;
}

export interface Product {
  id: string;
  pageid?: string;
  title: string;
  description?: string;
  price: string | number;
  location: string;
  contactNumber: string;
  userInfo?: UserInfo;
  userId?: string;
  category?: string;
  subcategory?: string;
  childcategory?: string;
  image?: Array<{ image_link: string }>;
  status?: string;
  postdate?: string;
  promoted?: boolean | null;
}

export interface ProductData {
  results: Product[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface FetchListingsBySellerReturn {
  newProductData: ProductData | undefined;
  isLoadingProduct: boolean;
  error: Error | null;
}

export interface SellerStatsProps {
  totalAds: number;
  activeAds: number;
  memberSince: string;
  location: string;
  showTrends: boolean;
  phoneNumber: string;
}

export interface CallSellerProps {
  phoneNumber: string;
  sellerId: string | undefined;
  onCall: () => void;
}

export interface SellerProfileProps {
  product?: Product;
  sellerName?: string;
  sellerImage?: string;
  memberSince?: string;
}

export interface SellerAdsGridProps {
  products: Product[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
