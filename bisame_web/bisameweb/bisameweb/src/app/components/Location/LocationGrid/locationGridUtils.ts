import { LocationGroup } from './types';
import type { LocationData } from './LocationItem';

export function getLocationColumns<T extends LocationData>(locationGroups: LocationGroup<T>[]): LocationGroup<T>[][] {
  const filteredGroups = locationGroups.filter(group => group.locations.length > 0);
  const columns: LocationGroup<T>[][] = [[], []];

  if (filteredGroups.length === 0) return columns;

  const sortedGroups = [...filteredGroups].sort((a, b) => b.locations.length - a.locations.length);

  let leftColumnWeight = 0;
  let rightColumnWeight = 0;

  sortedGroups.forEach((group) => {
    const groupWeight = group.locations.length;

    if (leftColumnWeight <= rightColumnWeight) {
      columns[0].push(group);
      leftColumnWeight += groupWeight;
    } else {
      columns[1].push(group);
      rightColumnWeight += groupWeight;
    }
  });
  
  columns[0].sort((a, b) => a.letter.localeCompare(b.letter));
  columns[1].sort((a, b) => a.letter.localeCompare(b.letter));

  return columns;
}