"use client";

import { useRef } from 'react';
import Link from 'next/link';

interface Category {
  name: string;
  imageUrl?: string;
  alt?: string;
}

interface CategorySectionMobileProps {
  categories: Category[];
}

const CategorySectionMobile: React.FC<CategorySectionMobileProps> = ({ categories }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Remove duplicates from the categories array
  const uniqueCategories = categories.filter(
    (category, index, self) =>
      index === self.findIndex((c) => c.name === category.name)
  );
  
   return (
    <div className="w-full py-3 md:hidden">
      {/* Centered heading */}
      <div className="px-4 mb-2 text-center">
        <h2 className="text-sm font-bold text-gray-800 whitespace-nowrap">
          Shop By Categories
        </h2>
      </div>

      {/* Scrollable pill container */}
      <div
        ref={scrollContainerRef}
        className="flex px-4 overflow-x-auto scrollbar-hide space-x-2 py-1.5 snap-x"
      >
        {uniqueCategories.map((category, index) => (
          <Link
            href={`/BuySellPage?category=${encodeURIComponent(category.name)}`}
            key={index}
            className="snap-start flex-shrink-0"
          >
            <div className="px-3 py-1.5 text-xs font-medium text-gray-800 transition-colors duration-300 bg-white border rounded-full shadow-sm border-gray-200 hover:bg-orange-50 hover:border-orange-200 cursor-pointer">
              {category.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySectionMobile;