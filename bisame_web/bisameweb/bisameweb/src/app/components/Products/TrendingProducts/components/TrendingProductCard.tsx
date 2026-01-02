import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";
import { ProductCardProps } from "../types";
import { useState } from "react";
import { getImageUrl } from "@/app/components/ProductDetails/utils/imageUtils";
import { getPromoBadge } from "../../utils/getPromoBadge";
import { Product } from "../../FeaturedProducts/types";

const TrendingProductCard = ({ product, index, onClick }: ProductCardProps) => {
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price: number) => {
    if (!price || price === 0) return "Contact for Price";

    return `GH₵ ${price.toLocaleString()}`;
  };

  // Get the first image URL and process it with imageUtils
  const getProcessedImageUrl = (
    images: Array<{
      imageUrl: string;
      id: string;
      originalUrl?: string;
      updatedAt?: string;
    }>
  ) => {
    if (!images || images.length === 0) return "/f4.png";
    const imageUrl = images[0].imageUrl || images[0].originalUrl || "/f4.png";
    return getImageUrl(imageUrl, 500, 500);
  };

  const imageUrl = getProcessedImageUrl(product.images);
  const fallbackImage = "/f4.png";

  console.log(product);

  return (
    <div
      onClick={() => onClick(product)}
      className="shadow-md p-3 relative transition-all duration-300 hover:bg-gray-100 hover:shadow-md hover:scale-105 cursor-pointer rounded-md min-h-[20rem]"
    >
      {product.isPromoted && (
        <div className="absolute right-5 top-5 z-10 bg-orange-50 p-1 rounded-md">
          <Image
            src={getPromoBadge(product as Product)}
            alt={product.title}
            width={20}
            height={20}
          />
          {/* <span className="bg-gray-800 text-white text-xs font-semibold px-1.5 sm:px-2 sm:py-1 rounded text-[10px] sm:text-xs py-1">
                  PROMOTION
                </span> */}
        </div>
      )}
      <div className="aspect-square w-full h-36 xl:h-72 relative overflow-hidden mb-2 rounded-md">
        <Image
          src={imageError ? fallbackImage : imageUrl}
          alt={product.title}
          fill
          className="object-cover"
          priority={index < 4}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 40vw, (max-width: 1024px) 33vw, 25vw"
          onError={() => setImageError(true)}
        />
      </div>
      <h2 className="text-sm font-semibold mb-1">{product.title.toUpperCase()}</h2>
      <p className="text-gray-500 text-xs line-clamp-2 overflow-hidden text-ellipsis mb-2">
        {product.description}
      </p>
      <div className="mt-3">
        <p className="text-gray-500 text-xs mb-2 flex items-center">
          <FaMapMarkerAlt className="mr-1 text-orange-500" size={12} />
          {product.location}
        </p>
        <p className="text-orange-500 font-bold truncate">
          {formatPrice(product.price)}
        </p>
      </div>
    </div>
  );
};

export default TrendingProductCard;
