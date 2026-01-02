import React from 'react';

interface ReviewErrorProps {
  onRetry: () => void;
}

const ReviewError: React.FC<ReviewErrorProps> = ({ onRetry }) => (
  <div className="text-red-500 text-center py-8">
    <p>Failed to load reviews. Please try again later.</p>
    <button
      onClick={onRetry}
      className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Try Again
    </button>
  </div>
);

export default ReviewError; 