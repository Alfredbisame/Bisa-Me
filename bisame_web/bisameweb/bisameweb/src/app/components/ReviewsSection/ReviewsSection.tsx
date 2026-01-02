"use client";
import React from "react";
import useSWR from "swr";
import Pagination from "../ui/Pagination";
import ReviewsHeader from "./ReviewsHeader";
import ReviewsList from "./ReviewsList";
import { useReviewsData } from "./useReviewsData";
import type { Review } from "./types";
import PromotionHeader from "../PromotionPlan/PromotionHeader";
import ProductsHeader from "../SavedProducts/SavedProductsHeader";

// Use Review & extend with isLiked
const reviewsLocalFetcher = (
  key: string,
  reviews: (Review & { isLiked: boolean })[]
) => reviews;

const ReviewsSection: React.FC = () => {
  const { data, loading, error } = useReviewsData();
  // Map API reviews to UI reviews
  const reviews: (Review & { isLiked: boolean })[] = (data?.reviews || []).map(
    (r) => ({
      ...r,
      isLiked: false, // Simulate not liked initially
    })
  );
  const totalReviews = data?.total || 0;
  const averageRating = data?.average_rating || 0;
  const reviewsPerPage = 5;

  // Use SWR for local like/dislike state
  const { data: reviewsData, mutate } = useSWR(
    ["local-reviews", reviews],
    reviewsLocalFetcher,
    {
      fallbackData: reviews,
    }
  );

  console.log(data);

  const [currentPage, setCurrentPage] = React.useState(1);

  const totalPages = Math.ceil(totalReviews / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = reviewsData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleLikeToggle = (reviewId: string) => {
    mutate(
      (prev: (Review & { isLiked: boolean })[] | undefined) =>
        (prev ?? []).map((review) =>
          review.reviewid === reviewId
            ? {
                ...review,
                isLiked: !review.isLiked,
              }
            : review
        ),
      false
    );
  };

  if (loading)
    return (
      <div className="">
        <ProductsHeader
          header="Reviews"
          description="Want view all reviews made. Check it out here"
        />
        <div className="flex flex-col items-center justify-center min-h-[300px] w-full">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500 mb-4"></div>
          <span className="text-gray-500 text-sm md:text-lg font-medium">
            Loading reviews...
          </span>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] w-full">
        <div className="bg-red-100 text-red-600 rounded-full p-3 mb-2">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
            />
          </svg>
        </div>
        <span className="text-gray-700 text-sm md:text-lg font-medium mb-2">
          Error loading reviews
        </span>
        <span className="text-gray-400 text-sm">{error}</span>
      </div>
    );
  if (reviews.length === 0)
    return (
      <div className="w-full">
        <ProductsHeader
          header="Reviews"
          description="Want view all reviews made. Check it out here"
        />
        <div className="flex flex-col items-center justify-center min-h-96 h-full">
          <div className="bg-gray-100 rounded-full p-4 mb-4">
            <svg
              className="w-12 h-12 text-gray-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0 0H6m6 0h6"
              />
            </svg>
          </div>
          <span className="text-gray-700 text-sm md:text-lg font-medium mb-2">
            No reviews yet
          </span>
          <span className="text-gray-400 text-sm">
            User reviews will be displayed here!
          </span>
        </div>
      </div>
    );

  return (
    <div className="max-w-8xl mx-auto">
      <section className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
        {/* Header */}
        <ProductsHeader
          header="Reviews"
          description="Want view all reviews made. Check it out here"
        />
        {/* Reviews List */}
        <ReviewsList reviews={currentReviews} onLikeToggle={handleLikeToggle} />
      </section>
      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          showPageInfo={true}
          totalItems={totalReviews}
          itemsPerPage={reviewsPerPage}
        />
      )}
    </div>
  );
};

export default ReviewsSection;
