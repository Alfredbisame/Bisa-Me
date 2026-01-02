import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full mx-auto sm:px-6 md:px-52 lg:px-56 sm:py-6 md:py-8">
        {/* Header Skeleton */}
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse mr-4"></div>
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>
        
        {/* Profile Card Skeleton */}
        <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse mr-4"></div>
            <div className="flex-1">
              <div className="h-5 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>
          </div>
          
          {/* Stats Skeleton */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-8 mx-auto mb-1 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-12 mx-auto animate-pulse"></div>
              </div>
            ))}
          </div>
          
          {/* Call Buttons Skeleton */}
          <div className="flex gap-3">
            <div className="flex-1 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="flex-1 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
        
        {/* Products Section Skeleton */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="h-6 bg-gray-200 rounded w-32 mb-6 animate-pulse"></div>
          
          {/* Products Grid Skeleton */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="border p-2 rounded-md">
                <div className="aspect-square w-full bg-gray-200 mb-2 rounded-md animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
