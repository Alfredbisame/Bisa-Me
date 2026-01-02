import React from "react";
import { FaStore, FaExternalLinkAlt } from "react-icons/fa";
import { useSeller } from "@/app/components/Seller/useSeller";
import { SellerProductInfo } from "./SellerInformation";
import Link from "next/link";

interface ViewAllAdsProps {
  onViewAllAds?: () => void;
  className?: string;
  product: SellerProductInfo;
}

const ViewAllAds: React.FC<ViewAllAdsProps> = ({ className = "", product }) => {
  const { data, loading } = useSeller();

  return (
    <div className={`mb-4 ${className}`}>
      <Link
        href={`/seller/${product?.userId}`}
        className={`
          group flex items-center justify-center gap-2
          w-full px-6 py-3.5 font-semibold text-white
          bg-orange-500 hover:bg-orange-600 active:bg-orange-700
          rounded-lg shadow-md hover:shadow-lg
          transition-all duration-200
          transform hover:scale-[1.02] active:scale-[0.98]
        `}
      >
        <FaStore className="group-hover:animate-pulse" />
        <span className="flex items-center">
          VIEW ALL ADS
          {loading ? (
            <div className="ml-2 inline-flex items-center">
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : typeof data?.active === "number" ? (
            ` (${data.active})`
          ) : (
            ""
          )}
        </span>
        <FaExternalLinkAlt className="text-sm opacity-75 group-hover:opacity-100 transition-opacity" />
      </Link>
    </div>
  );
};

export default ViewAllAds;
