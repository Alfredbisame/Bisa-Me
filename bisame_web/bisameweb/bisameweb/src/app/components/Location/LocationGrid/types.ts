export interface LocationItem {
  id: string;
  name: string;
  adsCount: number;
  href: string;
}

export interface LocationGroup<T> {
  letter: string;
  locations: T[];
}

export interface City {
  name: string;
  ads: number;
}

export interface Region {
  region: string;
  ads: number;
  cities: City[];
}