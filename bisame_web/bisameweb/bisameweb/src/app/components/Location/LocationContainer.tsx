'use client';
import React, { useState } from 'react';
import LocationBrowser from './LocationBrowser';
import CityBrowser from './CityBrowser';
import { Region } from './hooks/useLocations'; 

interface LocationContainerProps {
  onLocationSelect?: (locationName: string, locationHref: string) => void;
  isDropdownMode?: boolean;
}

const LocationContainer: React.FC<LocationContainerProps> = ({
  onLocationSelect,
  isDropdownMode = false
}) => {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  const handleRegionSelect = (region: Region) => {
    setSelectedRegion(region);
  };

  const handleResetToAll = () => {
    setSelectedRegion(null);
  };

  const handleCitySelect = (cityName: string, cityHref: string) => {
    if (onLocationSelect) {
      onLocationSelect(cityName, cityHref);
    }
  };

  return (
    <div className={`w-full ${isDropdownMode ? 'bg-white translate-y-0 opacity-100' : 'bg-gradient-to-br from-blue-50 to-orange-50 min-h-[600px]'}`}>
      {!selectedRegion ? (
        <LocationBrowser
          onLocationSelect={onLocationSelect}
          onRegionSelect={handleRegionSelect}
          onResetToAll={handleResetToAll}
          isDropdownMode={isDropdownMode}
        />
      ) : (
        <CityBrowser
          selectedRegion={selectedRegion}
          onCitySelect={handleCitySelect}
          onBackToRegions={handleResetToAll}
          isDropdownMode={isDropdownMode}
        />
      )}
    </div>
  );
};

export default LocationContainer;