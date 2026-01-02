import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface SaveIconProps {
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  isLoading?: boolean;
  className?: string; // Kept as optional
}

const SaveIcon: React.FC<SaveIconProps> = ({
  isFavorite = false,
  onFavoriteToggle,
  isLoading = false,
  className = ""
}) => {
  return (
    <button
      onClick={onFavoriteToggle}
      disabled={isLoading}
      title={isFavorite ? "Unsave item" : "Save item"}
      className={`
        flex items-center justify-center w-10 h-10 rounded-xl
        transition-all duration-300 transform 
        hover:scale-105 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-offset-2
        shadow-sm
        ${isFavorite
          ? "bg-orange-50 text-red-600 hover:bg-orange-100 focus:ring-orange-400"
          : "bg-blue-50 text-orange-600 hover:bg-orange-100 focus:ring-orange-300"
        }
        ${isLoading ? "opacity-60 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {isLoading ? (
        <div
          className={`animate-spin w-4 h-4 border-2 rounded-full ${isFavorite
              ? "border-red-600 border-t-transparent"
              : "border-orange-500 border-t-transparent"
            }`}
        />
      ) : isFavorite ? (
        <FaHeart className="w-5 h-5" color="#ea580c" />
      ) : (
        <FaRegHeart className="w-5 h-5" />
      )}
    </button>
  );
};

export default SaveIcon;
