import React from "react";
import { ServiceSelection } from "../ServiceCategorySelector/useServiceSelector";
import { UploadedImage } from "./usePostAdForm";

interface FormSummaryProps {
  selectedService: ServiceSelection | null;
  selectedLocation: string;
  images: UploadedImage[];
  className?: string;
}

export const FormSummary: React.FC<FormSummaryProps> = ({
  selectedService,
  selectedLocation,
  images,
  className = "",
}) => {
  if (!selectedService && !selectedLocation && images.length === 0) {
    return null;
  }

  return (
    <div className={`mt-6 p-4 bg-gray-50 rounded-lg ${className}`}>
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Summary</h3>
      <div className="space-y-2 text-sm">
        {selectedService && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Service:</span>
            <span className="font-medium text-blue-600">
              {selectedService.category} {">"} {selectedService.subcategory}
            </span>
          </div>
        )}
        {selectedLocation && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Location:</span>
            <span className="font-medium text-orange-600">
              {selectedLocation}
            </span>
          </div>
        )}
        {images.length > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Photos:</span>
            <span className="font-medium text-green-600">
              {images.length} image{images.length !== 1 ? "s" : ""} uploaded
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
