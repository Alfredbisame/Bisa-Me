import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Category } from "./types/Category";

interface CategoryCardProps {
  category: Category;
  index: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, index }) => (
  <Link
    href={`/BuySellPage?category=${encodeURIComponent(category.name)}`}
    passHref
  >
    <div
      className="flex-shrink-0 w-[110px] xs:w-[140px] sm:w-[170px] md:w-[190px] border p-2 sm:p-3 md:p-4 text-center scroll-snap-align-start rounded-lg hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="relative w-full aspect-square mb-1 sm:mb-2">
        <Image
          src={category.imageUrl}
          alt={category.alt}
          width={100}
          height={100}
          className="mx-auto mb-2"
          priority={index < 2}
        />
      </div>
      <p className="text-xs sm:text-sm md:text-base truncate">{category.name}</p>
    </div>
  </Link>
);

export default CategoryCard; 