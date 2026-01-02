import React from 'react';
import ReviewItem from './ReviewItem';
import type { Review } from './types';

interface ProductLike {
  image?: string;
  badge?: { text: string; color: string };
  name?: string;
  description?: string;
  rating?: number;
  reviews?: number;
  location?: string;
  price?: number | string;
  originalPrice?: number;
}

interface ReviewsListProps {
  reviews: (Review & { isLiked: boolean })[];
  onLikeToggle: (reviewId: string) => void;
  products?: { [reviewId: string]: ProductLike } | ProductLike[];
}

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews: initialReviews, onLikeToggle }) => {
  const reviews = initialReviews;

  return (
    <ul className="divide-y divide-gray-100">
      {reviews.map((review) => (
        <ReviewItem
          key={review.reviewid}
          review={review}
          onLikeToggle={onLikeToggle}
        />
      ))}
    </ul>
  );
};

export default ReviewsList;