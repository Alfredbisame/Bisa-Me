import React, { useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useReplyReview } from './useReplyReview';
import toast from 'react-hot-toast';

interface ReviewReplyModalProps {
  open: boolean;
  onClose: () => void;
  reviewerName?: string;
  reviewid: string;
  onReplySuccess?: () => void;
}

const ReviewReplyModal: React.FC<ReviewReplyModalProps> = ({ open, onClose, reviewerName, reviewid, onReplySuccess }) => {
  const [reply, setReply] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { replyToReview, loading, error, success } = useReplyReview();
  const [prevSuccess, setPrevSuccess] = useState(false);
  const [prevError, setPrevError] = useState<string | null>(null);

  useEffect(() => {
    if (open && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) setReply('');
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // Only show toast when success or error changes from previous value
  useEffect(() => {
    if (success && !prevSuccess) {
      toast.success('Reply sent successfully!');
      setReply('');
      onClose();
      if (onReplySuccess) onReplySuccess();
    }
    setPrevSuccess(success);
  }, [success, prevSuccess, onClose, onReplySuccess]);

  useEffect(() => {
    if (error && error !== prevError) {
      toast.error(error);
    }
    setPrevError(error);
  }, [error, prevError]);

  if (!open) return null;

  const handleSendReply = async () => {
    if (!reply.trim()) return;
    await replyToReview(reviewid, reply);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 p-6 relative animate-scaleIn">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-orange-500 text-xl focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          <FaTimes />
        </button>
        <h2 className="text-lg font-bold text-gray-900 mb-2 text-center">Reply to {reviewerName || 'Review'}</h2>
        <textarea
          ref={textareaRef}
          className="w-full border border-gray-200 rounded-md p-2 mb-4 min-h-[80px] focus:ring-2 focus:ring-orange-400 focus:outline-none resize-none"
          placeholder="Write your reply..."
          value={reply}
          onChange={e => setReply(e.target.value)}
          disabled={loading}
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            onClick={onClose}
            type="button"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600 transition-colors font-semibold flex items-center justify-center min-w-[100px]"
            onClick={handleSendReply}
            disabled={!reply.trim() || loading}
            type="button"
          >
            {loading ? (
              <span>Sending...</span>
            ) : (
              'Send Reply'
            )}
          </button>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease;
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scaleIn {
          animation: scaleIn 0.25s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  );
};

export default ReviewReplyModal; 