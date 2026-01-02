'use client';
import React from 'react';
import LocationHeader from './LocationHeader';
import LocationGrid from './LocationGrid';
import { Region, City } from './LocationGrid/types';
import { useCities } from './hooks/useCities';
import type { LocationData } from './LocationGrid/LocationItem';

interface CityBrowserProps {
  selectedRegion: Region;
  onCitySelect: (cityName: string, cityHref: string) => void;
  onBackToRegions: () => void;
  isDropdownMode?: boolean;
}

const CityBrowser: React.FC<CityBrowserProps> = ({
  selectedRegion,
  onCitySelect,
  onBackToRegions,
  isDropdownMode = false
}) => {
  const {
    cityGroups,
    totalAds,
    searchTerm,
    handleSearchChange
  } = useCities(selectedRegion);

  const handleCityClick = (city: City) => {
    onCitySelect(
      city.name,
      `/location/${encodeURIComponent(city.name.trim().toLowerCase().replace(/\s+/g, '-') )}`
    );
  };

  return (
    <div className={isDropdownMode ? 'p-4' : 'max-w-7xl mx-auto p-6'}>
      <LocationHeader
        title={`${selectedRegion.region} Cities`}
        totalAds={totalAds}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onResetClick={onBackToRegions}
        isDropdownMode={isDropdownMode}
        showBackButton={true}
        backButtonText="← Back to All Regions"
      />
      <LocationGrid
        locationGroups={cityGroups}
        onLocationClick={handleCityClick as (location: LocationData) => void}
        isDropdownMode={isDropdownMode}
        itemType="city"
      />
    </div>
  );
};

export default CityBrowser;