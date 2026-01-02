import useSWR from "swr";
import { httpClient, buildListingsUrl, CATEGORY_ENDPOINTS } from "@/lib";

interface SubCategory {
  id: string;
  category: string;
  imageUrl: string;
  webImageUrl: string;
  childCategories: string[];
}

interface Category {
  id: string;
  category: string;
  isPromotion: boolean;
  group: string;
  subCategories: SubCategory[];
}

interface ProcessedCategory {
  name: string;
  id: string;
  hasSubmenu: boolean;
}

interface CategoryResponse {
  code: number;
  data: Category[];
  message?: string;
}

const fetcher = async (url: string): Promise<Category[]> => {
  const response = await httpClient.get<CategoryResponse>(url);
  
  if (response.code === 200 && Array.isArray(response.data)) {
    return response.data;
  }
  
  return [];
};

export const useBuySellData = (group?: string) => {
  const baseUrl = buildListingsUrl(CATEGORY_ENDPOINTS.all);
  const apiUrl = group 
    ? `${baseUrl}?page=1&pageSize=10&group=${encodeURIComponent(group)}`
    : null;
  
  const {
    data: categoriesData,
    error,
    isLoading,
  } = useSWR(
    apiUrl,
    fetcher
  );

  // Process categories for dropdown display
  const processedCategories: ProcessedCategory[] = categoriesData
    ? categoriesData.map((category: Category) => ({
        name: category.category,
        id: category.id,
        hasSubmenu: category.subCategories && category.subCategories.length > 0,
      }))
    : [];

  return {
    categoriesData,
    processedCategories,
    error,
    isLoading,
  };
};

export type { Category, SubCategory, ProcessedCategory };
