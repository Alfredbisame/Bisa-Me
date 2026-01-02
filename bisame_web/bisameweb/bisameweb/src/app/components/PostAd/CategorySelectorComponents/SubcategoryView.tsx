import { Tag } from "lucide-react";
import {
  useCategoryData,
  getSubcategoriesByCategory,
  getSubcategoryImageUrl,
} from "./useCategoryData";
import Image from "next/image";

interface SubcategoryViewProps {
  selectedMainCategory: string;
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

const SubcategoryView = ({
  selectedMainCategory,
  selectedCategory,
  onCategorySelect,
}: SubcategoryViewProps) => {
  const { data, loading, error } = useCategoryData(selectedCategory);

  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="w-full p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-32"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Unable to load subcategories</p>
        <p className="text-sm">{error || "Please try again later"}</p>
      </div>
    );
  }

  const subcategories = getSubcategoriesByCategory(data, selectedMainCategory);
  const categoryData = data.find(
    (cat) => cat.category === selectedMainCategory
  );

  if (!categoryData) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Category not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Option to select main category */}
      <button
        onClick={() => onCategorySelect(selectedMainCategory)}
        className={`w-full text-left p-4 rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 hover:bg-blue-100 transition-colors ${
          selectedCategory === selectedMainCategory
            ? "border-solid bg-blue-100"
            : ""
        }`}
      >
        <div className="flex items-center space-x-3">
          {subcategories.length > 0 && subcategories[0].image_link ? (
            <div className="relative">
              <Image
                src={getSubcategoryImageUrl(
                  subcategories[0].image_link,
                  300,
                  300
                )}
                alt={selectedMainCategory}
                width={24}
                height={24}
                className="w-6 h-6 object-contain rounded"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.nextElementSibling?.classList.remove("hidden");
                }}
              />
              <div className="w-6 h-6 bg-blue-300 rounded flex items-center justify-center text-blue-700 text-xs font-bold">
                {selectedMainCategory.charAt(0)}
              </div>
            </div>
          ) : (
            <div className="w-6 h-6 bg-blue-300 rounded flex items-center justify-center text-blue-700 text-xs font-bold">
              {selectedMainCategory.charAt(0)}
            </div>
          )}
          <div>
            <div className="font-medium text-blue-700">
              All {selectedMainCategory}
            </div>
            <div className="text-sm text-blue-600">
              General {selectedMainCategory.toLowerCase()} category
            </div>
          </div>
        </div>
      </button>

      {/* Subcategories */}
      {subcategories.map((subcategory) => (
        <button
          key={subcategory.id}
          onClick={() => onCategorySelect(subcategory.id)}
          className={`w-full text-left p-4 rounded-lg hover:bg-gray-50 transition-colors border-l-4 ${
            selectedCategory === subcategory.id
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-transparent"
          }`}
        >
          <div className="flex items-center space-x-3">
            {subcategory.image_link ? (
              <div className="relative">
                <Image
                  src={getSubcategoryImageUrl(subcategory.image_link, 300, 300)}
                  alt={subcategory.category}
                  width={20}
                  height={20}
                  className="object-contain rounded"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    target.nextElementSibling?.classList.remove("hidden");
                  }}
                />
                <Tag className="hidden w-5 h-5 text-gray-400" />
              </div>
            ) : (
              <Tag className="w-5 h-5 text-gray-400" />
            )}
            <span className="font-medium">{subcategory.category}</span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default SubcategoryView;
