import React from "react";
import { ServiceSelection } from "./useServiceSelector";
import { ServiceButton } from "./ServiceButton";
import { ChildCategory } from "@/app/sell/allcategory/interfaces";

interface ServiceSearchResult {
  parentSubcategory: string;
  parentCategory: string;
}

interface ServiceSearchResultsProps {
  results: ServiceSearchResult[];
  selectedService: ServiceSelection | null;
  onServiceSelect: (selection: ServiceSelection) => void;
  onClose: () => void;
  className?: string;
}

export const ServiceSearchResults: React.FC<ServiceSearchResultsProps> = ({
  results,
  selectedService,
  onServiceSelect,
  onClose,
  className = "",
}) => {
  const isServiceSelected = (
    category: string,
    subcategory: string
  ): boolean => {
    if (!selectedService) return false;

    return (
      selectedService.category === category &&
      selectedService.subcategory === subcategory
    );
  };

  if (results.length === 0) {
    return (
      <div className={`p-4 text-center text-gray-500 ${className}`}>
        <p>No services found matching your search.</p>
        <button
          onClick={onClose}
          className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
        >
          Clear search
        </button>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between pb-2 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-900">
          Search Results ({results.length})
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-sm"
        >
          ✕
        </button>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {results.map((result, index) => (
          <ServiceButton
            key={`${result.parentCategory}-${result.parentSubcategory}`}
            service={{
              category: result.parentCategory,
              subtotal: 0,
              sub: [],
            }}
            subcategory={{
              subcategory: result.parentSubcategory,
              childtotal: 0,
              childcategory: [],
            }}
            // childcategory={result.childcategory}
            isSelected={isServiceSelected(
              result.parentCategory,
              result.parentSubcategory
            )}
            onSelect={onServiceSelect}
            className="text-sm"
          />
        ))}
      </div>
    </div>
  );
};
