import useSWR from "swr";
import { authHttpClient, buildListingsUrl, REGION_ENDPOINTS } from "@/lib";

/* ------------------ TYPES ------------------ */

// Cities object containing 2 arrays
export interface Cities {
  others: string[];
  popular: string[];
}

// Region with structured cities
export interface RegionData {
  region: string;
  cities: Cities;
}

// Combined version for frontend (flat array of city names)
export interface CombinedCitiesType {
  cities: string[]; // Flattened + sorted
  region: string;
}

export interface UseLocationDataReturn {
  data: CombinedCitiesType[] | undefined;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface DataTypes {
  data: {
    others: RegionData[];
    popular: RegionData[];
  };
}

const fetcher = async (url: string): Promise<CombinedCitiesType[]> => {
  try {
    const response = await authHttpClient.get<DataTypes>(url);

    const Data = response;

    const OthersData = Data.data.others;
    const PopularData = Data.data.popular;

    const combinedData = [...PopularData, ...OthersData];

    const combinedCities = combinedData.map(({ region, cities }) => {
      const sorted = [...cities.popular, ...cities.others]
        .filter((city) => city != null && typeof city === "string") // Add this
        .sort();
      return {
        cities: sorted,
        region,
      };
    });

    return combinedCities;
  } catch (err: any) {
    console.error("Error fetching location data:", err);

    // Handle ApiError from the client
    if (err?.status === 401) throw new Error("Authentication failed.");
    if (err?.status === 403) throw new Error("Access denied.");
    if (err?.status === 404) throw new Error("Location service not found.");
    if (err?.status === 429)
      throw new Error("Too many requests. Try again later.");
    if (err?.status >= 500)
      throw new Error("Server error. Try again later.");

    if (err?.message) {
      throw new Error(`Fetch failed: ${err.message}`);
    }

    throw new Error("Unexpected error fetching location data.");
  }
};

export const useLocationData = (): UseLocationDataReturn => {
  const apiUrl = buildListingsUrl(REGION_ENDPOINTS.ranked);
  
  const { data, error, isLoading, mutate } = useSWR<CombinedCitiesType[]>(
    apiUrl,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 0,
      dedupingInterval: 2000,
      errorRetryInterval: 5000,
      errorRetryCount: 3,
    }
  );

  return {
    data,
    loading: isLoading,
    error: error?.message || null,
    refetch: () => mutate(),
  };
};

export const searchCities = (
  data: CombinedCitiesType[] | undefined,
  searchTerm: string
) => {
  if (!data || !searchTerm.trim()) return [];

  const lower = searchTerm.trim().toLowerCase();

  // Search through all regions and cities
  const results = data.flatMap(({ cities, region }) =>
    cities
      .filter((city) => city.toLowerCase().includes(lower))
      .map((city) => ({
        city,
        region,
      }))
  );

  // Optional: Sort results by relevance (exact matches first, then alphabetically)
  return results.sort((a, b) => {
    const aLower = a.city.toLowerCase();
    const bLower = b.city.toLowerCase();

    // Exact matches come first
    const aExact = aLower === lower;
    const bExact = bLower === lower;
    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;

    // Starts with search term comes next
    const aStarts = aLower.startsWith(lower);
    const bStarts = bLower.startsWith(lower);
    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;

    // Otherwise alphabetically
    return aLower.localeCompare(bLower);
  });
};

export const getDistrictsByRegion = (
  data: RegionData[] | undefined,
  regionName: string
): Cities | null => {
  if (!data) return null;

  const region = data.find(
    (r) => r.region.toLowerCase() === regionName.toLowerCase()
  );

  return region?.cities ?? null;
};
