import { useState, useCallback } from "react";

// useServiceSelector.ts
export interface ServiceSelection {
  category: string;
  subcategory: string;
  childcategory?: string; 
}

export interface UseServiceSelectorReturn {
  selectedService: ServiceSelection | null;
  setSelectedService: (selection: ServiceSelection | null) => void;
  isServiceSelected: (
    category: string,
    subcategory: string,
    childcategory: string
  ) => boolean;
  clearSelection: () => void;
  getSelectedServicePath: () => string[];
}

export const useServiceSelector = (): UseServiceSelectorReturn => {
  const [selectedService, setSelectedService] =
    useState<ServiceSelection | null>(null);

  const isServiceSelected = useCallback(
    (
      category: string,
      subcategory: string
      // childcategory: string
    ): boolean => {
      if (!selectedService) return false;

      return (
        selectedService.category === category &&
        selectedService.subcategory === subcategory
        // && selectedService.childcategory === childcategory
      );
    },
    [selectedService]
  );

  const clearSelection = useCallback(() => {
    setSelectedService(null);
  }, []);

  const getSelectedServicePath = useCallback((): string[] => {
    if (!selectedService) return [];

    return [
      selectedService.category,
      selectedService.subcategory,
      // selectedService.childcategory
    ];
  }, [selectedService]);

  return {
    selectedService,
    setSelectedService,
    isServiceSelected,
    clearSelection,
    getSelectedServicePath,
  };
};
