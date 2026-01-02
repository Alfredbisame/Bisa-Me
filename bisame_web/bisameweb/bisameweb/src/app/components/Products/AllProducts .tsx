"use client";
import ProductGrid from "@/app/components/Products/ProductGrid";

// Interfaces for the API response
interface ListingImage {
  imageUrl: string;
  id: string;
}

interface UserInfo {
  name: string;
  profilePicture: string;
}

// interface ListingAttributes {
//   [key: string]: any;
// }

export interface ApiProduct {
  _id: string;
  id: string;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  price: number;
  location: string;
  images: ListingImage[];
  userInfo: UserInfo;
  attributes: object;
  city: string;
  region: string;
  childCategory: string;
  contactNumber: string;
  totalViews: number;
  userId: string;
  isPromoted: boolean;
  status: string;
  message: string;
  negotiable: boolean;
  __v: number;
  _textScore: number;
  textScoreNorm: number;
  finalScore: number;
  akodeaPromoBadge: boolean;
  akwaabaPromoBadge: boolean;
  ohenePromoBadge: boolean;
  sikaPromoBadge: boolean;
}

interface AllProductsProps {
  products: ApiProduct[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const AllProducts: React.FC<AllProductsProps> = ({
  products = [],
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
}) => {
  return (
    <ProductGrid
      products={products}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  );
};

export default AllProducts;
