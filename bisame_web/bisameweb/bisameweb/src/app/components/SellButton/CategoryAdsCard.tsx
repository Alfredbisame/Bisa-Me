import React from "react";
import { IconType } from "react-icons";

interface CategoryAdsCardProps {
  categoryName: string;
  categoryDescription: string;
  icon: IconType;
  buttonAction: () => void;
}

const CategoryAdsCard: React.FC<CategoryAdsCardProps> = ({
  buttonAction,
  categoryDescription,
  categoryName,
  icon,
}) => {
  const IconComponent = icon;
  return (
    <button
      onClick={buttonAction}
      className="w-full flex flex-col justify-center items-center gap-4 border border-gray-200 rounded-lg p-3 md:p-5 text-left hover:border-orange-300 hover:shadow-md hover:bg-orange-50 transition-all duration-200 group"
    >
      <div className="flex-shrink-0 relative">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
          <IconComponent className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="flex-1 text-center">
        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors text-sm md:text-base">
          {categoryName}
        </h3>
        <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
          {categoryDescription}
        </p>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
      </div>
    </button>
  );
};

export default CategoryAdsCard;
