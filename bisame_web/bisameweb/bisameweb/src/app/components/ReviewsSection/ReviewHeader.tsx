import React from "react";
import { Star } from "lucide-react";

interface ReviewHeaderProps {
  name: string;
  date: string;
  rating: number;
}

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      className={`w-3 h-3 md:w-4 md:h-4 ${
        index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
      }`}
    />
  ));
};

const ReviewHeader: React.FC<ReviewHeaderProps> = ({ name, date, rating }) => (
  <div className="flex items-center justify-between mb-2">
    <div className="flex items-center space-x-2">
      <h3 className="text-xs md:text-sm font-semibold text-gray-900">{name}</h3>
      <span className="text-gray-400 text-sm">·</span>
      <time className="text-xs md:text-sm text-gray-500">{date}</time>
    </div>
    <div className="flex items-center space-x-0.5 md:space-x-1">{renderStars(rating)}</div>
  </div>
);

export default ReviewHeader;
