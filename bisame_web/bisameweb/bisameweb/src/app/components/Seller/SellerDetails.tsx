"use client";

import React, { useState } from "react";
import SellerProfile from "@/app/components/ProductDetails/ProductInformation/SellerProfile";
import SellerStats from "./SellerStats";
import CallSeller from "./CallSeller";
import SellerAdsGrid from "./SellerAdsGrid";
import { useParams } from "next/navigation";
import useFetchListingsBySeller, {
  ListingsBySellerData,
} from "./hook/use-fetch-listing-by-seller";

const DEFAULT_SELLER = {
  name: "Bisame Default Seller",
  image: "/Avatar1.png",
  memberSince: "2023",
  totalAds: 5,
  activeAds: 3,
  location: "Achimota, Ghana",
  phoneNumber: "+2338000000000",
  upgrade: "",
};

const SellerDetails: React.FC = () => {
  const params = useParams();
  const sellerId = params?.sellerId as string | undefined;

  const [page, setPage] = useState(1);

  const { newProductData, isLoadingProduct, error } =
    useFetchListingsBySeller<ListingsBySellerData>(sellerId ?? "", page);

  const sellerData = newProductData?.results ?? [];

  // ERROR VIEW
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="p-10 bg-white rounded-3xl shadow-xl border border-gray-200 max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-100 to-red-50 rounded-2xl flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-3 text-gray-900">
            Unable to Load Seller
          </h3>
          <p className="text-gray-600 mb-8">
            Something went wrong. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full px-6 py-3.5 bg-orange-600 text-white font-semibold rounded-xl shadow-lg hover:bg-orange-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const firstListing = sellerData[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100">
      <div className="w-full mx-auto sm:px-6 md:px-48 lg:px-56 sm:py-6 md:py-8">
        {/* Header */}
        <div className="mb-10 pb-4 border-b border-gray-200">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
            {firstListing?.userInfo?.name
              ? `${firstListing.userInfo.name.toUpperCase()}'s Store`
              : "Seller's Store"}
          </h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Explore seller’s products
          </p>
        </div>

        {/* Seller Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200/60 mb-10 overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="bg-gradient-to-r from-orange-50 to-white p-2">
            <SellerProfile product={firstListing} />
          </div>

          <div className="px-6 pb-8 bg-gradient-to-b from-white to-gray-50/40">
            <SellerStats
              totalAds={newProductData?.totalCount ?? DEFAULT_SELLER.totalAds}
              activeAds={DEFAULT_SELLER.activeAds}
              memberSince={DEFAULT_SELLER.memberSince}
              location={firstListing?.location ?? DEFAULT_SELLER.location}
              showTrends={false}
              phoneNumber={
                firstListing?.contactNumber ?? DEFAULT_SELLER.phoneNumber
              }
            />

            <div className="mt-6">
              <CallSeller
                phoneNumber={
                  firstListing?.contactNumber ?? DEFAULT_SELLER.phoneNumber
                }
                sellerId={sellerId}
                onCall={() => {}}
              />
            </div>
          </div>
        </div>

        {/* Product Section */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200/60 p-6 sm:p-8 overflow-hidden">
          <div className="flex justify-between items-center mb-8 pb-4 border-b">
            <h2 className="text-2xl font-bold text-gray-900">
              All Ads
              <span className="text-orange-600 font-semibold ml-2">
                ({newProductData?.totalCount ?? 0})
              </span>
            </h2>
          </div>

          <SellerAdsGrid
            isLoading={isLoadingProduct}
            products={sellerData}
            onPageChange={setPage}
            page={page}
            totalPages={newProductData?.totalPages ?? 1}
          />
        </div>
      </div>
    </div>
  );
};

export default SellerDetails;
