import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

interface ErrorStateProps {
  onRetry?: () => void;
}

const ErrorState = ({ onRetry }: ErrorStateProps) => {
  return (
    <div className="w-full sm:px-6 md:px-52 lg:px-56 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Trending</h1>
        <Link href="/ProductsPage" className="text-blue-500 hover:underline flex items-center gap-2">
          Browse All Trending
          <FaArrowRight />
        </Link>
      </div>
      <div className="text-red-500 text-center py-8">
        <p className="text-sm sm:text-base">Failed to load trending products. Please try again later.</p>
        <button 
          onClick={onRetry}
          className="mt-3 sm:mt-4 bg-red-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm sm:text-base hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorState; 