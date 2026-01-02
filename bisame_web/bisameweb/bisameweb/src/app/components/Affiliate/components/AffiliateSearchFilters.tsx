import { FaSearch, FaCalendarAlt, FaFilter, FaSortAmountDown } from 'react-icons/fa';

interface AffiliateSearchFiltersProps {
  searchTerm: string;
  sortBy: 'name' | 'date';
  sortOrder: 'asc' | 'desc';
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSort: (field: 'name' | 'date') => void;
  onClearSearch: () => void;
}

const AffiliateSearchFilters = ({
  searchTerm,
  sortBy,
  sortOrder,
  onSearchChange,
  onSort,
  onClearSearch
}: AffiliateSearchFiltersProps) => {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Enhanced Search Bar */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={onSearchChange}
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                     transition-all duration-200 placeholder-gray-400"
            placeholder="Search affiliates by name..."
          />
          {searchTerm && (
            <button
              onClick={onClearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Sort Controls */}
        <div className="flex gap-2">
          <button
            onClick={() => onSort('name')}
            className={`px-4 py-2 rounded-lg border transition-all duration-200 flex items-center gap-2 ${
              sortBy === 'name'
                ? 'bg-orange-50 border-orange-200 text-orange-700'
                : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FaFilter className="h-3 w-3" />
            Name
            {sortBy === 'name' && (
              <FaSortAmountDown className={`h-3 w-3 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
            )}
          </button>
          <button
            onClick={() => onSort('date')}
            className={`px-4 py-2 rounded-lg border transition-all duration-200 flex items-center gap-2 ${
              sortBy === 'date'
                ? 'bg-orange-50 border-orange-200 text-orange-700'
                : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FaCalendarAlt className="h-3 w-3" />
            Date
            {sortBy === 'date' && (
              <FaSortAmountDown className={`h-3 w-3 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AffiliateSearchFilters; 