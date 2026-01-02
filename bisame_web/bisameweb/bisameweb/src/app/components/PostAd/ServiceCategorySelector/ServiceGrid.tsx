import React from "react";
import { ServiceSelection } from "./useServiceSelector";
import { ServiceButton } from "./ServiceButton";
import { ServiceData } from "@/app/sell/allcategory/interfaces";

interface ServiceGridProps {
  services: ServiceData[];
  selectedService: ServiceSelection | null;
  onServiceSelect: (selection: ServiceSelection) => void;
  className?: string;
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({
  services,
  selectedService,
  onServiceSelect,
  className = "",
}) => {
  const isServiceSelected = (
    category: string,
    subcategory: string
  ): boolean => {
    if (!selectedService) return false;

    return (
      selectedService.category === category &&
      selectedService.subcategory === subcategory
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {services.map((service) => (
        <div key={service.category} className="space-y-4">
          <div className="border-b border-gray-200 pb-2">
            <h3 className="text-xs md:text-lg font-semibold text-blue-500">
              {service.category}
            </h3>
            <p className="text-xs md:text-sm text-gray-500">
              {service.subtotal} subcategories available
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {service.sub.map((subcategory, index: number) => (
              <div key={index}>
                <ServiceButton
                  service={service}
                  subcategory={subcategory}
                  isSelected={isServiceSelected(
                    service.category,
                    subcategory.subcategory
                  )}
                  onSelect={onServiceSelect}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
