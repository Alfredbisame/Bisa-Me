"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaMapMarkerAlt } from "react-icons/fa";
import { getImageUrl } from "@/app/components/ProductDetails/utils/imageUtils";
import { useState } from "react";
import { getPromoBadge } from "./utils/getPromoBadge";

//Product interface
interface ProductImage {
  imageUrl: string;
  id: string;
  originalUrl?: string;
  updatedAt?: string;
}

export interface NewProduct {
  _id: string;
  id: string;
  title: string;
  description?: string;
  price: number;
  location?: string;
  images: ProductImage[];
  city?: string;
  region?: string;
  badge?: {
    text: string;
    color: string;
  };
  originalPrice?: number;
  isPromoted: boolean;
  akodeaPromoBadge: boolean;
  akwaabaPromoBadge: boolean;
  ohenePromoBadge: boolean;
  sikaPromoBadge: boolean;
}

const ProductCard: React.FC<{ product: NewProduct }> = ({ product }) => {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  const handleProductClick = () => {
    if (product.id) {
      router.push(`/ProductDetails?id=${product.id}`);
    }
  };

  // Get the first image URL and process it with imageUtils
  const getProcessedImageUrl = () => {
    if (!product.images || product.images.length === 0) return "/f4.png";
    const imageUrl =
      product.images[0].imageUrl || product.images[0].originalUrl || "/f4.png";
    return getImageUrl(imageUrl, 500, 500);
  };

  const imageUrl = getProcessedImageUrl();
  const fallbackImage = "/f4.png";

  // Construct location string
  const locationText =
    product.location ||
    (product.city && product.region
      ? `${product.city}, ${product.region}`
      : "");

  // Format price
  const formatPrice = (price: number) => {
    if (!price || price === 0) return "Contact for Price";
    return `GH₵ ${price.toLocaleString()}`;
  };

  console.log(product);

  return (
    <div
      className="shadow-md p-3 relative transition-all duration-300 hover:bg-gray-100 hover:shadow-md hover:scale-105 cursor-pointer rounded-md"
      onClick={handleProductClick}
    >
      <div className="relative">
        {product.badge && (
          <span
            className={`absolute top-4 right-4 ${product.badge.color} text-white text-xs font-semibold px-2 py-1 rounded-md z-10`}
          >
            {product.badge.text}
          </span>
        )}

        {product.isPromoted && !product.badge && (
          <div className="absolute right-3 top-3 z-10 bg-orange-50 p-1 rounded-md">
            <Image
              src={getPromoBadge(product)}
              alt={product.title}
              width={20}
              height={20}
            />
            {/* <span className="bg-gray-800 text-white text-xs font-semibold px-1.5 sm:px-2 sm:py-1 rounded text-[10px] sm:text-xs py-1">
                    PROMOTION
                  </span> */}
          </div>
        )}
        <div className="aspect-square w-full h-36 xl:h-60 relative overflow-hidden mb-2 rounded-md">
          <Image
            src={
              product.images && product.images.length > 0
                ? getImageUrl(product.images[0].imageUrl)
                : "/f4.png"
            }
            alt={product.title}
            fill
            className="object-cover"
            onError={(e) => {
              // Fallback to placeholder on image error
              (e.target as HTMLImageElement).src = "/f4.png";
            }}
          />
        </div>

        {/* <div className="aspect-square w-full h-52 2xl:h-60 relative overflow-hidden mb-2 rounded-md">
          <Image
            src={imageError ? fallbackImage : imageUrl}
            alt={product.title || "Product image"}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={() => setImageError(true)}
          />
        </div> */}
      </div>

      <h2 className="text-xs md:text-sm font-semibold mb-1 line-clamp-2">
        {product.title.toUpperCase()}
      </h2>

      {product.description && (
        <p className="text-gray-500 text-xs line-clamp-2 overflow-hidden text-ellipsis mb-2">
          {product.description}
        </p>
      )}

      <div className="mt-3">
        {locationText && (
          <p className="text-gray-500 text-xs mb-2 flex items-center">
            <FaMapMarkerAlt className="mr-1 text-orange-500" size={12} />
            {locationText}
          </p>
        )}

        <div className="flex items-center space-x-2 text-sm md:text-base">
          {product.originalPrice && product.price !== 0 && (
            <span className="text-gray-500 line-through text-xs">
              GH₵{product.originalPrice.toLocaleString()}
            </span>
          )}
          <span className="text-orange-500 font-bold">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
