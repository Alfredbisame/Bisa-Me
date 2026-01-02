import React from "react";
import ScrollButton from "./ScrollButton";
import CategoryCard from "./CategoryCard";
import { getImageUrl } from "../ProductDetails/utils/imageUtils";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface Category {
  id: string;
  category: string;
  web_link: string;
}

interface CategorySectionDesktopProps {
  categories: Category[];
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  isLeftDisabled: boolean;
  isRightDisabled: boolean;
  scroll: (direction: "left" | "right") => void;
}

const CategorySectionDesktop: React.FC<CategorySectionDesktopProps> = ({
  categories,
  scrollContainerRef,
  isLeftDisabled,
  isRightDisabled,
  scroll,
}) => (
  <div className="flex items-center justify-center space-x-2 sm:space-x-4">
    {/* Left Scroll Button */}
    <ScrollButton direction="left" onClick={() => scroll("left")} disabled={isLeftDisabled}>
      <FaArrowLeft className="text-xs sm:text-sm" />
    </ScrollButton>

    {/* Scrollable Categories Container */}
    <div
      ref={scrollContainerRef}
      className="flex overflow-x-auto scrollbar-hide space-x-2 py-2 max-w-full"
      style={{ scrollBehavior: "smooth", minHeight: 100 }}
    >
      {categories.map(({ id, category, web_link }, index) => (
        <CategoryCard
          key={id}
          category={{
            name: category,
            imageUrl: getImageUrl(web_link),
            alt: category,
          }}
          index={index}
        />
      ))}
    </div>

    {/* Right Scroll Button */}
    <ScrollButton direction="right" onClick={() => scroll("right")} disabled={isRightDisabled}>
      <FaArrowRight className="text-xs sm:text-sm" />
    </ScrollButton>
  </div>
);

export default CategorySectionDesktop; 