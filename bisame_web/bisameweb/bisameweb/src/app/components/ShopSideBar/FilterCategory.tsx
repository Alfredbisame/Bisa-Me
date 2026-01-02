import { useState } from 'react';

interface CategoryOption {
  id: string;
  label: string;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  { id: 'electronics', label: 'Electronics Devices' },
  { id: 'computer-laptop', label: 'Computer & Laptop' },
  { id: 'computer-accessories', label: 'Computer Accessories' },
  { id: 'smartphone', label: 'SmartPhone' },
  { id: 'headphone', label: 'Headphone' },
  { id: 'mobile-accessories', label: 'Mobile Accessories' },
  { id: 'gaming-console', label: 'Gaming Console' },
  { id: 'camera-photo', label: 'Camera & Photo' },
  { id: 'tv-homes-appliances', label: 'TV & Home Appliances' },
  { id: 'watches-accessories', label: 'Watches & Accessories' },
  { id: 'gps-navigation', label: 'GPS & Navigation' },
  { id: 'wearable-technology', label: 'Wearable Technology' },
];

const FilterCategory: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('electronics');

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="flex flex-start items-center">
      <div className="bg-white p-4">
        <h2 className="text-xl font-bold mb-6 text-gray-800">CATEGORY</h2>
        <ul className="space-y-3">
          {CATEGORY_OPTIONS.map((category) => (
            <li key={category.id} className="flex items-center">
              <input
                type="radio"
                id={category.id}
                name="category"
                value={category.id}
                checked={selectedCategory === category.id}
                onChange={() => handleCategoryChange(category.id)}
                className="form-radio text-orange-500 focus:ring-orange-500 cursor-pointer"
              />
              <label
                htmlFor={category.id}
                className="ml-3 text-sm text-gray-700 cursor-pointer hover:text-orange-500 transition-colors"
              >
                {category.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterCategory;
