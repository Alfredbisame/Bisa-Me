import { Tag, ChevronRight } from 'lucide-react';
import { useCategoryData, findSubcategoryById, getSubcategoryImageUrl } from './useCategoryData';
import Image from 'next/image';

interface CategoryButtonProps {
  selectedCategory: string;
  onOpen: () => void;
}

const CategoryButton = ({ selectedCategory, onOpen }: CategoryButtonProps) => {
  const { data } = useCategoryData(selectedCategory);
  
  // Find the selected subcategory to get its details
  const selectedSubcategory = selectedCategory ? findSubcategoryById(data, selectedCategory) : null;
  
  // Display name - use subcategory name if found, otherwise use the selectedCategory value
  const displayName = selectedSubcategory?.category || selectedCategory || 'Select Category';

  return (
    <div className="space-y-2 relative">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Category *
      </label>
      
      <button
        type="button"
        onClick={onOpen}
        className={`w-full flex justify-between items-center border-2 rounded-xl px-4 py-4 text-sm font-medium transition-all duration-200 hover:shadow-md ${
          selectedCategory
            ? 'border-blue-300 bg-blue-50 text-blue-700'
            : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center space-x-3">
          {selectedSubcategory?.image_link ? (
            <Image
              src={getSubcategoryImageUrl(selectedSubcategory.image_link, 300, 300)}
              alt={selectedSubcategory.category}
              width={20}
              height={20}
              className="object-contain rounded"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <Tag className={`w-5 h-5 ${selectedCategory ? 'text-blue-500' : 'text-gray-400'} ${selectedSubcategory?.image_link ? 'hidden' : ''}`} />
          <span>{displayName}</span>
        </div>
        <ChevronRight className={`w-5 h-5 transition-transform ${selectedCategory ? 'text-blue-500' : 'text-gray-400'}`} />
      </button>
      
      {!selectedCategory && (
        <p className="text-xs text-gray-500 mt-1">Choose a category for your ad</p>
      )}
    </div>
  );
};

export default CategoryButton;
