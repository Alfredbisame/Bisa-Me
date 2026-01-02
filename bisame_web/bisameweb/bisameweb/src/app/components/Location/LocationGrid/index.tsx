import React from "react";
import LocationGroupCard from "./LocationGroupCard";
import NoLocationsFound from "./NoLocationsFound";
import { getLocationColumns } from "./locationGridUtils";
import { LocationGroup } from "./types";
import type { LocationData } from "./LocationItem";
import LoadingSpinner from "../../Seller/LoadingSpinner";

interface LocationGridProps<T extends LocationData> {
  locationGroups: LocationGroup<T>[];
  onLocationClick: (location: T) => void;
  isDropdownMode?: boolean;
  itemType?: "region" | "city";
  loading?: boolean;
}

function LocationGrid<T extends LocationData>({
  locationGroups,
  onLocationClick,
  isDropdownMode = false,
  itemType = "region",
  loading = false,
}: LocationGridProps<T>) {
  const columns = getLocationColumns(locationGroups);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <LoadingSpinner size="md" />
      </div>
    );
  }

  if (locationGroups.length === 0) {
    return <NoLocationsFound />;
  }

  return (
    <div className="mt-6">
      <div
        className={`
        grid grid-cols-1 lg:grid-cols-2 gap-6
        ${
          isDropdownMode
            ? "max-h-96 overflow-y-auto pr-2"
            : "max-h-[600px] overflow-y-auto pr-2"
        }
      `}
      >
        <div className="space-y-4">
          {columns[0].map((group) => (
            <LocationGroupCard
              key={`left-${group.letter}`}
              group={group}
              onLocationClick={onLocationClick}
              isDropdownMode={isDropdownMode}
              itemType={itemType}
            />
          ))}
        </div>
        <div className="space-y-4">
          {columns[1].map((group) => (
            <LocationGroupCard
              key={`right-${group.letter}`}
              group={group}
              onLocationClick={onLocationClick}
              isDropdownMode={isDropdownMode}
              itemType={itemType}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LocationGrid;
