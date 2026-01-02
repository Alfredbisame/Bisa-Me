"use client";

import { useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSubmitting: boolean;
  children: React.ReactNode;
}

const ReviewModal = ({ isOpen, onClose, isSubmitting, children }: ReviewModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements?.[0];
    const lastElement = focusableElements?.[focusableElements.length - 1];
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (focusableElements && focusableElements.length > 0) {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement?.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement?.focus();
            }
          }
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-modal-title"
      ref={modalRef}
    >
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-auto relative">
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50"
          aria-label="Close review modal"
        >
          <FaTimes className="text-gray-500" />
        </button>
        <div id="review-modal-title" className="sr-only">Write a Review</div>
        {children}
      </div>
    </div>
  );
};

export default ReviewModal; 