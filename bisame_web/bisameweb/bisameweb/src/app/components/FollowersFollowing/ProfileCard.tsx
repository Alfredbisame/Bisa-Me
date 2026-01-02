"use client";
import React from 'react';
import Image from 'next/image';
import FollowButton from './FollowButton';
import UnfollowButton from './UnfollowButton';
import { getImageUrl } from '../ProductDetails/utils/imageUtils';

interface ProfileCardProps {
  id: string;
  name: string;
  title: string;
  avatar: string;
  isFollowing: boolean;
  onFollowToggle: (id: string, isFollowing: boolean) => void;
  followingId: string; 
  mutate?: () => void; // Add mutate prop
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  id,
  name,
  title,
  avatar,
  isFollowing,
  onFollowToggle,
  followingId,
  mutate,
}) => {
  // Use imageUtils to get properly formatted image URL
  const formattedAvatar = getImageUrl(avatar, 64, 64);

  return (
    <div className="border border-gray-200 rounded-md p-4 flex items-center space-x-4 transition-all duration-300 hover:shadow-md hover:border-gray-300 bg-white">
      <div className="relative">
        <Image
          alt={`Portrait of ${name}`}
          className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-100"
          height={64}
          src={formattedAvatar}
          width={64}
          priority={false}
          loading="lazy"
          onError={(e) => {
            // Fallback to default image if the profile image fails to load
            const target = e.target as HTMLImageElement;
            target.src = '/follow.png';
          }}
        />
        {/* Online indicator (optional) */}
        <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-black text-sm leading-tight truncate">
          {name}
        </p>
        <p className="text-gray-600 text-xs leading-tight mb-3 truncate">
          {title}
        </p>
        {isFollowing ? (
          <UnfollowButton
            onToggle={async () => await onFollowToggle(id, isFollowing)}
            userid={followingId}
            mutate={mutate}
          />
        ) : (
          <FollowButton
            onToggle={async () => await onFollowToggle(id, isFollowing)}
            userid={followingId}
            mutate={mutate}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
