import { useUnfollow } from './useUnfollow';
import { useFollow } from './useFollow';

interface UseFollowUnfollowReturn {
  handleFollowToggle: (profileId: string, currentlyFollowing: boolean, followersMutate?: () => Promise<unknown>, followingMutate?: () => Promise<unknown>) => Promise<void>;
  followLoading: boolean;
  unfollowLoading: boolean;
}

export function useFollowUnfollow(): UseFollowUnfollowReturn {
  const { unfollow, loading: unfollowLoading } = useUnfollow();
  const { follow, loading: followLoading } = useFollow();

  const handleFollowToggle = async (
    profileId: string, 
    currentlyFollowing: boolean, 
    followersMutate?: () => Promise<unknown>, 
    followingMutate?: () => Promise<unknown>
  ) => {
    if (currentlyFollowing) {
      // Unfollow the user
      try {
        const response = await unfollow(profileId);
        if (response.success) {
          // Refresh both followers and following data
          if (followersMutate) await followersMutate();
          if (followingMutate) await followingMutate();
        } else {
          console.error('Failed to unfollow:', response.message);
        }
      } catch (error) {
        console.error('Error unfollowing user:', error);
      }
    } else {
      // Follow the user
      try {
        const response = await follow(profileId);
        if (response.success) {
          // Refresh both followers and following data
          if (followersMutate) await followersMutate();
          if (followingMutate) await followingMutate();
        } else {
          console.error('Failed to follow:', response.message);
        }
      } catch (error) {
        console.error('Error following user:', error);
      }
    }
  };

  return {
    handleFollowToggle,
    followLoading,
    unfollowLoading
  };
}