"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaMapMarkerAlt } from "react-icons/fa";
import EmptyState from "./EmptyState";
import { getImageUrl } from "./utils";
import Pagination from "../ui/Pagination";

export interface SellerListing  {
  _id: string;
  userId: string;
  title: string;
  description: string;
  price: string;
  location: string;
  images: { imageUrl: string; id: string }[];
  category: string;
  subCategory: string;
  contactNumber: string;
  status: string;
  id: string;
  userInfo: {
    name: string;
    image: string;
  };
}

interface SellerAdsGridProps {
  products?: SellerListing[];
  isLoading?: boolean;
  className?: string;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const SellerAdsGrid: React.FC<SellerAdsGridProps> = ({
  products,
  isLoading = false,
  className = "",
  page: currentPage,
  totalPages,
  onPageChange,
}) => {
  const router = useRouter();

  const handleProductClick = (product: SellerListing) => {
    router.push(`/ProductDetails?id=${product.id}`);
  };

  // Skeleton loader while fetching
  if (isLoading) {
    return (
      <div
        className={`grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto ${className}`}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="border p-4 rounded-xl animate-pulse bg-gray-100"
          >
            <div className="aspect-square w-full bg-gray-300 rounded-lg mb-4" />
            <div className="h-4 bg-gray-300 rounded mb-2" />
            <div className="h-3 bg-gray-300 rounded mb-2" />
            <div className="h-3 bg-gray-300 rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  // No products case
  if (!products || products.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <div
        className={`grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto ${className}`}
      >
        {products.map((product, index) => {
          const cleanLocation = product.location
            ?.split(",")
            .map((loc) => loc.trim())
            .filter(Boolean)
            .join(", ");

          const mainImageUrl = product.images?.[0]?.imageUrl || "/f4.png"; // fallback if no image

          const userImageUrl =
            product.userInfo?.image || "/default-profile.png";

          return (
            <div
              key={product._id || index}
              onClick={() => handleProductClick(product)}
              className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col"
            >
              {/* Product Image */}
              <div className="relative w-full aspect-square">
                <Image
                  src={getImageUrl(mainImageUrl) || "/f4.png"} // ensure string
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority={index < 4}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/f4.png";
                  }}
                />
              </div>

              <div className="p-4 flex flex-col flex-1">
                {/* Title */}
                <h2 className="text-sm font-semibold mb-1 line-clamp-1">
                  {product.title}
                </h2>

                {/* Description */}
                <p className="text-gray-500 text-xs line-clamp-2 mb-2">
                  {product.description}
                </p>

                {/* Seller Info */}
                <div className="flex items-center mb-2">
                  {userImageUrl && (
                    <div className="w-6 h-6 mr-2 relative flex-shrink-0">
                      <Image
                        src={
                          getImageUrl(userImageUrl) || "/default-profile.png"
                        }
                        alt={product.userInfo?.name || "Seller"}
                        fill
                        className="rounded-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/default-profile.png";
                        }}
                      />
                    </div>
                  )}
                  <p className="text-gray-500 text-xs">
                    By: {product.userInfo?.name || "Anonymous"}
                  </p>
                </div>

                {/* Location */}
                <p className="text-gray-500 text-xs mb-2 flex items-center">
                  <FaMapMarkerAlt className="mr-1 text-orange-500" size={12} />
                  {cleanLocation || "Location Not Specified"}
                </p>

                {/* Price */}
                <p className="text-orange-500 font-bold text-sm mt-auto">
                  {/* If formatPrice is okay, use it; otherwise raw price is fine */}
                  {/* {formatPrice(product.price)} */}
                  GHS {product.price}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        showPageInfo={true}
      />
    </>
  );
};

export default SellerAdsGrid;
