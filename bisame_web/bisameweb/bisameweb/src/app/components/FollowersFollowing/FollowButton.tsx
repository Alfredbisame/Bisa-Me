"use client";
import React, { useState } from 'react';
import { useFollows } from './useFollows';
import toast from 'react-hot-toast';

interface FollowButtonProps {
  onToggle?: () => Promise<void>; // Make optional for backward compatibility
  userid: string; // This should be the userid from FollowerUser
  disabled?: boolean;
  mutate?: () => void; // Add mutate prop
}

const FollowButton: React.FC<FollowButtonProps> = ({
  onToggle,
  userid, // This should be the userid from FollowerUser
  disabled = false,
  mutate,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { follow } = useFollows();

    const handleClick = async () => {
    if (disabled || isLoading) return;
    setIsLoading(true);
    try {
      // Follow action: userid should be from FollowerUser
      const res = await follow(userid);
      if (res && res.success) {
        toast.success('Followed successfully!');
        if (onToggle) await onToggle();
        if (mutate) await mutate(); // Refetch followers data
      } else {
        toast.error(res?.message || 'Failed to follow user');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'Follow failed');
      } else {
        toast.error('Follow failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`text-white text-xs font-bold px-3 py-1 rounded-sm tracking-wide transition-colors duration-200 bg-blue-500 hover:bg-blue-600 ${(disabled || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
      type="button"
      onClick={handleClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <div className="flex items-center space-x-1">
          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
          <span>FOLLOWING...</span>
        </div>
      ) : (
        'FOLLOW'
      )}
    </button>
  );
};

export default FollowButton;
