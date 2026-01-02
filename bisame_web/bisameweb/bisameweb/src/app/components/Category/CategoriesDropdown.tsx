"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import BuySellDropDown from "../BuySellMenu/BuySellDropDown";
import ServicesDropDown from "../ServicesMenu/ServicesDropDown";
import BooksDropDown from "../BooksMenu/BooksDropDown";
import JobsDropDown from "../JobsMenu/JobsDropDown";
import FoodsDropDown from "../FoodsMenu/FoodsDropdown";
import JobSeekDropDown from "../JobSeeksMenu/JobSeekDropdown";
import HealthDropDown from "../HealthMenu/HealthDropdown";

const categories: string[] = [
  "Services",
  "Buy and Sell",
  "Books",
  "Jobs",
  "Foods",
  "Job Seeks",
  "Health",
];

const CategoriesDropdown = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  //Refs
  const MainDropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        MainDropdownRef.current &&
        !MainDropdownRef.current.contains(event.target as Node)
      ) {
        setActiveCategory(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(activeCategory == categoryName ? null : categoryName);
  };

  const handleSubCategory = (categoryName: string): React.ReactNode => {
    switch (categoryName) {
      case "Buy and Sell":
        return <BuySellDropDown />;
      case "Services":
        return <ServicesDropDown />;
      case "Books":
        return <BooksDropDown />;
      case "Jobs":
        return <JobsDropDown />;
      case "Foods":
        return <FoodsDropDown />;
      case "Job Seeks":
        return <JobSeekDropDown />;
      case "Health":
        return <HealthDropDown />;
      default:
        break;
    }
  };

  return (
    <ul
      ref={MainDropdownRef}
      className="w-64 p-4 bg-white space-y-2 text-gray-700 shadow-lg backdrop-blur-sm rounded-sm"
    >
      {categories.map((category: string, index: number) => (
        <li
          key={index}
          className={`
                 rounded-md cursor-pointer
                transform transition-all duration-300 ease-in-out
                hover:bg-orange-50 hover:translate-x-1
                ${
                  activeCategory === category
                    ? "bg-orange-50 translate-x-2"
                    : ""
                }
                relative 
              `}
        >
          <span
            className="flex justify-between items-center p-2"
            onClick={() => handleCategoryClick(category)}
          >
            <span>{category}</span>{" "}
            <FaChevronRight
              className={`transition-transform duration-300 ease-in-out ${
                activeCategory == category ? "rotate-90 text-orange-500" : ""
              }`}
            />
          </span>

          {activeCategory && activeCategory == category && (
            <div className="absolute left-60 top-0">
              {handleSubCategory(category)}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CategoriesDropdown;
