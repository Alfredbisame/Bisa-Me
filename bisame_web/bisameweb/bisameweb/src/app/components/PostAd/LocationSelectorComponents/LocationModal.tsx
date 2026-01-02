import { Search, Loader2, AlertCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import LocationSearchResults from "./LocationSearchResults";
import RegionList from "./RegionList";
import { LocationItem } from "./locationData";
import { CombinedCitiesType } from "./useLocationData";
import { LocationProps } from "../PostServiceFormComponents/FormContext";

interface LocationModalProps {
  isOpen: boolean;
  searchTerm: string;
  selectedRegion: string | null;
  filteredLocations: LocationItem[];
  selectedLocation: LocationProps;
  locationData?: CombinedCitiesType[];
  loading?: boolean;
  error?: string | null;
  onClose: () => void;
  onSearchChange: (term: string) => void;
  onRegionSelect: (region: string) => void;
  onLocationSelect: (city: string, region: string) => void;
}

const LocationModal = ({
  isOpen,
  searchTerm,
  selectedRegion,
  filteredLocations,
  selectedLocation,
  locationData,
  loading,
  error,
  onClose,
  onSearchChange,
  onRegionSelect,
  onLocationSelect,
}: LocationModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle keyboard events
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus management
  // useEffect(() => {
  //   if (isOpen && searchInputRef.current) {
  //     searchInputRef.current.focus();
  //   }
  // }, [isOpen]);

  // Focus trapping
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    };

    modal.addEventListener("keydown", handleTabKey);
    return () => modal.removeEventListener("keydown", handleTabKey);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="flex min-h-screen items-end sm:items-center justify-center sm:p-4 lg:p-6">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal panel */}
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="location-modal-title"
          className="relative flex flex-col bg-white sm:rounded-xl sm:rounded-t-2xl overflow-hidden sm:shadow-2xl transform transition-all w-full sm:max-w-md h-screen sm:h-[85vh] sm:max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 bg-blue-900 sm:rounded-t-xl border-b border-gray-200 flex-shrink-0">
            <div className="flex-1 min-w-0">
              <h3
                id="location-modal-title"
                className="text-base sm:text-lg md:text-xl font-semibold text-white truncate"
              >
                Select Location
              </h3>
              <p className="text-white text-xs sm:text-sm opacity-90 mt-0.5">
                Choose your preferred location
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close location selector"
              className="flex-shrink-0 text-white hover:text-gray-200 text-xl sm:text-2xl h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center hover:bg-white hover:bg-opacity-10 rounded-full transition-colors ml-3"
            >
              ✕
            </button>
          </div>

          {/* Search Bar */}
          <div className="px-3 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 border-b border-gray-100 bg-gray-50 flex-shrink-0">
            <label htmlFor="location-search" className="sr-only">
              Search locations
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                ref={searchInputRef}
                id="location-search"
                type="text"
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white shadow-sm"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain bg-white">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 sm:py-16">
                <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 animate-spin text-orange-500" />
                <span className="ml-2 mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 font-medium">
                  Loading locations...
                </span>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
                <div className="mx-auto flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-red-100 mb-4">
                  <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                </div>
                <p className="text-sm sm:text-base text-red-600 text-center mb-2 font-medium">
                  Failed to load locations
                </p>
                <p className="text-xs sm:text-sm text-gray-500 text-center">
                  {error}
                </p>
              </div>
            ) : searchTerm ? (
              <div className="px-3 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
                <LocationSearchResults
                  filteredLocations={filteredLocations}
                  selectedLocation={selectedLocation}
                  onLocationSelect={onLocationSelect}
                />
              </div>
            ) : (
              <RegionList
                selectedRegion={selectedRegion}
                selectedLocation={selectedLocation}
                onRegionSelect={onRegionSelect}
                onLocationSelect={onLocationSelect}
                locationData={locationData}
              />
            )}
          </div>

          {/* Footer */}
          <div className="px-3 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 border-t border-gray-200 bg-gray-50 sm:rounded-b-xl flex-shrink-0">
            <p className="text-xs text-gray-500 text-center">
              Can&apos;t find your location? Contact Bisame support to add it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
