import React from "react";
import { Category } from "./types/Category";
import CategoryCard from "./CategoryCard";

interface ScrollableCategoriesContainerProps {
  categories: Category[];
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

const ScrollableCategoriesContainer: React.FC<ScrollableCategoriesContainerProps> = ({ categories, scrollContainerRef }) => (
  <div className="overflow-hidden w-full">
    <div
      ref={scrollContainerRef}
      className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-hidden cursor-pointer"
      style={{ scrollSnapType: "x mandatory" }}
    >
      {categories.map((category, index) => (
        <CategoryCard key={index} category={category} index={index} />
      ))}
    </div>
  </div>
);

export default ScrollableCategoriesContainer; 