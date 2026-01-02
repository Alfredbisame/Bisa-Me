"use client";

import React, { useState } from "react";
import { ServiceModal } from "./ServiceModal";
import { usePostServiceFormContext } from "../PostServiceFormComponents";
import type { ServiceSelection } from "./useServiceSelector";

export type GroupCategoryType =
  | "Services"
  | "Buy and Sell"
  | "Books"
  | "Jobs"
  | "Job Seekers"
  | "Health"
  | "Foods";

interface ServiceCategorySelectorProps {
  onServiceSelect: (selection: ServiceSelection) => void;
  selectedService?: ServiceSelection | null;
  className?: string;
  placeholder?: string;
  group?: GroupCategoryType;
}

export const ServiceCategorySelector: React.FC<
  ServiceCategorySelectorProps
> = ({
  onServiceSelect,
  selectedService,
  className = "",
  placeholder = "Select a service...",
  group = "Services",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { updateCategories } = usePostServiceFormContext();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleServiceSelect = (selection: ServiceSelection) => {
    onServiceSelect(selection);
    updateCategories({
      category: selection.category,
      subCategory: selection.subcategory,
    });
  };

  const getDisplayText = () => {
    if (!selectedService) return placeholder;
    return `${selectedService.category} > ${selectedService.subcategory}`;
  };

  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleOpenModal}
        className={`
          w-full p-2 text-sm md:text-base bg-blue-100 text-left border rounded-md transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          ${
            selectedService
              ? "bg-blue-100 border-blue-300 text-blue-900"
              : "bg-white border-blue-200 text-gray-500 hover:border-gray-400"
          }
        `}
      >
        <div className="flex items-center justify-between">
          <span className="truncate">{getDisplayText()}</span>
          <svg
            className="w-3 h-3 md:w-5 md:h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onServiceSelect={handleServiceSelect}
        group={group}
      />
    </div>
  );
};
