"use client";
import React from "react";
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import SweetAlert from "../Forms/Alert/SweetAlert";

interface CategoryHeaderProps {
  onBack?: () => void;
  onClear?: () => void;
  alertMessage?: string;
  title?: string;
  description?: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  onBack,
  onClear,
  alertMessage,
  description,
  title,
}) => {
  const handleClearClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const confirmed = await SweetAlert.confirmClearForm();
      if (confirmed && onClear) {
        onClear();
        // Show success message after clearing
        await SweetAlert.success("Form Cleared!", alertMessage);
      }
    } catch (error) {
      console.error("Error clearing form:", error);
    }
  };
  return (
    <div className="border-b border-blue-100 pb-4">
      <div className="flex items-end justify-between mb-4">
        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="flex items-center space-x-2 text-orange-600 hover:text-orange-600 transition-colors duration-200 p- rounded-lg hover:bg-orange-50"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>

        {/* Title and Description */}
        <div className="text-center">
          <h1 className="text-xl font-semibold text-blue-500 mb-2">{title}</h1>
          <p className="text-gray-600 text-sm font-semibold">{description}</p>
        </div>

        {/* Clear Button */}
        <button
          type="button"
          onClick={handleClearClick}
          className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors duration-200 p- rounded-lg hover:bg-orange-50"
          aria-label="Clear form"
        >
          <span className="font-medium">Clear</span>
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CategoryHeader;
