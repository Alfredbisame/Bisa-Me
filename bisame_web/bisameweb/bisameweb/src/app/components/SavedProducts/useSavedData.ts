import useSWR from "swr";
import { authHttpClient, buildListingsUrl, LISTINGS_ENDPOINTS } from "@/lib";

export interface SavedProduct {
  id: string;
  favoriteId?: string;
  pageid?: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  location: string;
  description: string;
  badge?: {
    text: string;
    color: string;
  };
  category?: string;
  subCategory?: string;
  userInfo?: {
    name: string;
    profilePicture: string;
  };
  images?: Array<{
    imageUrl: string;
    id: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

export interface SavedResponse {
  products: SavedProduct[];
  totalCount: number;
}

interface RawSavedItem {
  _id?: string;
  id?: string;
  favoriteId?: string;
  pageid?: string;
  title?: string;
  name?: string;
  image?: Array<{ image_link?: string; imageUrl?: string }> | string;
  price?: number | string;
  rating?: number;
  reviews?: number;
  location?: string;
  description?: string;
  badge?: {
    text?: string;
    color?: string;
  };
  category?: string;
  subCategory?: string;
  userInfo?: {
    name: string;
    profilePicture: string;
  };
  images?: Array<{
    imageUrl: string;
    id: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

interface SavedApiResponse {
  data?: RawSavedItem[];
  products?: RawSavedItem[];
  totalCount?: number;
  [key: string]: unknown;
}

function mapToSavedProductArray(
  items: RawSavedItem[] | null | undefined
): SavedProduct[] {
  // Strong type guard - ensure items is actually an array
  if (!Array.isArray(items)) {
    console.warn(
      "mapToSavedProductArray received non-array:",
      typeof items,
      items
    );
    return [];
  }

  return items
    .filter((item): item is RawSavedItem => !!item && typeof item === "object")
    .map((item) => {
      let imageUrl = "";

      if (item.images && item.images.length > 0) {
        imageUrl = item.images[0].imageUrl || "";
      } else if (Array.isArray(item.image) && item.image.length > 0) {
        imageUrl = item.image[0].image_link || item.image[0].imageUrl || "";
      } else if (typeof item.image === "string") {
        imageUrl = item.image;
      }

      // FIX: Use favoriteId or _id as the primary ID, NOT pageid
      const primaryId = item.favoriteId || item._id || item.id || "";

      return {
        id: primaryId, // This is the listing ID that should match what you pass to useSave
        favoriteId: item.favoriteId || item._id || item.id, // Keep favoriteId for deletion
        pageid: item.pageid,
        name: item.title || item.name || "",
        image: imageUrl,
        price:
          typeof item.price === "number"
            ? item.price
            : typeof item.price === "string"
              ? parseFloat(item.price) || 0
              : 0,
        rating: item.rating || 0,
        reviews: item.reviews || 0,
        location: item.location || "",
        description: item.description || "",
        category: item.category || "",
        subCategory: item.subCategory || "",
        userInfo: item.userInfo,
        images: item.images,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        badge: item.badge
          ? {
            text: item.badge.text || "",
            color: item.badge.color || "#FFD700",
          }
          : undefined,
      };
    });
}

const fetcher = async (url: string): Promise<SavedApiResponse> => {
  const response = await authHttpClient.get<SavedApiResponse>(url);
  return response;
};

export function useSavedData() {
  const apiUrl = buildListingsUrl(LISTINGS_ENDPOINTS.favorites);

  const {
    data,
    error,
    isLoading,
    mutate: mutateSaved,
  } = useSWR<SavedApiResponse>(apiUrl, fetcher, {
    dedupingInterval: 2 * 60 * 60 * 1000,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  let mapped: SavedResponse | null = null;

  if (data) {
    // Extract the products array from various possible response structures
    let productsData: RawSavedItem[] = [];

    if (Array.isArray(data)) {
      // Response is directly an array
      productsData = data;
    } else if (Array.isArray(data.data)) {
      // Response has data.data array
      productsData = data.data;
    } else if (Array.isArray(data.products)) {
      // Response has data.products array
      productsData = data.products;
    } else {
      console.warn("Could not find products array in response:", data);
      productsData = [];
    }

    mapped = {
      products: mapToSavedProductArray(productsData),
      totalCount: data.totalCount ?? productsData.length,
    };
  }

  return {
    data: mapped,
    loading: isLoading,
    mutate: mutateSaved,
    error: error
      ? typeof error.message === "string"
        ? error.message
        : String(error.message)
      : null,
  };
}
