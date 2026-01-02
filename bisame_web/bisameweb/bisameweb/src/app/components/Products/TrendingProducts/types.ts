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
  images: Array<{
    imageUrl: string;
    id: string;
    originalUrl?: string;
    updatedAt?: string;
  }>;
  userInfo: {
    name: string;
    profilePicture: string;
  };
  status: string;
  message: string;
  negotiable: boolean;
  attributes: {
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
    numberOfCores: string | null;
    capacity: string | null;
    displaysize: string | null;
    cardName: string | null;
    cardMemory: string | null;
    gender: string | null;
    formulation: string | null;
    exterior: string | null;
    lining: string | null;
    keyFeatures: string | null;
  };
  __v: number;
}

export interface TrendingProductsProps {
  maxProducts?: number;
  showHeader?: boolean;
  showViewAllLink?: boolean;
}

export interface ProductCardProps {
  product: Product;
  index: number;
  onClick: (product: Product) => void;
}

export interface TrendingHeaderProps {
  showViewAllLink?: boolean;
}

export interface LoadingSkeletonProps {
  count?: number;
}