import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const ErrorState = () => {
  return (
    <div className="w-full sm:px-6 px-4 md:px-56 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold">Featured ads</h1>
        <Link href="/ProductsPage" className="text-blue-500 hover:underline flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
          Browse All Featured
          <FaArrowRight className="text-xs sm:text-sm" />
        </Link>
      </div>
      <div className="text-red-500 text-center py-8">
        <p className="text-sm sm:text-base">Failed to load featured products. Please try again later.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
          aria-label="Retry"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorState; 