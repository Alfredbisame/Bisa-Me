import React from "react";
import LocationItem from "./LocationItem";
import { LocationGroup } from "./types";

// Import the LocationData type from LocationItem
import type { LocationData } from "./LocationItem";

interface LocationGroupCardProps<T extends LocationData> {
  group: LocationGroup<T>;
  onLocationClick: (location: T) => void;
  isDropdownMode?: boolean;
  itemType?: "region" | "city";
}

function LocationGroupCard<T extends LocationData>({
  group,
  onLocationClick,
  isDropdownMode = false,
  itemType = "region",
}: LocationGroupCardProps<T>) {
  const getGroupTitle = (letter: string, itemType: string, locations: T[]) => {
    if (itemType === "city") {
      return `${letter} Cities`;
    }

    // For regions, use the actual region name from the data
    if (
      locations.length > 0 &&
      typeof locations[0] === "object" &&
      locations[0] !== null &&
      "region" in locations[0]
    ) {
      // If all locations in this group are the same region, return that region name
      const regionNames = locations
        .map((loc) => {
          if (typeof loc === "object" && loc !== null && "region" in loc) {
            return (loc as { region?: string }).region;
          }
          return undefined;
        })
        .filter((name): name is string => typeof name === "string");
      const uniqueRegions = [...new Set(regionNames)];
      if (uniqueRegions.length === 1) {
        return uniqueRegions[0];
      }
    }

    // Fallback to generic titles
    const regionTitles: Record<string, string> = {
      A: "Ashanti Region",
      B: "Brong Ahafo Region",
      C: "Central Region",
      E: "Eastern Region",
      G: "Greater Accra Region",
      N: "Northern Region",
      U: "Upper Regions",
      V: "Volta Region",
      W: "Western Region",
    };
    return regionTitles[letter] || `${letter} Regions`;
  };

  // Calculate total ads for the group
  const getTotalAds = () => {
    if (itemType === "region") {
      // For regions, sum up the ads from each location
      return group.locations.reduce((total: number, location: T) => {
        const ads = (location as { ads?: number }).ads ?? 0;
        return total + ads;
      }, 0);
    }
    return group.locations.length;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Letter Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
            <span
              className={`font-bold text-white ${
                isDropdownMode ? "text-lg" : "text-xl"
              }`}
            >
              {group.letter}
            </span>
          </div>
          <div>
            <h3
              className={`font-semibold text-white ${
                isDropdownMode ? "text-sm" : "text-lg"
              }`}
            >
              {getGroupTitle(group.letter, itemType, group.locations)}
            </h3>
            <p
              className={`text-orange-100 ${
                isDropdownMode ? "text-xs" : "text-sm"
              }`}
            >
              {getTotalAds()} {itemType}
              {getTotalAds() !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>
      {/* Locations List */}
      <div className="p-2">
        {group.locations.map((location, index) => (
          <LocationItem
            key={index}
            location={location}
            onLocationClick={onLocationClick}
            isDropdownMode={isDropdownMode}
            showDivider={index < group.locations.length - 1}
            itemType={itemType}
          />
        ))}
      </div>
    </div>
  );
}

export default LocationGroupCard;
