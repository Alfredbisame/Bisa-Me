"use client";

import { FC } from 'react';

const LoadingSkeleton: FC = () => {
  return (
    <div className="max-w-8xl mx-auto p-4 px-52">
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 animate-pulse bg-gray-200 h-96 rounded"></div>
        <div className="flex-1 mt-8 lg:mt-0 lg:ml-8">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-full mb-6"></div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-5 bg-gray-200 rounded w-2/3"></div>
            ))}
          </div>
          <div className="h-8 bg-gray-200 rounded w-1/4 my-6"></div>
          <div className="flex space-x-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded flex-1"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
