import { useCallback } from 'react';
import { Review } from '../types';

export function useProductReviews() {
  // Return empty values since this hook is deprecated
  const reviews: Review[] = [];
  const isLoading = false;
  const error = null;
  
  const refetchReviews = useCallback(async () => {
    // No-op since this hook is deprecated
  }, []);

  const handleReviewSubmit = useCallback(async () => {
    // This is now handled in useReviewForm, but keep for compatibility
  }, []);

  return {
    reviews,
    isLoading,
    error,
    handleReviewSubmit,
    refetchReviews,
  };
}