"use client";

import Image from "next/image";
import { FC } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ProductImage } from "./ProductDetail";
import { getImageUrl } from "./utils/imageUtils";

interface ThumbnailNavigationProps {
  thumbnails: ProductImage[];
  currentImageIndex: number;
  thumbnailStartIndex: number;
  onImageSelect: (index: number) => void;
  onPrevImage: () => void;
  onNextImage: () => void;
  totalImages: number;
}

const ThumbnailNavigation: FC<ThumbnailNavigationProps> = ({
  thumbnails,
  currentImageIndex,
  thumbnailStartIndex,
  onImageSelect,
  onPrevImage,
  onNextImage,
  totalImages,
}) => {
  console.log(thumbnails);
  return (
    <div className="relative flex mt-6 p-2 border rounded-md w-full max-w-lg">
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 p-2 border border-orange-400
                  rounded-full bg-orange-500 text-white z-10
                  hover:bg-orange-600 hover:scale-110
                  active:bg-orange-700 active:scale-95
                  transition-all duration-200 shadow-md hover:shadow-lg
                  focus:outline-none focus:ring-2 focus:ring-orange-300"
        onClick={onPrevImage}
        aria-label="Previous image"
        disabled={totalImages <= 1}
        style={{ opacity: totalImages <= 1 ? 0.5 : 1 }}
      >
        <FaArrowLeft />
      </button>

      <div className="flex justify-between space-x-2 mx-auto overflow-hidden">
        {thumbnails.map((img: ProductImage, index: number) => (
          <div
            key={img.id || index}
            className={`w-16 h-16 border rounded-sm cursor-pointer transition-all overflow-hidden
              ${
                index + thumbnailStartIndex === currentImageIndex ||
                totalImages === 1
                  ? "border-orange-500 ring-1 ring-orange-500"
                  : "border-gray-300 hover:border-orange-500"
              }`}
            onClick={() => onImageSelect(index + thumbnailStartIndex)}
          >
            <Image
              src={
                img.imageUrl ? getImageUrl(img.imageUrl, 100, 100) : "/f4.png"
              }
              alt={`Thumbnail ${index + 1}`}
              width={100}
              height={100}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/f4.png";
              }}
            />
          </div>
        ))}
      </div>

      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 p-2 border border-orange-400
                 rounded-full bg-orange-500 text-white z-10
                 hover:bg-orange-600 hover:scale-110
                 active:bg-orange-700 active:scale-95
                 transition-all duration-200 shadow-md hover:shadow-lg
                 focus:outline-none focus:ring-2 focus:ring-orange-300"
        onClick={onNextImage}
        aria-label="Next image"
        disabled={totalImages <= 1}
        style={{ opacity: totalImages <= 1 ? 0.5 : 1 }}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default ThumbnailNavigation;
