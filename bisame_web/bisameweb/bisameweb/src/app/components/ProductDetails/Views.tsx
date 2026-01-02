import React from "react";
import { FaEye } from "react-icons/fa";

interface ViewsProps {
  views: number;
  className?: string;
}

const formatViews = (count: number): string => {
  if (count < 1000) return count.toString();
  if (count < 1_000_000) return `${(count / 1000).toFixed(1)}K`;
  return `${(count / 1_000_000).toFixed(1)}M`;
};

const Views: React.FC<ViewsProps> = ({ views, className = "" }) => {
  return (
    <div
      className={`flex items-center gap-3 md:gap-4 transition-all ${className}`}
    >
      <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-xl shadow-sm">
        <FaEye className="text-orange-500 w-4 h-4 md:w-5 md:h-5" />
      </div>

      <div className="flex flex-col leading-tight">
        <span className="text-lg md:text-xl font-semibold text-gray-900">
          {formatViews(views)}
        </span>
        <span className="text-xs md:text-sm text-gray-500 tracking-tight">
          {views === 1 ? "View" : "Views"}
        </span>
      </div>
    </div>
  );
};

export default Views;
