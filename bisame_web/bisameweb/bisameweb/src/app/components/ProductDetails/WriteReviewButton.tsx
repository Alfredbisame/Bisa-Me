"use client";

import { useCallback, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import ReviewModal from './WriteReview/components/ReviewModal';
import ReviewForm from './WriteReview/components/ReviewForm';

interface WriteReviewButtonProps {
  onReviewSubmit?: (rating: number, comment: string) => Promise<void> | void;
}

const WriteReviewButton = ({ onReviewSubmit }: WriteReviewButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handler to wrap onReviewSubmit and manage isSubmitting
  const handleReviewSubmit = useCallback(async (rating: number, comment: string) => {
    setIsSubmitting(true);
    try {
      if (onReviewSubmit) {
        await onReviewSubmit(rating, comment);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [onReviewSubmit]);

  return (
    <>
      <button 
        onClick={openModal}
        className="group relative bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
      >
        <MessageCircle size={20} />
        Write a Review
      </button>
      <ReviewModal
        isOpen={isModalOpen}
        onClose={closeModal}
        isSubmitting={isSubmitting}
      >
        <ReviewForm onReviewSubmit={handleReviewSubmit} onClose={closeModal} />
      </ReviewModal>
    </>
  );
};

export default WriteReviewButton;
