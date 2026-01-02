import { ChevronRight } from "lucide-react";
import { useCategoryData, getSubcategoryImageUrl } from "./useCategoryData";
import Image from "next/image";

interface CategoryGridProps {
  selectedCategory: string;
  onMainCategoryClick: (category: string) => void;
}

const CategoryGrid = ({
  onMainCategoryClick,
  selectedCategory,
}: CategoryGridProps) => {
  const { data, loading, error } = useCategoryData(selectedCategory);

  if (loading) {
    return (
      <div className="grid gap-3">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gray-300 rounded"></div>
                <div>
                  <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-20"></div>
                </div>
              </div>
              <div className="w-5 h-5 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Unable to load categories</p>
        <p className="text-sm">{error || "Please try again later"}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {data.map((categoryData) => (
        <button
          key={categoryData.category}
          onClick={() => onMainCategoryClick(categoryData.category)}
          className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
        >
          <div className="flex items-center space-x-4">
            {/* Use first subcategory's image as category icon, or fallback */}
            {categoryData.sub.length > 0 && categoryData.sub[0].image_link ? (
              <div className="relative">
                <Image
                  src={getSubcategoryImageUrl(
                    categoryData.sub[0].image_link,
                    300,
                    300
                  )}
                  alt={categoryData.category}
                  width={32}
                  height={32}
                  className="object-contain rounded"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    target.nextElementSibling?.classList.remove("hidden");
                  }}
                />
                <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-gray-600 text-sm font-bold">
                  {categoryData.category.charAt(0)}
                </div>
              </div>
            ) : (
              <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-gray-600 text-sm font-bold">
                {categoryData.category.charAt(0)}
              </div>
            )}
            <div className="text-left">
              <div className="font-medium text-gray-800 group-hover:text-blue-700">
                {categoryData.category}
              </div>
              <div className="text-sm text-gray-500">
                {categoryData.total} subcategories
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
        </button>
      ))}
    </div>
  );
};

export default CategoryGrid;
