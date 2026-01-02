"use client";

interface ReviewCommentProps {
  comment: string;
  setComment: (comment: string) => void;
  isSubmitting: boolean;
}

const ReviewComment = ({ comment, setComment, isSubmitting }: ReviewCommentProps) => {
  // const minCharsId = 'review-min-chars'; // unused variable
  // const charCountId = 'review-char-count'; // unused variable
  // const textareaId = 'review-comment-textarea'; // unused variable

  return (
    <div>
      <label htmlFor="review-comment" className="block text-sm font-semibold text-gray-700 mb-3">
        Your Review
      </label>
      <textarea
        id="review-comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience with this product..."
        rows={4}
        disabled={isSubmitting}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none disabled:opacity-50"
        maxLength={500}
        aria-label="Review comment"
        aria-required="true"
        aria-describedby="review-min-chars review-char-count"
      />
      <div className="flex justify-between items-center mt-2">
        <p id="review-min-chars" className="text-xs text-gray-500">
          Minimum 10 characters required
        </p>
        <p id="review-char-count" className="text-xs text-gray-500">
          {comment.length}/500
        </p>
      </div>
    </div>
  );
};

export default ReviewComment; 