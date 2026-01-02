"use client";

import Image from "next/image";
import { FC } from "react";
import { motion } from "framer-motion";
import { getImageUrl } from "./utils/imageUtils";

interface MainImageDisplayProps {
  imageUrl: string;
  imageAlt: string;
  onImageClick: () => void;
}

const MainImageDisplay: FC<MainImageDisplayProps> = ({
  imageUrl,
  imageAlt,
  onImageClick,
}) => {
  // Use imageUtils to process the image URL
  const processedImageUrl = getImageUrl(imageUrl, 800, 800);

  return (
    <motion.div
      className="relative w-full 2xl:max-w-lg border rounded-md overflow-hidden cursor-zoom-in"
      onClick={onImageClick}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* aspect-w-12 aspect-h-4  */}
      <div className="relative h-60 md:h-72 lg:h-96 ">
        <Image
          src={processedImageUrl}
          alt={imageAlt}
          fill
          className="object-cover rounded-sm border "
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/f4.png";
          }}
        />
      </div>
    </motion.div>
  );
};

export default MainImageDisplay;
