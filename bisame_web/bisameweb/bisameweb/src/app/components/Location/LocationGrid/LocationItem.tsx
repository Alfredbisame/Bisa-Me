import { FaChevronRight } from 'react-icons/fa';

// Define interfaces for different location types
interface RegionLocation {
  region: string;
  ads: number;
}

interface CityLocation {
  name: string;
  ads: number;
}

interface GenericLocation {
  name: string;
  ads: number;
}

// Union type for all possible location types
export type LocationData = RegionLocation | CityLocation | GenericLocation;

interface LocationItemProps<T extends LocationData> {
  location: T;
  onLocationClick: (location: T) => void;
  isDropdownMode?: boolean;
  showDivider?: boolean;
  itemType?: 'region' | 'city';
}

// Type guards to safely check location types
function isRegionLocation(location: LocationData): location is RegionLocation {
  return 'region' in location && typeof location.region === 'string';
}

function isCityLocation(location: LocationData): location is CityLocation {
  return 'name' in location && typeof location.name === 'string';
}

function LocationItem<T extends LocationData>({
  location,
  onLocationClick,
  isDropdownMode = false,
  showDivider = false,
  itemType = 'region',
}: LocationItemProps<T>) {
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  const handleClick = () => {
    onLocationClick(location);
  };

  // Render name and ads count based on itemType and location shape
  let name = '';
  let ads = 0;
  
  if (itemType === 'region' && isRegionLocation(location)) {
    name = location.region;
    ads = location.ads;
  } else if (itemType === 'city' && isCityLocation(location)) {
    name = location.name;
    ads = location.ads;
  } else if (isCityLocation(location)) {
    name = location.name;
    ads = location.ads;
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className={`flex justify-between items-center w-full text-left px-4 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-700 transition-all duration-200 group ${isDropdownMode ? 'text-xs' : 'text-sm'}`}
      >
        <div className="flex items-center flex-1">
          <div className="flex-1">
            <span className="font-medium text-gray-800 group-hover:text-orange-700">
              {name}
            </span>
            <div className="flex items-center mt-1">
              <span className="text-gray-500 group-hover:text-orange-600 text-xs">
                {formatNumber(ads)} ads
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center ml-4">
          <div className="bg-gray-100 group-hover:bg-orange-100 rounded-full p-2 transition-colors duration-150">
            <FaChevronRight className="text-gray-400 group-hover:text-orange-500 text-xs" />
          </div>
        </div>
      </button>
      {/* Divider */}
      {showDivider && (
        <div className="mx-4 border-b border-gray-100"></div>
      )}
    </div>
  );
}

export default LocationItem;