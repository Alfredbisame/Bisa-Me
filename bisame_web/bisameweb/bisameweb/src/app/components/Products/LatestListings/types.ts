
export interface ProductImage {
  imageUrl: string;
  id: string;
  originalUrl?: string;
  updatedAt?: string;
}

export interface UserInfo {
  name: string;
  profilePicture: string;
}

export interface ProductAttributes {
  make: string | null;
  model: string | null;
  year: string | null;
  transmission: string | null;
  mileage: number;
  fuel: string | null;
  driveTrain: string | null;
  numberOfSeats: number;
  numberOfCylinders: number;
  engine: number;
  color: string | null;
  exchangeAllowed: boolean;
  address: string | null;
  estateName: string | null;
  size: number;
  type: string | null;
  finishing: string | null;
  bedroom: number;
  bathroom: number;
  serviceCharge: number;
  serviceCovers: string | null;
  agencyFee: number;
  cautionFee: number;
  facilityFeatures: string | null;
  brand: string | null;
  screen: string | null;
  ram: string | null;
  storage: string | null;
  os: string | null;
  display: string | null;
  resolution: string | null;
  sim: string | null;
  card: string | null;
  main: string | null;
  selfie: string | null;
  battery: number;
  subType: string | null;
  processor: string | null;
  numberOfCores: number | null;
  capacity: number | null;
  displaysize: number | null;
  cardName: string | null;
  cardMemory: string | null;
  gender: string | null;
  formulation: string | null;
  exterior: string | null;
  lining: string | null;
  keyFeatures: string | null;
}

export interface Product {
  _id: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string | null;
  createdBy: string | null;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  childCategory: string | null;
  price: number;
  contactNumber: string;
  totalViews: number;
  location: string;
  userId: string;
  isPromoted: boolean;
  images: ProductImage[];
  userInfo: UserInfo;
  status: string;
  message: string;
  negotiable: boolean;
  attributes: ProductAttributes;
  __v: number;
  city: string;
  region: string;
  akodeaPromoBadge: boolean;
  akwaabaPromoBadge: boolean;
  ohenePromoBadge: boolean;
  promotedListingSections: string[];
  searchScore: number;
  sikaPromoBadge: boolean;
  categoryGroup: string;
  isFavorite: boolean;
  totalReviews: number;
  isFollowed: boolean;
  badge?: {
    text: string;
    color: string;
  };
}

export interface ApiResponse {
  code: number;
  data: {
    results: Product[];
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
  message: string;
}

export interface FeaturedProductsProps {
  maxProducts?: number;
  showHeader?: boolean;
  showViewAllLink?: boolean;
}

export interface FeaturedProductCardProps {
  product: Product;
  index: number;
  onClick: (product: Product) => void;
}

export interface FeaturedHeaderProps {
  showViewAllLink?: boolean;
}

export interface LatestListingsProps {
  maxProducts?: number;
  showHeader?: boolean;
  showViewAllLink?: boolean;
}

export interface LatestListingsProductCardProps {
  product: Product;
  index: number;
  onClick: (product: Product) => void;
}

export interface LatestListingsHeaderProps {
  showViewAllLink?: boolean;
}

export interface LoadingSkeletonProps {
  count?: number;
}

export interface StarRatingProps {
  rating?: number;
  showLabel?: boolean;
}
