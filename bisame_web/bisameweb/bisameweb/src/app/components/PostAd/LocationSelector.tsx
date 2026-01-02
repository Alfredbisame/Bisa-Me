"use client";

import LocationButton from "./LocationSelectorComponents/LocationButton";
import LocationModal from "./LocationSelectorComponents/LocationModal";
import { useLocationSelector } from "./LocationSelectorComponents/useLocationSelector";
import { LocationProps } from "./PostServiceFormComponents/FormContext";

interface LocationSelectorProps {
  selectedLocation: LocationProps;
  onSelect: (city: string, region: string) => void;
}

const LocationSelector = ({
  selectedLocation,
  onSelect,
}: LocationSelectorProps) => {
  const {
    isOpen,
    searchTerm,
    selectedRegion,
    filteredLocations,
    locationData,
    loading,
    error,
    handleLocationSelect,
    handleRegionSelect,
    openModal,
    closeModal,
    setSearchTerm,
  } = useLocationSelector({ onSelect });

  return (
    <div className="w-full mx-auto">
      {/* Button triggers modal */}
      <LocationButton
        selectedLocation={selectedLocation}
        onOpen={openModal}
        className="w-full sm:w-auto"
      />

      {/* Modal */}
      <LocationModal
        isOpen={isOpen}
        searchTerm={searchTerm}
        selectedRegion={selectedRegion}
        filteredLocations={filteredLocations}
        selectedLocation={selectedLocation}
        locationData={locationData}
        loading={loading}
        error={error}
        onClose={closeModal}
        onSearchChange={setSearchTerm}
        onRegionSelect={handleRegionSelect}
        onLocationSelect={handleLocationSelect}
        // className="w-full sm:max-w-md lg:max-w-lg"
      />
    </div>
  );
};

export default LocationSelector;
