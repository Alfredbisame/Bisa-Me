"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useBuySellData } from "./useBuySellData";

interface SubCategory {
  id: string;
  category: string;
  imageUrl: string;
  webImageUrl: string;
  childCategories: string[];
}

interface Category {
  id: string;
  category: string;
  isPromotion: boolean;
  group: string;
  subCategories: SubCategory[];
}

interface BuySellSubMenuProps {
  categoryName: string;
  categoryData?: Category;
}

const BuySellSubMenu: React.FC<BuySellSubMenuProps> = ({
  categoryName,
  categoryData,
}) => {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  console.log(categoryName, categoryData);

  // Only fetch data if categoryData is not provided
  const { categoriesData, error, isLoading } = useBuySellData();

  useEffect(() => {
    setIsVisible(true);

    // If categoryData is directly provided, use it
    if (categoryData && categoryData.subCategories) {
      setSubCategories(categoryData.subCategories);
      return;
    }

    // Otherwise use data from the SWR fetch
    if (categoriesData) {
      const selectedCategory = categoriesData.find(
        (category: Category) => category.category === categoryName
      );

      if (selectedCategory && selectedCategory.subCategories) {
        setSubCategories(selectedCategory.subCategories);
      } else {
        setSubCategories([]);
      }
    }
  }, [categoriesData, categoryName, categoryData]);

  // Show loading state only if we're fetching and don't have categoryData
  if (isLoading && !categoryData) {
    return (
      <div className="w-64 bg-white shadow-xl border-l ml-2 relative z-50 rounded-sm">
        <div className="p-4">
          <p className="text-gray-500">Loading subcategories...</p>
        </div>
      </div>
    );
  }

  // Show error state only if we're fetching and don't have categoryData
  if (error && !categoryData) {
    return (
      <div className="w-64 bg-white shadow-xl border-l ml-2 relative z-50 rounded-sm">
        <div className="p-4">
          <p className="text-red-500">Error loading subcategories</p>
        </div>
      </div>
    );
  }

  console.log(subCategories);

  return (
    <div
      className={`
      w-64 bg-white shadow-xl border-l ml-4 z-50 rounded-sm
      transform transition-all duration-500 ease-in-out
      ${isVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}
    `}
    >
      <ul className="space-y-2 p-4">
        {/* Add an "All" option at the top */}
        <li>
          <Link
            href={`/SearchPage?query=${encodeURIComponent(categoryName)}`}
            className={`
              block text-gray-700 font-semibold
              rounded py-1 px-2 
              transform transition-all duration-300 ease-in-out
              hover:bg-orange-50 hover:text-gray-900 hover:translate-x-1
            `}
          >
            {categoryName}
          </Link>
        </li>

        {subCategories.map((item) => (
          <li key={item.id}>
            <Link
              href={`/SearchPage?categoryGroup=${encodeURIComponent(
                categoryData?.group as string
              )}&category=${encodeURIComponent(
                categoryName
              )}&subCategory=${encodeURIComponent(item.category)}`}
              className={`
                block text-gray-700
                rounded py-1 px-2
                transform transition-all duration-300 ease-in-out
                hover:bg-orange-50 hover:text-gray-900 hover:translate-x-1
              `}
            >
              {item.category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BuySellSubMenu;
