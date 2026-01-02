import React, { useState } from "react";
import { ServiceCategorySelector as ServiceSelector } from "../ServiceCategorySelector";
import type { ServiceSelection } from "../ServiceCategorySelector/useServiceSelector";

interface ServiceCategorySelectorProps {
  selectedService: ServiceSelection | null;
  onServiceSelect: (service: ServiceSelection) => void;
  className?: string;
}

export const ServiceCategorySelector: React.FC<
  ServiceCategorySelectorProps
> = ({ selectedService, onServiceSelect, className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleServiceSelect = (service: ServiceSelection) => {
    onServiceSelect(service);
    setIsExpanded(false);
  };

  const getDisplayText = () => {
    if (!selectedService) return "Select a service...";
    return `${selectedService.category} > ${selectedService.subcategory}`;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Service Category
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className={`
              w-full px-3 py-2 text-left border rounded-md transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              ${
                selectedService
                  ? "bg-blue-50 border-blue-300 text-blue-900"
                  : "bg-white border-gray-300 text-gray-500 hover:border-gray-400"
              }
            `}
          >
            <div className="flex items-center justify-between">
              <span className="truncate">{getDisplayText()}</span>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
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

          {isExpanded && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              <ServiceSelector
                onServiceSelect={handleServiceSelect}
                selectedService={selectedService}
                placeholder="Search and select a service..."
                // group will default to "Services" in inner component
              />
            </div>
          )}
        </div>
      </div>

      {selectedService && (
        <div className="bg-gray-50 p-3 rounded-md">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Selected Service:
          </h4>
          <div className="space-y-1 text-sm text-gray-600">
            <div>
              <span className="font-medium">Category:</span>{" "}
              {selectedService.category}
            </div>
            <div>
              <span className="font-medium">Subcategory:</span>{" "}
              {selectedService.subcategory}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
