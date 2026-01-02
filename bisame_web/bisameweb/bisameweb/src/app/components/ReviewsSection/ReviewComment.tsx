// ReviewComment.tsx
import React from "react";
import Avatar from "./Avatar";
import { Replies } from "./useReviewsData";

interface ReviewCommentProps {
  comment: string;
  reply?: Replies[];
}

const ReviewComment: React.FC<ReviewCommentProps> = ({ comment, reply }) => (
  <div className="flex flex-col gap-2">
    <div className="self-start max-w-[70%]">
      <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-1 bg-blue-50 rounded-lg px-2 md:px-4 py-1 inline-block shadow-sm border border-blue-200">
        {comment}
      </p>
    </div>

    {reply &&
      reply.length > 0 &&
      reply.map((r: Replies, idx) => (
        <div
          key={idx}
          className="flex items-end justify-end self-end max-w-[70%] gap-2"
        >
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-500 mb-1">
              {r.reviewerName}{" "}
              <span className="ml-2 text-[10px] text-gray-400">
                {r.date.split("T")[0]}
              </span>
            </span>
            <span className="text-sm bg-orange-100 text-gray-800 rounded-lg px-4 py-1 inline-block text-right shadow-sm border border-orange-200">
              {r.message}
            </span>
          </div>
          <Avatar name={r.reviewerName} avatar={""} />
        </div>
      ))}
  </div>
);

export default ReviewComment;
