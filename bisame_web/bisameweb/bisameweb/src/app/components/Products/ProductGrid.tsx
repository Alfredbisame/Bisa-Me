"use client";
import ProductCard from "./ProductCard";
import Pagination from "@/app/components/ui/Pagination";

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

interface Product {
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
  badge?: {
    text: string;
    color: string;
  };
  originalPrice?: number;
  akodeaPromoBadge: boolean;
  akwaabaPromoBadge: boolean;
  ohenePromoBadge: boolean;
  sikaPromoBadge: boolean;
}

interface ProductGridProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          showPageInfo={true}
        />
      </div>
    </div>
  );
};

export default ProductGrid;
