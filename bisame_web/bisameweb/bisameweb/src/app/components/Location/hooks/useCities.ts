import { useState, useMemo, ChangeEvent } from 'react';
import { Region, City, LocationGroup } from '../LocationGrid/types';

export function useCities(selectedRegion: Region | null) {
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Group cities by first letter
  const cityGroups: LocationGroup<City>[] = useMemo(() => {
    if (!selectedRegion) return [];
    const filtered = selectedRegion.cities.filter(city =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const groups: Record<string, City[]> = {};
    filtered.forEach(city => {
      const letter = city.name.trim().charAt(0).toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(city);
    });
    return Object.entries(groups)
      .map(([letter, locations]) => ({ letter, locations }))
      .sort((a, b) => a.letter.localeCompare(b.letter));
  }, [selectedRegion, searchTerm]);
  
  //Total ads
  const totalAds = useMemo(() => {
    if (!selectedRegion) return 0;
    return selectedRegion.cities.reduce((sum, city) => sum + (city.ads || 0), 0);
  }, [selectedRegion]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return {
    cityGroups,
    totalAds,
    searchTerm,
    setSearchTerm,
    handleSearchChange,
  };
}