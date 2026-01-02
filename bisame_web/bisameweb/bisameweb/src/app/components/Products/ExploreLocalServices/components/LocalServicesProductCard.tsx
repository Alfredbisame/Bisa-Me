import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";
import { getImageUrl } from "../../../ProductDetails/utils/imageUtils";
import { LocalServicesProductCardProps } from "../types";
import { getPromoBadge } from "../../utils/getPromoBadge";

const LocalServicesProductCard = ({
  product,
  index,
  onClick,
}: LocalServicesProductCardProps) => {
  const formatPrice = (price: number) => {
    // Handle case where price is 0 or null/undefined
    if (price === null || price === undefined || price === 0) {
      return "Contact for Price";
    }

    // For number prices, format directly
    return `GH₵${price.toLocaleString()}`;
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div
      onClick={() => onClick(product)}
      className="shadow-md p-3 relative transition-all duration-300 hover:bg-gray-100 hover:shadow-md hover:scale-105 cursor-pointer h-auto flex flex-col rounded-md min-h-[20rem]"
    >
      {product.isPromoted && (
        <div className="absolute right-5 top-5 z-10 bg-orange-50 p-1 rounded-md">
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

      <div className="aspect-square w-full h-36 xl:h-72 relative overflow-hidden mb-2 rounded-md">
        <Image
          src={
            product.images && product.images.length > 0
              ? getImageUrl(product.images[0].imageUrl)
              : "/f4.png"
          }
          alt={product.title}
          fill
          className="object-cover"
          priority={index < 4}
          onError={(e) => {
            // Fallback to placeholder on image error
            (e.target as HTMLImageElement).src = "/f4.png";
          }}
        />
      </div>

      <h2 className="text-xs sm:text-sm font-semibold mb-1">
        {truncateText(product.title.toLocaleUpperCase(), 40)}
      </h2>

      <p className="text-gray-500 text-xs line-clamp-2 overflow-hidden text-ellipsis mb-2">
        {truncateText(product.description, 80)}
      </p>

      <div className="mt-auto">
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

export default LocalServicesProductCard;
