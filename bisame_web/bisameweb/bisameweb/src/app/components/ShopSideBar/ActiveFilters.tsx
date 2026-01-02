import { FaTimes } from "react-icons/fa";

interface Filter {
  id: string;
  label: string;
}

interface ActiveFiltersProps {
  filters: Filter[];
  resultsCount: number;
  onRemoveFilter: (filterId: string) => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filters = [],
  resultsCount = 0,
  onRemoveFilter,
}) => {
  return (
    <div className="bg-orange-100 max-w-6xl mx-auto text-sm md:text-base">
      <div className="flex items-center justify-between p-2 shadow-sm rounded-sm">
        <div className="flex items-center space-x-3 text-gray-700">
          <span className="font-semibold">Active Filters:</span>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <div
                key={filter.id}
                className="flex items-center space-x-2
                         px-2 py-1 group
                         transition-colors duration-200"
              >
                <span className="text-gray-700">{filter.label}</span>
                <button
                  onClick={() => onRemoveFilter(filter.id)}
                  className="text-gray-500 hover:text-orange-500 
                           transition-colors duration-200"
                  aria-label={`Remove ${filter.label} filter`}
                >
                  <FaTimes className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="text-gray-700">
          <span className="font-bold text-orange-500">{resultsCount.toLocaleString()}</span>
          <span className="ml-1">Results found</span>
        </div>
      </div>
    </div>
  );
};

export default ActiveFilters;
