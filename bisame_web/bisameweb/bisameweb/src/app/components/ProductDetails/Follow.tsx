import React from "react";
import { FaUserPlus, FaUserCheck } from "react-icons/fa";

interface FollowProps {
  userId: string;
  isFollowed?: boolean;
  onFollowToggle?: () => void;
  isLoading?: boolean;
  className?: string; // Kept as optional
}

const Follow: React.FC<FollowProps> = ({
  isFollowed = false,
  onFollowToggle,
  isLoading = false,
  className = "",
}) => {
  return (
    <button
      onClick={onFollowToggle}
      disabled={isLoading}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-xl font-semibold
        transition-all duration-300 transform 
        hover:scale-105 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-offset-2
        shadow-sm text-sm
        ${isFollowed
          ? "bg-orange-50 text-orange-700 border border-orange-500 focus:ring-orange-400 hover:bg-orange-100"
          : "bg-white text-blue-700 border border-blue-600 focus:ring-blue-400 hover:bg-blue-50"
        }
        ${isLoading ? "opacity-60 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {isLoading ? (
        <div
          className={`w-4 h-4 border-2 rounded-full animate-spin ${isFollowed
              ? "border-orange-600 border-t-transparent"
              : "border-blue-600 border-t-transparent"
            }`}
        />
      ) : isFollowed ? (
        <FaUserCheck className="w-4 h-4" />
      ) : (
        <FaUserPlus className="w-4 h-4" />
      )}

      <span>
        {isLoading
          ? "Loading..."
          : isFollowed
            ? "Following"
            : "Follow"}
      </span>
    </button>
  );
};

export default Follow;