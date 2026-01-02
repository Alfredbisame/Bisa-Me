"use client";

import { useState, useCallback } from 'react';
import useSWRMutation from 'swr/mutation';
import toast from 'react-hot-toast';
import { useProductReviews } from '@/app/components/ProductDetails/hooks/useProductReviews';

interface UseReviewFormProps {
  onReviewSubmit?: (rating: number, comment: string) => Promise<void> | void;
  onClose: () => void;
}

async function postReviewFn(url: string, { arg }: { arg: { listingId: string; rating: number; comment: string; attachments: string[] } }) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(arg),
  });
  const data = await res.json();
  if (!res.ok || data.code !== 200) {
    throw new Error(data.message || 'Failed to submit review');
  }
  return data;
}

export const useReviewForm = ({ onReviewSubmit, onClose }: UseReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');

  const isFormValid = rating > 0 && comment.trim().length >= 10;

  const { trigger, isMutating } = useSWRMutation('/api/ProductReview/PostReview', postReviewFn);
  const { refetchReviews } = useProductReviews();

  const resetForm = () => {
    setRating(0);
    setComment('');
    setHoveredRating(0);
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error('Please provide a rating and a comment of at least 10 characters.');
      return;
    }

    const listingId = localStorage.getItem('selectedProductId');
    if (!listingId) {
      toast.error('Product ID not found.');
      return;
    }
    
    const body = {
      listingId,
      rating,
      comment,
      attachments: [] // Empty array as per the sample payload
    };
    
    try {
      await trigger(body);
      if (onReviewSubmit) {
        await onReviewSubmit(rating, comment);
      }
      toast.success('Review submitted successfully!');
      if (refetchReviews) await refetchReviews();
      resetForm();
      onClose();
    } catch (error: unknown) {
      toast.error((error as Error)?.message || 'Failed to submit review. Please try again.');
    }
  }, [rating, comment, isFormValid, onReviewSubmit, onClose, trigger, refetchReviews]);

  const handleStarClick = (starRating: number) => setRating(starRating);
  const handleStarHover = (starRating: number) => setHoveredRating(starRating);
  const handleStarLeave = () => setHoveredRating(0);

  return {
    rating,
    hoveredRating,
    comment,
    isSubmitting: isMutating,
    isFormValid,
    setComment,
    handleSubmit,
    handleStarClick,
    handleStarHover,
    handleStarLeave,
    resetForm,
  };
};