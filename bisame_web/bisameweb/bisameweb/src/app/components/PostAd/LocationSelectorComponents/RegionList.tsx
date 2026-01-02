import { ChevronRight, MapPin } from "lucide-react";
import { CombinedCitiesType } from "./useLocationData";
import { LocationProps } from "../PostServiceFormComponents/FormContext";

export interface RegionData {
  region: string;
  cities: string[];
}

interface RegionListProps {
  selectedRegion: string | null;
  selectedLocation: LocationProps;
  onRegionSelect: (region: string) => void;
  onLocationSelect: (city: string, region: string) => void;
  locationData?: CombinedCitiesType[];
}

const RegionList = ({
  selectedRegion,
  selectedLocation,
  onRegionSelect,
  onLocationSelect,
  locationData,
}: RegionListProps) => {
  if (!locationData || locationData.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p>No regions available</p>
      </div>
    );
  }

  console.log(locationData);

  return (
    <div>
      {locationData.map((regionInfo) => {
        const regionId = `region-${regionInfo.region
          .replace(/\s+/g, "-")
          .toLowerCase()}`;
        const contentId = `content-${regionInfo.region
          .replace(/\s+/g, "-")
          .toLowerCase()}`;
        const isExpanded = selectedRegion === regionInfo.region;
        const region = regionInfo.region;
        return (
          <div
            key={regionInfo.region}
            className="border-b border-gray-100 last:border-b-0"
          >
            <button
              id={regionId}
              onClick={() => onRegionSelect(regionInfo.region)}
              aria-expanded={isExpanded}
              aria-controls={contentId}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div>
                <div className="font-medium text-sm text-gray-800">
                  {regionInfo.region}
                </div>
                <div className="text-xs md:text-sm text-gray-500">
                  {regionInfo.cities.length} locations
                </div>
              </div>
              <ChevronRight
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  isExpanded ? "rotate-90" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {isExpanded && (
              <div
                id={contentId}
                aria-labelledby={regionId}
                role="region"
                className="bg-gray-50 border-t border-gray-200"
              >
                {regionInfo.cities.map((city: string, index: number) => {
                  return (
                    <button
                      key={index}
                      onClick={() => onLocationSelect(city, region)}
                      className={`w-full text-left p-4 pl-8 hover:bg-white transition-colors border-l-4 ${
                        selectedLocation.city === city
                          ? "border-orange-500 bg-orange-50 text-orange-700"
                          : "border-transparent"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <MapPin
                          className="w-4 h-4 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="text-xs md:text-sm">{city}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RegionList;
