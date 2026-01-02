import React from "react";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import { formatElapsedTime } from "./utils";

interface ProductUserInfo {
  name?: string;
  profilePicture?: string;
}

interface ProductData {
  userInfo?: ProductUserInfo;
  createdAt?: string;
}

interface SellerProfileProps {
  product?: ProductData;
  className?: string;
}

const SellerProfile: React.FC<SellerProfileProps> = ({
  product,
  className = "",
}) => {
  console.log(product?.userInfo);
  // Use the new API structure
  const name = product?.userInfo?.name || "Unknown Seller";
  const image = product?.userInfo?.profilePicture;
  const date = product?.createdAt;

  return (
    <div className={`p-4 mb-6 ${className}`}>
      <div className="flex items-center mb-4">
        <div className="relative w-16 h-16 mr-4 overflow-hidden rounded-full ring-2 ring-gray-200">
          <Image
            src={image ? image : "/Avatar.png"}
            alt="Seller profile picture"
            fill
            sizes="64px"
            style={{ objectFit: "cover" }}
            className="rounded-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/Avatar.png";
            }}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-gray-900 font-semibold md:text-lg">
            {name?.[0].toUpperCase() + name?.slice(1)}
          </h3>
          <div className="flex items-center text-gray-500 text-xs md:text-sm mt-1">
            <FaCalendarAlt className="mr-2" />
            <span>{date ? formatElapsedTime(date) : "Date not available"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
