import { LoadingSkeletonProps } from "../types";
import LatestListingsHeader from "./LatestListingsHeader";

const LoadingSkeleton = ({ count = 8 }: LoadingSkeletonProps) => {
  return (
    <div className="w-full px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-56 py-4">
      <LatestListingsHeader showViewAllLink={true} />
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-4 md:gap-6">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="p-2 sm:p-4 animate-pulse rounded-md">
            <div className="aspect-square w-full bg-gray-200 mb-2" />
            <div className="h-4 bg-gray-200 mb-2" />
            <div className="h-4 bg-gray-200 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
