import React from 'react';
import { Star } from 'lucide-react';

interface ReviewsHeaderProps {
  averageRating: number;
  totalReviews: number;
}

const renderStars = (rating: number) => {
  const rounded = Math.round(rating);
  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      className={`w-4 h-4 ${index < rounded ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
    />
  ));
};

const ReviewsHeader: React.FC<ReviewsHeaderProps> = ({ averageRating, totalReviews }) => (
  <div className="px-6 pt-6 pb-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="md:text-lg font-bold text-gray-900 mb-1">REVIEWS</h2>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <div className="flex items-center">{renderStars(averageRating)}</div>
            <span className="font-semibold text-gray-900">{averageRating.toFixed(1)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>{totalReviews} reviews</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ReviewsHeader; 