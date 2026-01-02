import React from 'react';

const ReviewSkeleton: React.FC = () => (
  <div className="space-y-6">
    {[...Array(3)].map((_, index) => (
      <div key={index} className="border-b pb-6">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="ml-4 space-y-2">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse mt-2"></div>
        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mt-2"></div>
      </div>
    ))}
  </div>
);

export default ReviewSkeleton; 