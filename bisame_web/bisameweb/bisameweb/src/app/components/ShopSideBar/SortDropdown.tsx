import { useState } from 'react';

interface SortOption {
  value: string;
  label: string;
}

const SORT_OPTIONS: SortOption[] = [
  { value: 'most-popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'rating', label: 'Rating' },
];

interface SortDropdownProps {
  onSort?: (value: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ onSort }) => {
  const [selectedSort, setSelectedSort] = useState<string>(SORT_OPTIONS[0].value);

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    onSort?.(value);
  };
  
  return (
    <div className="flex items-center space-x-6 p-4">
      <label className="text-gray-700 font-medium whitespace-nowrap text-sm md:text-base">Sort by:</label>
      <div className="relative inline-block min-w-full">
        <select
          value={selectedSort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="block w-full text-sm md:text-base bg-white
                   border border-gray-300 text-gray-700
                   p-2 rounded-sm 
                   cursor-pointer hover:border-orange-500
                   focus:outline-none focus:ring-1
                   focus:ring-orange-500 focus:border-orange-500
                   transition-colors duration-200"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
  
};

export default SortDropdown;
