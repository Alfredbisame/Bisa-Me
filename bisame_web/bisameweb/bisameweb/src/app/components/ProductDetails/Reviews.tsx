"use client";

import WriteReviewButton from './WriteReviewButton';
import ReviewList from './Reviews/ReviewList';
import ReviewSkeleton from './Reviews/ReviewSkeleton';
import ReviewError from './Reviews/ReviewError';
import NoReviews from './Reviews/NoReviews';
import { useProductReviewsData } from './hooks/useProductReviewsData';
import { formatDate } from './utils/reviewUtils';
import type { Product } from './hooks/useProductData';

interface ReviewsProps {
  listingId: string | null;
  product: Product | null;
}

const Reviews = ({ product }: ReviewsProps) => {
  // Use the userId from the product data for fetching reviews
  const userId = product?.userId || null;
  const { data, loading, error, refetch, loadMore, isReachingEnd, isValidating } = useProductReviewsData(userId);
  
  const handleReviewSubmit = async () => {
    // Refetch reviews after a new review is submitted
    await refetch();
  };

  if (loading && !data) {
    return (
      <div className="md:col-span-3">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Customer Reviews</h2>
          <div className="bg-gray-200 h-10 w-32 rounded animate-pulse"></div>
        </div>
        <ReviewSkeleton />
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="md:col-span-3">
        <ReviewError onRetry={() => window.location.reload()} />
      </div>
    );
  }

  const reviews = data?.reviews || [];

  return (
    <div className="md:col-span-3">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Customer Reviews</h2>
        <WriteReviewButton onReviewSubmit={handleReviewSubmit} />
      </div>
      {reviews.length > 0 ? (
        <>
          <ReviewList reviews={reviews} formatDate={formatDate} />
          {!isReachingEnd && (
            <div className="mt-6 flex justify-center">
              <button
                className="text-orange-500 border border-orange-500 px-4 py-2 rounded-md hover:bg-orange-50 transition-colors flex items-center disabled:opacity-50"
                onClick={loadMore}
                disabled={isValidating}
              >
                {isValidating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </>
                ) : (
                  "Load More Reviews"
                )}
              </button>
            </div>
          )}
        </>
      ) : (
        <NoReviews />
      )}
    </div>
  );
};

export default Reviews;