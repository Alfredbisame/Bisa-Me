import React, { useState } from "react";
import { FaEye, FaReplyAll } from "react-icons/fa";
import ReviewReplyModal from "./ReviewReplyModal";
import ReviewPostModal from "./ReviewPostModal";
import type { Reply } from "./types";

interface ReviewActionsProps {
  isLiked: boolean;
  onLikeToggle: (reviewId: string) => void;
  reviewId: string;
  review: {
    name: string;
    avatar: string;
    date: string;
    rating: number;
    comment: string;
    isLiked: boolean;
    image?: string;
    productname?: string;
    description?: string;
    price?: number | string;
    postdate?: string;
    reply?: Reply[];
  };
  onReplySuccess?: () => void;
}

const ReviewActions: React.FC<ReviewActionsProps> = ({
  reviewId,
  review,
  onReplySuccess,
}) => {
  const [replyOpen, setReplyOpen] = useState(false);
  const [postOpen, setPostOpen] = useState(false);

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2 my-2">
        {/* <button
          onClick={e => {
            e.stopPropagation();
            onLikeToggle(reviewId);
          }}
          className={`flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200
            ${isLiked ? 'bg-orange-100 text-orange-600 hover:bg-orange-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current text-orange-500' : ''}`} />
        </button> */}
        <button
          onClick={() => setPostOpen(true)}
          className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium bg-orange-50 text-gray-600 hover:bg-orange-100 hover:text-orange-600 transition-colors duration-200 ease-in"
        >
          <FaEye color="orange" className="w-3 h-3" />
          <span className="text-xs md:text-sm text-orange-300">View Post</span>
        </button>
      </div>
      <button
        className="text-xs text-gray-500 hover:text-orange-500 transition-colors duration-200 ease-in flex gap-2 items-center bg-orange-50 hover:bg-orange-100 px-2 md:px-4 py-1 md:py-2"
        onClick={() => setReplyOpen(true)}
      >
        <FaReplyAll />
        Reply
      </button>
      <ReviewReplyModal
        open={replyOpen}
        onClose={() => setReplyOpen(false)}
        reviewerName={review?.name}
        reviewid={reviewId}
        onReplySuccess={onReplySuccess}
      />
      <ReviewPostModal
        open={postOpen}
        onClose={() => setPostOpen(false)}
        image={review.image}
        title={review.productname || ""}
        description={review.description || ""}
        price={review.price}
        postdate={review.postdate}
      />
    </div>
  );
};

export default ReviewActions;
