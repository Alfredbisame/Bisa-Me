
export interface ProductImage {
  image_link: string;
  alt?: string;
}


export interface UserInfo {
  name: string;
  image?: string;
  date?: string;
  phone?: string;
  email?: string;
  upgrade?: string;
}


export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  location: string;
  image: ProductImage[];
  userid: string;
  info?: UserInfo;
  phone?: string;
  category?: string;
  subcategory?: string;
  condition?: string;
  upgrade?: string;
  brand?: string;
  features?: string[];
  tags?: string[];
  views?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Seller interface for seller page data
export interface Seller {
  id: string;
  name: string;
  image?: string;
  phone?: string;
  email?: string;
  totalAds: number;
  followers: number;
  upgrade?: string;
  following: number;
  joinedDate?: string;
  verified?: boolean;
  rating?: number;
  products: Product[];
}

// Props interfaces for components
export interface SellerAdsGridProps {
  products: Product[];
  isLoading?: boolean;
  className?: string;
}

export interface SellerStatsProps {
  totalAds: number;
  followers: number;
  following: number;
  className?: string;
  upgrade?: string;
}

export interface CallSellerProps {
  phoneNumber?: string;
  sellerName?: string;
  onCall?: () => void;
  className?: string;
}

export interface ViewAllAdsProps {
  userId?: string;
  onViewAllAds?: () => void;
  className?: string;
}


export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Search and filter interfaces
export interface ProductFilters {
  category?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string;
  search?: string;
  sortBy?: string;
}

// Reply interface for review replies
export interface Reply {
  message: string;
  id: string;
  date: string;
  reviewerId: string;
  reviewerName: string;
  isSeller: boolean;
}

// Review interface for product reviews
export interface Review {
  id: string;
  listingId: string;
  rating: number;
  comment: string;
  reviewerName: string;
  reviewerPhoneNumber: string;
  reviewerProfilePicture: string;
  reviewerId: string;
  listingTitle: string;
  listingCategory: string;
  listingSubCategory: string;
  listingUserId: string;
  attachments: unknown[];
  replies: Reply[];
  totalLikes: number;
  isLikedByCurrentUser: boolean;
  createdAt: string;
  updatedAt: string | null;
}
