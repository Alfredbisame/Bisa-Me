import React from "react";
import { LocationProps } from "../PostServiceFormComponents/FormContext";
import { MapPin, ChevronRight } from "lucide-react";

interface LocationButtonProps {
  selectedLocation: LocationProps;
  onOpen: () => void;
  className?: string;
}

const LocationButton: React.FC<LocationButtonProps> = ({
  selectedLocation,
  onOpen,
  className = "",
}) => {
  const displayText = selectedLocation?.city
    ? `${selectedLocation.city}, ${selectedLocation.region}`
    : "Select Location";

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-semibold text-gray-700">
        Location *
      </label>
      <button
        type="button"
        onClick={onOpen}
        className={`w-full flex justify-between items-center border-2 rounded-xl px-4 py-3 text-sm sm:text-base font-medium transition-all duration-200 hover:shadow-md
        ${
          selectedLocation?.city
            ? "border-orange-300 bg-orange-50 text-orange-700"
            : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50"
        }
        `}
      >
        <div className="flex items-center space-x-3">
          <MapPin
            className={`w-5 h-5 sm:w-6 sm:h-6 ${
              selectedLocation?.city ? "text-orange-500" : "text-gray-400"
            }`}
          />
          <span className="truncate max-w-xs sm:max-w-sm">{displayText}</span>
        </div>
        <ChevronRight
          className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform ${
            selectedLocation?.city ? "text-orange-500" : "text-gray-400"
          }`}
        />
      </button>
      {!selectedLocation?.city && (
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Choose where your item is located
        </p>
      )}
    </div>
  );
};

export default LocationButton;
