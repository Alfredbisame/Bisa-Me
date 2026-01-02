"use client";

import { useState, useRef, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import BuySellSubMenu from "../BuySellMenu/BuySellSubMenu";
import { useBuySellData } from "../BuySellMenu/useBuySellData";

// Define types for the new API response
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

interface ProcessedCategory {
  name: string;
  id: string;
  hasSubmenu: boolean;
}

type CategoryName = string;

const FoodsDropDown = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryName | null>(
    null
  );
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch categories using our custom hook
  const { categoriesData, processedCategories, error, isLoading } =
    useBuySellData("Food");

  useEffect(() => {
    setIsVisible(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveCategory(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryClick = (categoryName: CategoryName) => {
    console.log(categoryName);
    setActiveCategory(activeCategory === categoryName ? null : categoryName);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex" ref={dropdownRef}>
        <div className="w-64 p-4 bg-white shadow-lg backdrop-blur-sm rounded-sm">
          <p className="text-gray-500">Loading categories...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex" ref={dropdownRef}>
        <div className="w-64 p-4 bg-white shadow-lg backdrop-blur-sm rounded-sm">
          <p className="text-red-500">Error loading categories</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        flex transform transition-all duration-500 ease-in-out
        ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        } relative
      `}
      ref={dropdownRef}
    >
      <div className="w-64 p-4 bg-white shadow-lg backdrop-blur-sm rounded-sm">
        <ul className="space-y-2 text-gray-700">
          {processedCategories.map((category: ProcessedCategory) => (
            <li
              key={category.id}
              className={`
                flex justify-between items-center p-2 rounded-md cursor-pointer
                transform transition-all duration-300 ease-in-out
                hover:bg-orange-50 hover:translate-x-1
                ${
                  activeCategory === category.name
                    ? "bg-orange-50 translate-x-2"
                    : ""
                }
              `}
              onClick={() => handleCategoryClick(String(category.name))}
            >
              <span>{category.name}</span>
              {category.hasSubmenu && (
                <FaChevronRight
                  className={`
                    text-sm transition-transform duration-300 ease-in-out
                    ${
                      activeCategory === category.name
                        ? "rotate-90 text-orange-500"
                        : ""
                    }
                  `}
                />
              )}

              {/* Render submenu directly inside the list item when active */}
              {activeCategory && activeCategory === category.name && (
                <div className="absolute left-full top-0 ml-0">
                  <BuySellSubMenu
                    categoryName={activeCategory}
                    categoryData={categoriesData?.find(
                      (cat: Category) => cat.category === activeCategory
                    )}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FoodsDropDown;
