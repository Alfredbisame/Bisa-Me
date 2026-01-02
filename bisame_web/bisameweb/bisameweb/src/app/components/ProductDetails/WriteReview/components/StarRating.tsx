"use client";

import { Star } from 'lucide-react';

const ratingTexts: { [key: number]: { text: string; color: string; emoji: string } } = {
  1: { text: "Poor", color: "text-red-500", emoji: "😞" },
  2: { text: "Fair", color: "text-orange-500", emoji: "😐" },
  3: { text: "Good", color: "text-yellow-500", emoji: "🙂" },
  4: { text: "Very Good", color: "text-blue-500", emoji: "😊" },
  5: { text: "Excellent", color: "text-green-500", emoji: "🤩" },
};

interface StarRatingProps {
  rating: number;
  hoveredRating: number;
  isSubmitting: boolean;
  onStarClick: (rating: number) => void;
  onStarHover: (rating: number) => void;
  onStarLeave: () => void;
}

const StarRating = ({
  rating,
  hoveredRating,
  isSubmitting,
  onStarClick,
  onStarHover,
  onStarLeave,
}: StarRatingProps) => {
  const displayRating = hoveredRating || rating;
  const ratingInfo = displayRating > 0 ? ratingTexts[displayRating] : null;

  return (
    <div className="space-y-4">
      <label id="star-rating-label" className="block text-lg font-semibold text-gray-800">
        Rate this product
      </label>
      <div
        className="flex flex-col items-center space-y-4 p-6 bg-gray-50 rounded-2xl"
        role="radiogroup"
        aria-labelledby="star-rating-label"
        aria-label="Star rating"
      >
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onStarClick(star)}
              onMouseEnter={() => onStarHover(star)}
              onMouseLeave={onStarLeave}
              className="p-1 transition-transform duration-200 hover:scale-125 focus:outline-none focus:ring-4 focus:ring-orange-200 rounded-full"
              disabled={isSubmitting}
              role="radio"
              aria-checked={rating === star}
              aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onStarClick(star);
                }
              }}
            >
              <Star
                size={40}
                className={`transition-colors duration-200 ${
                  star <= displayRating
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
        <div className="h-8 flex items-center justify-center">
          {ratingInfo && (
            <div className="flex items-center gap-2">
              <span className="text-2xl">{ratingInfo.emoji}</span>
              <span className={`text-lg font-semibold ${ratingInfo.color}`}>
                {ratingInfo.text}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StarRating; 