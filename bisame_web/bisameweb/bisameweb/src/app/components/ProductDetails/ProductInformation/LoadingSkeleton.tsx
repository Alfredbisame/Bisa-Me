const LoadingSkeleton = () => {
  return (
    <div className="max-w-8xl mx-auto p-2 px-4 sm:px-6 md:px-12 lg:px-52 mt-8">
      <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
        {/* Tab Navigation Skeleton */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-8 items-center justify-center">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-6 bg-gray-200 rounded w-32 mb-3 animate-pulse"></div>
            ))}
          </div>
        </div>
        
        {/* Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Description Skeleton */}
          <div className="lg:col-span-1">
            <div className="h-6 bg-gray-200 rounded w-24 mb-4 animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>
          </div>
          
          {/* Features Skeleton */}
          <div className="lg:col-span-1 lg:border-l lg:pl-8 border-gray-200">
            <div className="h-6 bg-gray-200 rounded w-20 mb-4 animate-pulse"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center">
                  <div className="h-5 w-5 bg-gray-200 rounded mr-3 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Seller Info Skeleton */}
          <div className="lg:col-span-1 lg:border-l lg:pl-8 border-gray-200">
            <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="h-12 bg-gray-200 rounded-lg w-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
