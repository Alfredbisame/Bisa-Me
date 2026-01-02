import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { FeaturedHeaderProps } from "../types";

const FeaturedHeader = ({ showViewAllLink = true }: FeaturedHeaderProps) => {
  return (
    <div className="bg-orange-500 flex justify-between mt-5 items-center mb-6 px-2 py-1 md:py-2 md:px-4 rounded-lg">
      <h1 className="text-white text-sm md:text-lg xl:text-lg font-semibold">
        Featured ads
      </h1>
      {showViewAllLink && (
        <Link
          href="/ProductsPage?type=featured"
          className="text-white hover:underline flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
        >
          Browse All Featured
          <FaArrowRight className="text-xs sm:text-sm" />
        </Link>
      )}
    </div>
  );
};

export default FeaturedHeader;
