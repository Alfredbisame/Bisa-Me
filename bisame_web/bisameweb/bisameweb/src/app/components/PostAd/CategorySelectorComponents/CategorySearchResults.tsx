import { Tag } from 'lucide-react';
import { FilteredCategoryItem } from './useCategorySelector';
import { getSubcategoryImageUrl } from './useCategoryData';
import Image from 'next/image';

interface CategorySearchResultsProps {
  filteredCategories: FilteredCategoryItem[];
  onCategorySelect: (categoryId: string) => void;
}

const CategorySearchResults = ({ filteredCategories, onCategorySelect }: CategorySearchResultsProps) => {
  if (filteredCategories.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Tag className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p>No categories found</p>
        <p className="text-sm">Try a different search term</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {filteredCategories.map(({ name, type, parent, icon, id }) => (
        <button
          key={id}
          onClick={() => onCategorySelect(id)}
          className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            {icon ? (
              <div className="relative">
                <Image
                  src={getSubcategoryImageUrl(icon, 300, 300)}
                  alt={name}
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain rounded"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <Tag className="hidden w-6 h-6 text-gray-400" />
              </div>
            ) : (
              <Tag className="w-6 h-6 text-gray-400" />
            )}
            <div>
              <div className="font-medium text-gray-800">{name}</div>
              {type === 'sub' && parent && (
                <div className="text-sm text-gray-500">in {parent}</div>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default CategorySearchResults;
