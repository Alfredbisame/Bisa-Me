import React from "react";
import { ServiceSelection } from "./useServiceSelector";
import { ServiceData, Subcategory } from "@/app/sell/allcategory/interfaces";

interface ServiceButtonProps {
  service: ServiceData;
  subcategory: Subcategory;
  // childcategory: ChildCategory;
  isSelected: boolean;
  onSelect: (selection: ServiceSelection) => void;
  className?: string;
}

export const ServiceButton: React.FC<ServiceButtonProps> = ({
  service,
  subcategory,
  // childcategory,
  isSelected,
  onSelect,
  className = "",
}) => {
  const handleClick = () => {
    const selection: ServiceSelection = {
      category: service.category,
      subcategory: subcategory.subcategory,
      // childcategory: childcategory.childcategory,
    };
    onSelect(selection);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        w-full p-2 md:p-4 text-left rounded-xl border-2 transition-all duration-200 group
        hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
        ${
          isSelected
            ? "bg-orange-50 border-orange-500 text-orange-900 shadow-md"
            : "bg-white border-gray-200 text-gray-700 hover:border-orange-300 hover:bg-orange-50"
        }
        ${className}
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {/* <h4 className="font-semibold text-base mb-1 group-hover:text-orange-700 transition-colors">
            {childcategory.childcategory}
          </h4> */}
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
              {service.category}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600 text-xs">{subcategory.subcategory}</span>
          </div>
        </div>
        {isSelected && (
          <div className="ml-3 flex items-center">
            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        )}
        {!isSelected && (
          <div className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-6 h-6 border-2 border-orange-300 rounded-full"></div>
          </div>
        )}
      </div>
    </button>
  );
};
