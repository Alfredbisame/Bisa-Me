"use client";

import { MessageCircle } from 'lucide-react';
import StarRating from './StarRating';
import ReviewComment from './ReviewComment';
import { useReviewForm } from '../hooks/useReviewForm';

interface ReviewFormProps {
  onReviewSubmit?: (rating: number, comment: string) => Promise<void> | void;
  onClose: () => void;
}

const ReviewForm = ({ onReviewSubmit, onClose }: ReviewFormProps) => {
  const {
    rating,
    hoveredRating,
    comment,
    isSubmitting,
    isFormValid,
    setComment,
    handleSubmit,
    handleStarClick,
    handleStarHover,
    handleStarLeave,
    resetForm,
  } = useReviewForm({ onReviewSubmit, onClose });

  // Reset form when modal is closed
  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <fieldset className="border-0 p-0 m-0" aria-labelledby="review-form-legend">
        <legend id="review-form-legend" className="sr-only">Product Review Form</legend>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-xl">
            <MessageCircle className="text-orange-600" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Share Your Experience</h2>
            <p className="text-gray-500 text-sm">Help others by writing a review</p>
          </div>
        </div>
        <StarRating
          rating={rating}
          hoveredRating={hoveredRating}
          isSubmitting={isSubmitting}
          onStarClick={handleStarClick}
          onStarHover={handleStarHover}
          onStarLeave={handleStarLeave}
        />
        <ReviewComment
          comment={comment}
          setComment={setComment}
          isSubmitting={isSubmitting}
        />
      </fieldset>
      <div className="flex space-x-3">
        <button
          type="button"
          onClick={handleClose}
          disabled={isSubmitting}
          className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="flex-1 px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center justify-center"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
              Submitting...
            </span>
          ) : (
            'Submit Review'
          )}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm; 