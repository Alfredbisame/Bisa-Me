"use client";

import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  priority?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
  priority = false,
}) => {
  const formatPrice = (price: number | string) => {
    // Handle case where price is 0 or null/undefined
    if (price === null || price === undefined || price === 0) {
      return "Contact for Price";
    }

    if (typeof price === "string" && price === "N/A")
      return "Contact for Price";
    if (typeof price === "string") {
      const numericPrice = parseFloat(price.replace(/[^0-9.-]/g, ""));
      return isNaN(numericPrice)
        ? "Contact for Price"
        : `GH₵ ${numericPrice.toLocaleString()}`;
    }
    return `GH₵ ${price.toLocaleString()}`;
  };

  // Get the first image from the product
  const firstImage = product.images?.[0] || product.image?.[0];

  // Extract image URL from the image object
  const imageLink = firstImage?.imageUrl || firstImage?.image_link || "";

  return (
    <div
      onClick={() => onClick(product)}
      className="bg-white shadow-md p-3 rounded-md hover:bg-gray-100 hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer"
    >
      <div className="relative">
        {/* Badge for Promoted */}
        {product.isPromoted && (
          <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
            PROMOTED
          </span>
        )}

        <div className="aspect-[4/3] w-full h-52 xl:h-72 relative overflow-hidden mb-2 rounded-md">
          <Image
            src={imageLink as string}
            alt={product.title}
            fill
            className="object-cover"
            priority={priority}
          
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/f4.png";
            }}
          />
        </div>
      </div>

      <div className="mt-3 sm:mt-4">
        <p className="text-gray-700 mt-1 sm:mt-2 text-sm sm:text-base truncate">
          {product.title}
        </p>
        <p className="text-gray-500 text-xs line-clamp-2 overflow-hidden text-ellipsis mb-2">
          {product.description}
        </p>
        <div className="mt-3">
          <p className="text-gray-500 text-xs mb-2 flex items-center">
            <FaMapMarkerAlt className="mr-1 text-orange-500" size={12} />
            {product.location}
          </p>
          <p className="text-orange-500 font-bold">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
