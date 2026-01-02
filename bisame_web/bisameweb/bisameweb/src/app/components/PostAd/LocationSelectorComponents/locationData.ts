export interface LocationItem {
  city: string;
  region: string;
}

export const ghanaianLocations: Record<string, string[]> = {
  "Greater Accra": [
    "Accra Central",
    "Adabraka",
    "Airport Residential Area",
    "Asylum Down",
    "Cantonments",
    "Circle",
    "Dansoman",
    "East Legon",
    "Haatso",
    "Kasoa",
    "Kokomlemle",
    "Labadi",
    "Labone",
    "Madina",
    "Nungua",
    "Osu",
    "Ridge",
    "Spintex",
    "Tema",
    "Teshie",
    "Weija"
  ],
  "Ashanti": [
    "Kumasi Central",
    "Adum",
    "Asokwa",
    "Bantama",
    "Ejisu",
    "Kejetia",
    "Nhyiaeso",
    "Oforikrom",
    "Suame",
    "Tafo"
  ],
  "Western": [
    "Sekondi-Takoradi",
    "Axim",
    "Elmina",
    "Half Assini",
    "Prestea",
    "Tarkwa"
  ],
  "Central": [
    "Cape Coast",
    "Winneba",
    "Swedru",
    "Agona Swedru",
    "Elmina"
  ],
  "Eastern": [
    "Koforidua",
    "Akosombo",
    "Begoro",
    "Nkawkaw",
    "Oda",
    "Somanya"
  ],
  "Northern": [
    "Tamale",
    "Yendi"
  ],
  "Volta": [
    "Ho",
    "Aflao",
    "Hohoe",
    "Keta",
    "Kpando"
  ],
  "Brong Ahafo": [
    "Sunyani",
    "Berekum",
    "Dormaa Ahenkro",
    "Techiman",
    "Wenchi"
  ],
  "Upper East": [
    "Bolgatanga",
    "Bawku",
    "Navrongo"
  ],
  "Upper West": [
    "Wa",
    "Lawra",
    "Tumu"
  ]
};

export const getAllLocations = (): LocationItem[] => {
  return Object.entries(ghanaianLocations).flatMap(([region, cities]) =>
    cities.map(city => ({ city, region }))
  );
};
