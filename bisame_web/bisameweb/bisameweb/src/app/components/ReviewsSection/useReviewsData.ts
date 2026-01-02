// useReviewsData.ts
import useSWR from "swr";
import type { ReviewsResponse, Reply } from "./types";

// Raw reply shape coming from the API
interface RawReply {
  message: string;
  isSeller: boolean;
  id: string;
  date: string;
  reviewerName: string;
  reviewerId: string;
}

// Optional alias if other files import `Replies` from here
export type Replies = Reply;

// Raw review shape coming from the API
interface RawReview {
  _id: string;
  id: string;
  createdAt: string;
  updatedAt: string | null;
  listingId: string;
  rating: number;
  comment: string;
  replies: RawReply[];
  reviewerName: string;
  reviewerPhoneNumber: string;
  reviewerId: string;
  listingTitle: string;
  listingCategory: string;
  listingSubCategory: string;
  listingUserId: string;
  attachments: unknown[];
}

// API response shape
interface ApiResponse {
  code: number;
  data: {
    page: number;
    pageSize: number;
    results: RawReview[];
    totalCount: number;
    totalPages: number;
  };
  message: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
}

function ceilToOneDecimal(num: number): number {
  return Math.ceil(num) * 1.0;
}

function capitalizeWords(str: string): string {
  return str.replace(
    /\b\w+/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
}

import { authHttpClient, buildListingsUrl, PROFILE_ENDPOINTS } from "@/lib";

const fetcher = async (url: string): Promise<ApiResponse> => {
  const response = await authHttpClient.get<ApiResponse>(url);
  return response;
};

export function useReviewsData() {
  const apiUrl = buildListingsUrl(PROFILE_ENDPOINTS.customerReviews);
  
  const { data, error, isLoading } = useSWR<ApiResponse>(
    apiUrl,
    fetcher,
    {
      dedupingInterval: 2 * 60 * 60 * 1000, // 2 hours
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  let mapped: ReviewsResponse | null = null;

  if (data) {
    let totalRating = 0;
    const reviewCount = data.data?.results?.length || 0;

    const reviews = Array.isArray(data.data?.results)
      ? data.data.results.map((item: RawReview) => {
          totalRating += item.rating;

          // Map raw API replies → unified Reply type from ./types
          const transformedReplies: Reply[] = (item.replies || []).map(
            (r: RawReply): Reply => ({
              id: r.id,
              reviewerId: r.reviewerId,
              reviewerName: r.reviewerName,
              message: r.message,
              isSeller: r.isSeller,
              date: r.date,

              // legacy / optional fields on Reply
              userid: r.reviewerId,
              reply: r.message,
              postdate: r.date,
              name: r.reviewerName,
              profile: "",
            })
          );

          return {
            reviewid: item.id || item._id,
            name: capitalizeWords(item.reviewerName || ""),
            profile: "",
            productname: item.listingTitle || "",
            image: "",
            description: "",
            price: "",
            comment: item.comment || "",
            rating: item.rating || 0,
            postdate: formatDate(item.createdAt || ""),
            reply: transformedReplies,
          };
        })
      : [];

    const averageRating = reviewCount > 0 ? totalRating / reviewCount : 0;

    mapped = {
      reviews,
      total: data.data?.totalCount || 0,
      average_rating: ceilToOneDecimal(averageRating),
    };
  }

  return {
    data: mapped,
    loading: isLoading,
    error: error ? error.message : null,
  };
}
