import { FaSearch } from "react-icons/fa";
import LoadingSpinner from "../Forms/OtherFields/LoadingSpinner";

interface LocationHeaderProps {
  title: string;
  totalAds: number;
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetClick: () => void;
  isDropdownMode?: boolean;
  showBackButton?: boolean;
  backButtonText?: string;
  loading?: boolean;
  error?: string | null;
  refetch?: () => void;
}

const LocationHeader: React.FC<LocationHeaderProps> = ({
  title,
  totalAds,
  searchTerm,
  onSearchChange,
  onResetClick,
  isDropdownMode = false,
  showBackButton = false,
  backButtonText = "← Back",
  loading = false,
  error = null,
  refetch,
}) => {
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  return (
    <div className={`${isDropdownMode ? "mb-6" : "mb-8"}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <button
              onClick={onResetClick}
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors duration-200 font-medium"
            >
              <span className="text-sm">{backButtonText}</span>
            </button>
          )}
          <div className="text-sm text-gray-700">
            <button
              onClick={onResetClick}
              className="font-medium text-gray-800 hover:text-orange-600 transition-colors duration-200 cursor-pointer focus:outline-none"
              tabIndex={0}
              aria-label="Go to All Ghana"
            >
              {title}
            </button>
            <span className="text-orange-600 font-semibold ml-2">
              • {formatNumber(totalAds)} Ads
            </span>
            {loading && (
              <span className="ml-2 align-middle inline-flex">
                <LoadingSpinner size="sm" color="orange" />
              </span>
            )}
            {error && (
              <span className="ml-2 text-xs text-red-500">
                {error}{" "}
                {refetch && (
                  <button onClick={refetch} className="underline ml-1">
                    Retry
                  </button>
                )}
              </span>
            )}
          </div>
        </div>
        {/* Search Bar */}
        <div className="relative">
          <div
            className={`flex items-center bg-white border border-gray-300 rounded-xl px-2 py-3 shadow-sm hover:shadow-md transition-all duration-200 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-200 ${
              isDropdownMode ? "text-xs" : ""
            }`}
          >
            <FaSearch className="text-gray-400 text-sm mr-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="Find by Region or City..."
              value={searchTerm}
              onChange={onSearchChange}
              className={`outline-none text-gray-700 placeholder:text-gray-400 bg-transparent w-full ${
                isDropdownMode ? "text-xs w-[200px]" : "text-sm md:w-[300px]"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationHeader;
