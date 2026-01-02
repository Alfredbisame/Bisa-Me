import React from "react";
import SellerProfile from "./SellerProfile";
import ViewAllAds from "./ViewAllAds";
import SellerActions from "./SellerActions";
import SellerInformationLoading from "./SellerInformationLoading";
import SellerInformationError from "./SellerInformationError";

export type SellerProductInfo = {
  userInfo?: {
    name?: string;
    profilePicture?: string;
  };
  contactNumber?: string;
  title?: string;
  userId?: string;
} | null;

interface SellerInformationProps {
  product: {
    userInfo?: {
      name?: string;
      profilePicture?: string;
    };
    contactNumber?: string;
    title?: string;
    userId?: string;
  } | null;
  isLoading: boolean;
  error: unknown;
  className?: string;
  customMessage?: string;
  onReport?: () => void;
  onViewAllAds?: () => void;
  listingId?: string;
}

const SellerInformation: React.FC<SellerInformationProps> = ({
  product,
  isLoading,
  error,
  customMessage,
  onReport,
  onViewAllAds,
  listingId,
}) => {
  // Handle loading state
  if (isLoading) {
    return <SellerInformationLoading />;
  }

  // Handle error state
  if (error) {
    return (
      <SellerInformationError message="Failed to load seller information." />
    );
  }

  // Handle no product state
  if (!product) {
    return (
      <div className="lg:col-span-1 lg:border-l lg:pl-8 border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Seller Information
        </h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-gray-500 text-sm">
            Seller information not available.
          </p>
        </div>
      </div>
    );
  }

  // Default view all ads handler
  const handleViewAllAds = () => {
    if (onViewAllAds) {
      onViewAllAds();
    } else {
      window.location.href = "/seller";
    }
  };

  return (
    <div className="lg:col-span-1 lg:border-l lg:pl-8 border-gray-200">
      <h2 className="md:text-xl font-semibold mb-4 text-gray-900">
        Seller Information
      </h2>

      {/* Seller Profile */}
      <SellerProfile product={product} />

      {/* View All Ads Button */}
      <ViewAllAds product={product} onViewAllAds={handleViewAllAds} />

      {/* Seller Actions */}
      <SellerActions
        customMessage={customMessage}
        onReport={onReport}
        listingId={listingId}
        product={product} // Pass product to SellerActions
      />
    </div>
  );
};

export default SellerInformation;
