import { ArrowLeft, X, Search, AlertCircle, Loader2 } from "lucide-react";
import CategorySearchResults from "./CategorySearchResults";
import CategoryGrid from "./CategoryGrid";
import SubcategoryView from "./SubcategoryView";
import { FilteredCategoryItem } from "./useCategorySelector";

interface CategoryModalProps {
  isOpen: boolean;
  searchTerm: string;
  selectedMainCategory: string | null;
  viewMode: "categories" | "subcategories";
  filteredCategories: FilteredCategoryItem[];
  selectedCategory: string;
  loading: boolean;
  error: string | null;
  onClose: () => void;
  onSearchChange: (term: string) => void;
  onBackToCategories: () => void;
  onMainCategoryClick: (category: string) => void;
  onCategorySelect: (category: string) => void;
}

const CategoryModal = ({
  isOpen,
  searchTerm,
  selectedMainCategory,
  viewMode,
  filteredCategories,
  selectedCategory,
  loading,
  error,
  onClose,
  onSearchChange,
  onBackToCategories,
  onMainCategoryClick,
  onCategorySelect,
}: CategoryModalProps) => {
  if (!isOpen) return null;

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-3" />
          <p className="text-gray-500">Loading categories...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="w-8 h-8 text-red-500 mb-3" />
          <p className="text-red-600 text-center">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      );
    }

    if (searchTerm) {
      return (
        <div className="p-4">
          <CategorySearchResults
            filteredCategories={filteredCategories}
            onCategorySelect={onCategorySelect}
          />
        </div>
      );
    }

    if (viewMode === "categories") {
      return (
        <div className="p-4">
          <CategoryGrid
            selectedCategory={selectedCategory}
            onMainCategoryClick={onMainCategoryClick}
          />
        </div>
      );
    }

    return (
      <div className="p-4">
        {selectedMainCategory && (
          <SubcategoryView
            selectedMainCategory={selectedMainCategory}
            selectedCategory={selectedCategory}
            onCategorySelect={onCategorySelect}
          />
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            {viewMode === "subcategories" && (
              <button
                onClick={onBackToCategories}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <h3 className="text-lg font-semibold text-gray-800">
              {viewMode === "categories"
                ? "Select Category"
                : selectedMainCategory}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        {!loading && !error && (
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">{renderContent()}</div>

        {/* Footer */}
        {!loading && !error && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              Can&apos;t find your category? Contact Bisame support to add it.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryModal;
