'use client';
import React from 'react';
import LocationHeader from './LocationHeader';
import LocationGrid from './LocationGrid';
import { useLocationBrowser } from './hooks/useLocationBrowser';
import { Region } from './hooks/useLocations';

interface LocationBrowserProps {
  onLocationSelect?: (regionName: string, regionHref: string) => void;
  onRegionSelect: (region: Region) => void;
  onResetToAll: () => void;
  isDropdownMode?: boolean;
}

const LocationBrowser: React.FC<LocationBrowserProps> = (props) => {
  const {
    searchTerm,
    setSearchTerm,
    totalAds,
    locationGroups,
    loading,
    error,
    refetch,
    handleLocationClick
  } = useLocationBrowser(props);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={`${props.isDropdownMode ? 'p-4' : 'max-w-7xl mx-auto p-6'}`}>
      <LocationHeader
        title="All Ghana"
        totalAds={totalAds}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onResetClick={props.onResetToAll}
        isDropdownMode={props.isDropdownMode}
        showBackButton={false}
        loading={loading}
        error={error}
        refetch={refetch}
      />
      <LocationGrid
        locationGroups={locationGroups}
        onLocationClick={handleLocationClick}
        isDropdownMode={props.isDropdownMode}
        itemType="region"
        loading={loading}
      />
    </div>
  );
};

export default LocationBrowser;