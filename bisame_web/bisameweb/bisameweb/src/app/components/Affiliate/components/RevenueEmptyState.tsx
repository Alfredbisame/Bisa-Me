import { FaChartLine } from 'react-icons/fa';

interface RevenueEmptyStateProps {
  searchTerm: string;
  onClearSearch: () => void;
}

const RevenueEmptyState = ({ searchTerm, onClearSearch }: RevenueEmptyStateProps) => {
  return (
    <tr>
      <td colSpan={5} className="px-6 py-12 text-center">
        <div className="flex flex-col items-center">
          <FaChartLine className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-sm font-medium text-gray-900 mb-1">No revenue data found</h3>
          <p className="text-sm text-gray-500">
            {searchTerm ? `No results for "${searchTerm}"` : 'No revenue data available'}
          </p>
          {searchTerm && (
            <button
              onClick={onClearSearch}
              className="mt-2 text-sm text-orange-600 hover:text-orange-500"
            >
              Clear search
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default RevenueEmptyState; 