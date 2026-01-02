// ReviewItem.tsx
import React from "react";
import Avatar from "./Avatar";
import ReviewHeader from "./ReviewHeader";
import ReviewComment from "./ReviewComment";
import ReviewActions from "./ReviewActions";

import useSWR from "swr";
import { Review } from "./types";

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

interface ReviewItemProps {
  review: Review & { isLiked: boolean };
  onLikeToggle: (reviewId: string) => void;
  product?: ProductLike;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review, onLikeToggle }) => {
  const { mutate } = useSWR("/api/Dashboard/Reviews");

  const handleReplySuccess = () => {
    mutate();
  };

  return (
    <li className="px-3 py-3 md:px-6 md:py-6 hover:bg-gray-50 transition-colors duration-200 shadow">
      <div className="flex space-x-2 md:space-x-4">
        <div className="flex-shrink-0">
          <Avatar name={review.name} avatar={review.profile} />
        </div>
        <div className="flex-1 min-w-0">
          <ReviewHeader
            name={review.name}
            date={review.postdate}
            rating={review.rating}
          />
          <ReviewComment comment={review.comment} reply={review.reply} />
          <ReviewActions
            isLiked={review.isLiked}
            onLikeToggle={onLikeToggle}
            reviewId={review.reviewid}
            review={{
              ...review,
              avatar: review.profile,
              date: review.postdate,
            }}
            onReplySuccess={handleReplySuccess}
          />
        </div>
      </div>
    </li>
  );
};

export default ReviewItem;
