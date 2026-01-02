"use client";
import React from "react";
import { FaTimes } from "react-icons/fa";
import CategoryAdsCard from "./CategoryAdsCard";
import { categories, Category } from "./constant";

interface PostAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: string) => void;
  onSelectServices: () => void;
  onSelectBuySell: () => void;
}

const PostAdModal: React.FC<PostAdModalProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl w-[320px] sm:w-1/3 md:w-1/2 xl:w-1/3 h-1/2 overflow-y-scroll hide-scrollbar p-6 shadow-2xl transform transition-all duration-300 scale-95 opacity-0 animate-bounceIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
          aria-label="Close modal"
        >
          <FaTimes />
          {/* <X className="w-5 h-5 text-gray-500 group-hover:text-gray-700" /> */}
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2">POST AD</h2>
          <p className="text-base text-gray-600 text-center">
            SELECT WHERE TO POST
          </p>
        </div>

        {/* Options */}
        <div className=" grid grid-cols-2 gap-5">
          {categories.map((category: Category, index: number) => (
            <CategoryAdsCard
              icon={category.icon}
              categoryName={category.categoryName}
              categoryDescription={category.categoryDescription}
              buttonAction={() => onSelectCategory(category.catRouteName)}
              key={index}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            Choose the category that best fits your listing
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostAdModal;
