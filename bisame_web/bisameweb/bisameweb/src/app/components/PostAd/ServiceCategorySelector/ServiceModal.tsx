import React, { useState, useEffect } from "react";
import { useServiceData, searchSubcategories } from "./useServiceData";
import { useServiceSelector, ServiceSelection } from "./useServiceSelector";
import { ServiceGrid } from "./ServiceGrid";
import { ServiceSearchResults } from "./ServiceSearchResults";
import { GroupCategoryType } from "./ServiceCategorySelector";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onServiceSelect: (selection: ServiceSelection) => void;
  className?: string;
  group: GroupCategoryType;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  isOpen,
  onClose,
  onServiceSelect,
  group,
}) => {
  const { data: services, loading, error, refetch } = useServiceData(group);

  const { selectedService, setSelectedService, clearSelection } =
    useServiceSelector();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Transform search results to match expected interface
  const rawSearchResults = searchSubcategories(services, searchTerm);
  const searchResults = rawSearchResults.map((result) => ({
    parentSubcategory: result.subcategory,
    parentCategory: result.parentCategory,
  }));

  useEffect(() => {
    setShowSearchResults(Boolean(searchTerm.trim()));
  }, [searchTerm]);

  const handleServiceSelect = (selection: ServiceSelection) => {
    setSelectedService(selection);
    onServiceSelect(selection);
    onClose();
  };

  const handleClose = () => {
    setSearchTerm("");
    setShowSearchResults(false);
    clearSelection();
    onClose();
  };

  const handleRetry = () => {
    refetch();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="flex min-h-screen items-end sm:items-center justify-center sm:p-4 lg:p-6">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
          onClick={handleClose}
          aria-hidden="true"
        />

        {/* Modal panel */}
        <div className="relative flex flex-col bg-white sm:rounded-xl sm:rounded-t-2xl overflow-hidden sm:shadow-2xl transform transition-all w-full sm:max-w-6xl h-screen sm:h-[85vh] sm:max-h-[85vh]">
          {/* Header */}
          <div className="bg-blue-900 px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 flex-shrink-0 sm:rounded-t-xl">
            <div className="flex items-start sm:items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white mb-1 truncate">
                  Select {group === "Buy and Sell" ? "Product" : group}
                </h3>
                <p className="text-white text-xs sm:text-sm md:text-base opacity-90 line-clamp-2">
                  Choose from our comprehensive list of{" "}
                  {group === "Buy and Sell" ? "products" : group.toLowerCase()}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="flex-shrink-0 text-white hover:text-gray-200 text-xl sm:text-2xl h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center hover:bg-white hover:bg-opacity-10 rounded-full transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Search input */}
          <div className="px-3 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 bg-gray-50 border-b border-gray-200 flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder={`Search ${
                  group === "Buy and Sell" ? "products" : group.toLowerCase()
                }...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 md:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white shadow-sm text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 bg-white">
            {loading && (
              <div className="flex flex-col items-center justify-center py-12 sm:py-16">
                <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-3 border-orange-500 border-t-transparent"></div>
                <span className="mt-3 sm:mt-4 text-gray-600 font-medium text-sm sm:text-base">
                  Loading{" "}
                  {group === "Buy and Sell" ? "products" : group.toLowerCase()}
                  ...
                </span>
              </div>
            )}

            {error && (
              <div className="text-center py-12 sm:py-16">
                <div className="mx-auto flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-red-100 mb-4">
                  <svg
                    className="h-6 w-6 sm:h-8 sm:w-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <p className="text-red-600 mb-6 font-medium text-sm sm:text-base px-4">
                  {error}
                </p>
                <button
                  onClick={handleRetry}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 bg-orange-600 text-white rounded-lg sm:rounded-xl hover:bg-orange-700 transition-colors font-medium shadow-sm text-sm sm:text-base"
                >
                  Try Again
                </button>
              </div>
            )}

            {!loading && !error && services && (
              <div className="w-full">
                {showSearchResults ? (
                  <ServiceSearchResults
                    results={searchResults}
                    selectedService={selectedService}
                    onServiceSelect={handleServiceSelect}
                    onClose={() => {
                      setSearchTerm("");
                      setShowSearchResults(false);
                    }}
                  />
                ) : (
                  <ServiceGrid
                    services={services}
                    selectedService={selectedService}
                    onServiceSelect={handleServiceSelect}
                  />
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-3 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 bg-gray-50 border-t border-gray-200 flex-shrink-0 sm:rounded-b-xl">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-blue-900 text-white rounded-lg sm:rounded-xl hover:bg-blue-800 active:bg-blue-950 transition-colors font-medium shadow-sm text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
