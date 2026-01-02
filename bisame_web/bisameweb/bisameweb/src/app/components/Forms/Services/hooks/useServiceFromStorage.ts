import { useState, useEffect } from 'react';

/**
 * Interface for service selection data
 */
interface ServiceSelection {
  main: string;
  sub: string;
  child: string;
}

/**
 * Custom hook to get service data from localStorage
 * This retrieves the service data that was stored during the PostServiceForm submission
 * and updates when localStorage changes
 */
export const useServiceFromStorage = (): ServiceSelection | null => {
  const [selectedService, setSelectedService] = useState<ServiceSelection | null>(null);

  // Function to read and parse service data from localStorage
  const readServiceFromStorage = () => {
    const storedServiceData = localStorage.getItem('selectedServiceData');
    console.log('useServiceFromStorage - storedServiceData:', storedServiceData);
    
    if (storedServiceData) {
      try {
        const parsedService = JSON.parse(storedServiceData);
        console.log('useServiceFromStorage - parsedService:', parsedService);
        // Validate that the parsed service has the required fields
        if (parsedService && parsedService.category && parsedService.subcategory && parsedService.childcategory) {
          setSelectedService(parsedService);
          console.log('useServiceFromStorage - setting selectedService:', parsedService);
          console.log('useServiceFromStorage - API will be called with:', {
            main: parsedService.category,
            sub: parsedService.subcategory,
            child: parsedService.childcategory
          });
        } else {
          console.warn('Stored service data is missing required fields');
          localStorage.removeItem('selectedServiceData');
          setSelectedService(null);
        }
      } catch (error) {
        console.error('Error parsing stored service data:', error);
        // Clear invalid data
        localStorage.removeItem('selectedServiceData');
        setSelectedService(null);
      }
    } else {
      console.log('useServiceFromStorage - no stored service data found');
      setSelectedService(null);
    }
  };

  useEffect(() => {
    // Read service data from localStorage when component mounts
    readServiceFromStorage();

    // Listen for storage events to detect changes in localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'selectedServiceData') {
        console.log('useServiceFromStorage - localStorage changed, updating service data');
        readServiceFromStorage();
      }
    };

    // Listen for custom events for same-tab localStorage changes
    const handleCustomStorageChange = (e: CustomEvent) => {
      if (e.detail?.key === 'selectedServiceData') {
        console.log('useServiceFromStorage - custom storage event, updating service data');
        readServiceFromStorage();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageChange', handleCustomStorageChange as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleCustomStorageChange as EventListener);
    };
  }, []);

  return selectedService;
};