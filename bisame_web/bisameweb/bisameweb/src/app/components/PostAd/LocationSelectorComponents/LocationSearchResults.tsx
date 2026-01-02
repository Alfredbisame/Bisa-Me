import { MapPin } from "lucide-react";

// Type for search result items
interface LocationItem {
  city: string;
  region: string;
}

// Type for selected location
interface LocationProps {
  city: string;
  region: string;
}

interface LocationSearchResultsProps {
  filteredLocations: LocationItem[];
  selectedLocation: LocationProps;
  onLocationSelect: (city: string, region: string) => void;
}

const LocationSearchResults = ({
  filteredLocations,
  selectedLocation,
  onLocationSelect,
}: LocationSearchResultsProps) => {
  if (filteredLocations.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p>No locations found</p>
        <p className="text-sm mt-1">Try a different search term</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {filteredLocations.map(({ city, region }) => {
        const isSelected =
          selectedLocation.city === city && selectedLocation.region === region;

        return (
          <button
            key={`${region}-${city}`}
            onClick={() => onLocationSelect(city, region)}
            className={`w-full text-left p-4 rounded-lg transition-colors border-l-4 ${
              isSelected
                ? "border-orange-500 bg-orange-50"
                : "border-transparent hover:bg-gray-50"
            }`}
          >
            <div className="flex items-start space-x-3">
              <MapPin
                className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                  isSelected ? "text-orange-500" : "text-gray-400"
                }`}
                aria-hidden="true"
              />
              <div className="flex-1 min-w-0">
                <div
                  className={`font-medium ${
                    isSelected ? "text-orange-700" : "text-gray-800"
                  }`}
                >
                  {city}
                </div>
                <div
                  className={`text-sm ${
                    isSelected ? "text-orange-600" : "text-gray-500"
                  }`}
                >
                  {region} Region
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default LocationSearchResults;
