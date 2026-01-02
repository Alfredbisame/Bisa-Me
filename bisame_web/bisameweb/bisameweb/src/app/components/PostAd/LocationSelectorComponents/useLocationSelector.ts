import { useState, useMemo } from "react";
import { useLocationData, searchCities } from "./useLocationData";

export interface LocationSelectorCallbacks {
  onSelect: (city: string, region: string) => void;
}

export const useLocationSelector = (callbacks: LocationSelectorCallbacks) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const { data: locationData, loading, error } = useLocationData();

  const filteredLocations = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const searchResults = searchCities(locationData, searchTerm);
    return searchResults.map((search) => ({
      city: search.city,
      region: search.region,
    }));
  }, [locationData, searchTerm]);

  const handleLocationSelect = (city: string, region: string) => {
    console.log({ city, region });
    callbacks.onSelect(city, region);
    closeModal();
  };

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(selectedRegion === region ? null : region);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSearchTerm("");
    setSelectedRegion(null);
  };

  return {
    // State
    isOpen,
    searchTerm,
    selectedRegion,
    filteredLocations,

    // API State
    locationData,
    loading,
    error,

    // Handlers
    handleLocationSelect,
    handleRegionSelect,
    openModal,
    closeModal,
    setSearchTerm,
  };
};
