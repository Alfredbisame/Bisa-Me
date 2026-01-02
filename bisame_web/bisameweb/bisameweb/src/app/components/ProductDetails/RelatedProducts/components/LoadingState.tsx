"use client";

interface LoadingStateProps {
  count?: number;
  showTitle?: boolean;
}

const SkeletonCard = () => (
  <div className="bg-white p-3 rounded-md shadow-sm border border-gray-200 animate-pulse">
    <div className="aspect-[4/3] w-full bg-gray-200 rounded-md mb-2 relative">
      <div className="absolute top-2 left-2 w-16 h-6 bg-gray-300 rounded"></div>
    </div>
    <div className="mt-3 sm:mt-4 space-y-2">
      <div className="flex items-center space-x-1">
        {Array.from({ length: 5 }).map((_, starIndex) => (
          <div key={starIndex} className="w-4 h-4 bg-gray-200 rounded"></div>
        ))}
        <div className="w-12 h-4 bg-gray-200 rounded ml-2"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="mt-3 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        <div className="h-5 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  </div>
);

const LoadingState: React.FC<LoadingStateProps> = ({ count = 8, showTitle = true }) => {
  return (
    <div className="max-w-8xl mx-auto p-2 sm:px-6 md:px-52 lg:px-52">
      {showTitle && (
        <div className="h-8 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
      )}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: count }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default LoadingState;
