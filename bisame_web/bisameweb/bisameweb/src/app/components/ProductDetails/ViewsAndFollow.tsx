"use client";

import React from "react";
import Views from "./Views";
import Follow from "./Follow";
import SaveIcon from "./SaveIcon";
import RecordRecentView from "../BrowsingHistory/RecordRecentView";
import { useUser } from "@/app/hooks/useUser";

interface ViewsAndFollowProps {
  views: number;
  userId: string;
  isFollowed?: boolean;
  isFavorite?: boolean;
  className?: string;
  listingId: string | null;
  onFollowToggle?: () => void;
  onFavoriteToggle?: () => void;
  isFollowing?: boolean; // New prop
  isSaving?: boolean;    // New prop
}

const ViewsAndFollow: React.FC<ViewsAndFollowProps> = ({
  views,
  userId,
  isFollowed = false,
  isFavorite = false,
  className = "",
  listingId,
  onFollowToggle,
  onFavoriteToggle,
  isFollowing = false,
  isSaving = false,
}) => {
  const { userId: currentUserId } = useUser();

  return (
    <div className={`flex items-center gap-8 py-2 mb-3 ${className}`}>
      {/* Record view */}
      {listingId && currentUserId && (
        <RecordRecentView userId={currentUserId} listingId={listingId} />
      )}

      {/* Views counter */}
      <Views views={views} />

      {/* Save icon */}
      <div className="flex items-center">
        <SaveIcon
          isFavorite={isFavorite}
          onFavoriteToggle={onFavoriteToggle}
          isLoading={isSaving}
        />
      </div>

      {/* Follow */}
      <div>
        <Follow
          userId={userId}
          isFollowed={isFollowed}
          onFollowToggle={onFollowToggle}
          isLoading={isFollowing}
        />
      </div>
    </div>
  );
};

export default ViewsAndFollow;
