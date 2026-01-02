import React from 'react';
import ReviewItem from './ReviewItem';
import { Review } from '../types';

interface ReviewListProps {
  reviews: Review[];
  formatDate: (dateString: string) => string;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, formatDate }) => {
  return (
    <div className="space-y-6">
      {reviews.map((review, index) => (
        <ReviewItem key={index} review={review} formatDate={formatDate} />
      ))}
    </div>
  );
};

export default ReviewList;