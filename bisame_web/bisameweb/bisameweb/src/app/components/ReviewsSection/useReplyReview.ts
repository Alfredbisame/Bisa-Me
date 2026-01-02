import type { Review } from "./types";
import { useState } from "react";
import { authHttpClient, buildListingsUrl, REVIEW_ENDPOINTS, replacePathParams } from "@/lib";

interface UseReplyReviewResult {
  replyToReview: (reviewid: Review["reviewid"], reply: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
  hasReplied: (reviewid: Review["reviewid"]) => boolean;
}

export function useReplyReview(): UseReplyReviewResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [repliedIds, setRepliedIds] = useState<Set<string>>(new Set());

  const replyToReview = async (reviewid: Review["reviewid"], reply: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const endpoint = replacePathParams(REVIEW_ENDPOINTS.reply, { id: reviewid });
      const apiUrl = buildListingsUrl(endpoint);
      
      const response = await authHttpClient.post<{ message?: string; success?: boolean }>(
        apiUrl,
        { message: reply }
      );
      
      if (response.success === false) {
        throw new Error(response.message || "Failed to send reply");
      }
      
      setSuccess(true);
      setRepliedIds((prev) => new Set(prev).add(reviewid));
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to send reply';
      setError(typeof errorMessage === 'string' ? errorMessage : 'Failed to send reply');
    } finally {
      setLoading(false);
    }
  };

  const hasReplied = (reviewid: Review["reviewid"]) => repliedIds.has(reviewid);

  return { replyToReview, loading, error, success, hasReplied };
}
