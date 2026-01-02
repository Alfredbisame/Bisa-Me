"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import Pagination from "../ui/Pagination";
import useRecentViews from "./useRecentViews";
import { useUser } from "../../hooks/useUser";
import { getImageUrl } from "../ProductDetails/utils/imageUtils";

const BrowsingHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { userId, loading: userLoading } = useUser();
  const { recentViews, loading, error, totalPages } = useRecentViews({
    userId: userId || undefined,
    page: currentPage,
    pageSize: 8,
  });

  if (userLoading || loading) {
    return (
      <div>
        <div className="max-w-7xl mx-auto">
          <div className="md:border border-gray-200 rounded-sm shadow-sm mt-4 mb-12 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="md:text-lg font-semibold">BROWSING HISTORY</h2>
              <div className="animate-pulse bg-gray-200 rounded w-24 h-6"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="border p-2 rounded-md animate-pulse"
                >
                  <div className="bg-gray-200 rounded w-full h-40 mb-4"></div>
                  <div className="bg-gray-200 rounded w-3/4 h-4 mb-2"></div>
                  <div className="bg-gray-200 rounded w-full h-3 mb-2"></div>
                  <div className="bg-gray-200 rounded w-1/2 h-3 mb-3"></div>
                  <div className="bg-gray-200 rounded w-1/3 h-4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="max-w-7xl mx-auto">
          <div className="md:border border-gray-200 rounded-sm shadow-sm mt-4 mb-12 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="md:text-lg font-semibold">BROWSING HISTORY</h2>
            </div>
            <div className="text-center py-8 text-red-500">
              <p>Error loading browsing history: {error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Don't show anything if user is not logged in
  if (!userId) {
    return null;
  }
  

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="bg-orange-50/30 rounded-xl shadow-sm mt-4 mb-12 p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="md:text-lg font-semibold text-gray-800">Browse History</h2>
            <Link
              href="/HistoryPage"
              className="text-gray-500 flex items-center"
            >
              View All
              <FaArrowRight className="ml-2" />
            </Link>
          </div>

          {recentViews.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No browsing history found</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                {recentViews.map((product) => (
                  <Link
                    href={`/ProductDetails?id=${product.listingId}`}
                    key={product._id}
                    className="border border-gray-100 p-2 relative transition-all duration-300 hover:bg-orange-50/50 hover:shadow-sm hover:scale-105 cursor-pointer rounded-3xl block"
                  >
                    {product.images && product.images.length > 0 && (
                      <Image
                        src={getImageUrl(product.images[0].imageUrl)}
                        alt={product.title}
                        width={150}
                        height={150}
                        className="w-full md:h-40 object-cover mb-4 rounded-3xl"
                      />
                    )}
                    <h2 className="text-sm font-semibold mb-1">
                      {product.title}
                    </h2>
                    <p className="text-gray-500 text-xs line-clamp-2 overflow-hidden text-ellipsis mb-2">
                      {product.description}
                    </p>
                    <div className="mt-3">
                      <p className="text-gray-500 text-xs mb-2 flex items-center">
                        <FaMapMarkerAlt
                          className="mr-1 text-orange-500"
                          size={12}
                        />
                        {product.location || "Location not specified"}
                      </p>
                      <p className="text-orange-500 font-semibold">
                        {product.price == 0
                          ? "Contact for Price"
                          : `GH₵ ${product.price.toLocaleString()}`}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowsingHistory;
