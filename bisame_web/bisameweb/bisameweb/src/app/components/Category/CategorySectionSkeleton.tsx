import React from "react";

const CategorySectionSkeleton: React.FC = () => (
  <div className="flex items-center justify-center space-x-2 sm:space-x-4 py-2">
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        className="flex-shrink-0 w-[100px] xs:w-[120px] sm:w-[140px] md:w-[160px] border p-2 sm:p-3 md:p-4 text-center scroll-snap-align-start rounded-lg bg-gray-100 animate-pulse"
      >
        <div className="relative w-full aspect-square mb-1 sm:mb-2 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mt-2" />
      </div>
    ))}
  </div>
);

export default CategorySectionSkeleton; 