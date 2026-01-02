import React from 'react';
import Image from 'next/image';
import { Review, Reply } from '../types';

interface ReviewItemProps {
  review: Review;
  formatDate: (dateString: string) => string;
}

// Function to add width and height to image URL in the format /500/500
const getImageUrl = (imageLink: string, width = 100, height = 100) => {
  if (!imageLink) return '/placeholder.jpg';
  let url = imageLink.replaceAll('image.', 'images.');
  if (!url.match(/\/\d+\/\d+$/)) {
    url = url.replace(/\/$/, '');
    url = `${url}/${width}/${height}`;
  }
  return url;
};

// ReplyItem component to display individual replies
const ReplyItem: React.FC<{ reply: Reply; formatDate: (dateString: string) => string }> = ({ reply, formatDate }) => {
  return (
    <div className="mt-4 ml-4 pl-4 border-l-2 border-gray-200">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
        </div>
        <div className="ml-3">
          <div className="flex items-center">
            <h4 className="font-medium text-sm">{reply.reviewerName}</h4>
            {reply.isSeller && (
              <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                Seller
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm mt-1">{reply.message}</p>
          <p className="text-gray-400 text-xs mt-1">{formatDate(reply.date)}</p>
        </div>
      </div>
    </div>
  );
};

const ReviewItem: React.FC<ReviewItemProps> = ({ review, formatDate }) => {
  return (
    <div className="border-b pb-6">
      <div className="flex items-center mb-3">
        <Image
          src={review.reviewerProfilePicture ? getImageUrl(review.reviewerProfilePicture, 100, 100) : "/Avatar.png"}
          alt={review.reviewerName}
          width={40}
          height={40}
          className="rounded-full"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/Avatar.png';
          }}
        />
        <div className="ml-4">
          <h3 className="font-semibold">{review.reviewerName}</h3>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                ★
              </span>
            ))}
            <span className="text-gray-500 text-sm ml-2">{formatDate(review.createdAt)}</span>
          </div>
        </div>
      </div>
      <p className="text-gray-700">{review.comment}</p>
      
      {/* Display replies */}
      {review.replies && review.replies.length > 0 && (
        <div className="mt-4">
          {review.replies.map((reply, index) => (
            <ReplyItem key={index} reply={reply} formatDate={formatDate} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewItem;