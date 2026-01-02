import useSWR from "swr";
import {
  CategoryDataType,
  ChildCategory,
  ServiceData,
  Subcategory,
} from "@/app/sell/allcategory/interfaces";
import { authHttpClient, buildListingsUrl, CATEGORY_ENDPOINTS } from "@/lib";

export interface UseServiceDataReturn {
  data: ServiceData[] | undefined;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// SWR fetcher function
const fetcher = async (url: string): Promise<ServiceData[]> => {
  try {
    const response = await authHttpClient.get<CategoryDataType>(url);

    const CategoryData: CategoryDataType = response;
    // Validate response data structure
    if (!Array.isArray(CategoryData.data)) {
      throw new Error("Invalid data format: expected array of services");
    }

    // Process the data with more flexible validation
    const processedData = CategoryData.data
      .map(({ category, subCategories }, index) => {
        // Ensure category exists
        if (!category || typeof category !== "string") {
          console.warn(
            `Service at index ${index} has invalid category, skipping`
          );
          return null;
        }

        // Ensure sub array exists and is an array
        if (!Array.isArray(subCategories)) {
          console.warn(
            `Service ${category} has invalid sub array, using empty array`
          );
          subCategories = [];
        }

        // Process subcategories with flexible validation
        const processedSubcategories = subCategories
          .map((subcategory, subIndex) => {
            // Ensure subcategory name exists
            if (
              !subcategory.category ||
              typeof subcategory.category !== "string"
            ) {
              console.warn(
                `Subcategory at index ${subIndex} in service ${subcategory.category} has invalid name, skipping`
              );
              return null;
            }

            // Ensure childCategory array exists
            if (!Array.isArray(subcategory.childCategories)) {
              console.warn(
                `Subcategory ${subcategory.category} has invalid childCategory array, using empty array`
              );
              subcategory.childCategories = [];
            }

            // Process child categories
            const processedChildCategories = subcategory.childCategories
              .filter((child) => child && typeof child === "string")
              .map((child) => ({
                childcategory: child,
              }));

            return {
              subcategory: subcategory.category,
              childtotal: processedChildCategories.length,
              childcategory: processedChildCategories,
            };
          })
          .filter(Boolean) as Subcategory[];

        return {
          category: category,
          subtotal: processedSubcategories.length,
          sub: processedSubcategories,
        };
      })
      .filter(Boolean) as ServiceData[];

    return processedData;
  } catch (err: any) {
    console.error("Error fetching service data:", err);

    // Handle ApiError from the client
    if (err?.status === 401) {
      throw new Error("Authentication failed. Please log in again.");
    } else if (err?.status === 403) {
      throw new Error(
        "Access denied. You do not have permission to access service data."
      );
    } else if (err?.status === 404) {
      throw new Error("Service not found. Please contact support.");
    } else if (err?.status === 429) {
      throw new Error("Too many requests. Please wait a moment and try again.");
    } else if (err?.status >= 500) {
      throw new Error("Server error. Please try again later.");
    } else if (err?.message) {
      throw new Error(`Failed to fetch service data: ${err.message}`);
    } else {
      throw new Error(
        "An unexpected error occurred while fetching service data."
      );
    }
  }
};

export const useServiceData = (category: string): UseServiceDataReturn => {
  const baseUrl = buildListingsUrl(CATEGORY_ENDPOINTS.all);
  const apiUrl = `${baseUrl}?page=1&pageSize=10&group=${encodeURIComponent(
    category
  )}`;

  const { data, error, isLoading, mutate } = useSWR<ServiceData[]>(
    apiUrl,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 0, // No automatic refresh
      dedupingInterval: 2000, // Dedupe requests within 2 seconds
      errorRetryInterval: 5000, // Retry failed requests after 5 seconds
      errorRetryCount: 3, // Maximum 3 retries
    }
  );

  return {
    data,
    loading: isLoading,
    error: error?.message || null,
    refetch: () => mutate(),
  };
};

// Helper function to get all subcategories across all services
export const getAllServiceSubcategories = (
  data: ServiceData[] | undefined
): (Subcategory & { parentCategory: string })[] => {
  if (!data) return [];

  return data.flatMap((service) =>
    service.sub.map((subcategory) => ({
      ...subcategory,
      // Add parent category info to subcategory for easier searching
      parentCategory: service.category,
    }))
  );
};

// Helper function to search subcategories by name
export const searchServiceSubcategories = (
  data: ServiceData[] | undefined,
  searchTerm: string
): (Subcategory & { parentCategory: string })[] => {
  if (!data || !searchTerm.trim()) return [];

  const term = searchTerm.toLowerCase();
  const allSubcategories = getAllServiceSubcategories(data);

  return allSubcategories.filter(
    (subcategory) =>
      subcategory.subcategory.toLowerCase().includes(term) ||
      subcategory.parentCategory.toLowerCase().includes(term)
  );
};

// Helper function to get subcategories by service category
export const getSubcategoriesByServiceCategory = (
  data: ServiceData[] | undefined,
  categoryName: string
): Subcategory[] => {
  if (!data) return [];

  const service = data.find(
    (s) => s.category.toLowerCase() === categoryName.toLowerCase()
  );
  return service?.sub || [];
};

// Helper function to find a specific subcategory by name
export const findServiceSubcategoryByName = (
  data: ServiceData[] | undefined,
  subcategoryName: string
): (Subcategory & { parentCategory: string }) | undefined => {
  if (!data) return undefined;

  const allSubcategories = getAllServiceSubcategories(data);
  return allSubcategories.find(
    (subcategory) => subcategory.subcategory === subcategoryName
  );
};

// Helper function to get service by subcategory name
export const getServiceBySubcategoryName = (
  data: ServiceData[] | undefined,
  subcategoryName: string
): ServiceData | undefined => {
  if (!data) return undefined;

  return data.find((service) =>
    service.sub.some(
      (subcategory) => subcategory.subcategory === subcategoryName
    )
  );
};

// Helper function to get all subcategories across all services
export const getAllSubcategories = (
  data: ServiceData[] | undefined
): {
  subcategory: string;
  parentCategory: string;
}[] => {
  if (!data) return [];

  return data.flatMap((service) =>
    service.sub.map((subcategory) => ({
      subcategory: subcategory.subcategory,
      parentCategory: service.category,
    }))
  );
};

// Helper function to search subcategories by name
export const searchSubcategories = (
  data: ServiceData[] | undefined,
  searchTerm: string
): {
  subcategory: string;
  parentCategory: string;
}[] => {
  if (!data || !searchTerm.trim()) return [];

  const term = searchTerm.toLowerCase();
  const allSubcategories = getAllSubcategories(data);

  return allSubcategories.filter(
    (sub) =>
      sub.subcategory.toLowerCase().includes(term) ||
      sub.parentCategory.toLowerCase().includes(term)
  );
};
