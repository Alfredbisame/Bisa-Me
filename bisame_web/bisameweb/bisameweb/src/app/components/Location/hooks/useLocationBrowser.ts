import { useState, useMemo } from 'react';
import { useLocations, Region } from './useLocations';
import type { LocationData } from '../LocationGrid/LocationItem';

interface LocationGroup<T extends LocationData> {
  letter: string;
  locations: T[];
}

interface UseLocationBrowserProps {
  onRegionSelect: (region: Region) => void;
  isDropdownMode?: boolean;
}

export function useLocationBrowser({ onRegionSelect }: UseLocationBrowserProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: regions, loading, error, refetch } = useLocations();

  //The total ads
  const totalAds = useMemo(() => {
    if (!regions || !Array.isArray(regions)) return 0;
    return regions.reduce((sum, region) => sum + (region.ads || 0), 0);
  }, [regions]);

  // Group regions by first letter
  const locationGroups: LocationGroup<LocationData>[] = useMemo(() => {
    if (!regions || !Array.isArray(regions)) return [];
    const filtered = regions.filter(region =>
      region.region.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const groups: Record<string, LocationData[]> = {};
    filtered.forEach(region => {
      const letter = region.region.trim().charAt(0).toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(region as unknown as LocationData);
    });
    return Object.entries(groups)
      .map(([letter, locations]) => ({ letter, locations }))
      .sort((a, b) => a.letter.localeCompare(b.letter));
  }, [regions, searchTerm]);

  const handleLocationClick = (region: LocationData) => {
    // Type guard to ensure we're dealing with a Region
    if ('region' in region && 'ads' in region && 'cities' in region) {
      onRegionSelect(region as Region);
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    totalAds,
    locationGroups,
    loading,
    error,
    refetch,
    handleLocationClick,
  };
}