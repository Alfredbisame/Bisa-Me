"use client";
import React, { useState } from "react";
import ProfileCard from "./ProfileCard";
import Pagination from "./Pagination";
import EmptyState from "./EmptyState";
import { useFollowersData } from "./useFollowersData";
import { useFollowingData } from "./useFollowingData";
import { useFollowUnfollow } from "./useFollowUnfollow";
import { FollowingUser, Profile } from "./types";
import ProductsHeader from "../SavedProducts/SavedProductsHeader";

type TabType = "followers" | "following";

// Transform following user to profile format
const transformUserToProfile = (user: FollowingUser): Profile => ({
  id: user.id,
  user_id: user.id,
  name: `${user.userInfo.firstName} ${user.userInfo.lastName}`,
  title: user.userInfo.countryName || "User",
  avatar: user.userInfo.profilePicture || "/follow.png",
  isFollowing: true,
});

const FollowersFollowing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("followers");
  const [page, setPage] = useState(1);
  const {
    data: followersData,
    loading: followersLoading,
    error: followersError,
    mutate: followersMutate,
  } = useFollowersData(page, 10);
  const {
    data: followingData,
    loading: followingLoading,
    error: followingError,
    mutate: followingMutate,
  } = useFollowingData(page, 10);
  const { handleFollowToggle, followLoading, unfollowLoading } =
    useFollowUnfollow();

  // Transform data based on active tab
  const followers =
    followersData?.data?.data?.results?.map(transformUserToProfile) || [];
  const following =
    followingData?.data?.data?.results?.map(transformUserToProfile) || [];
  const currentProfiles = activeTab === "followers" ? followers : following;

  // Get pagination info
  const followersTotalPages = followersData?.data?.data?.totalPages || 1;
  const followersCurrentPage = followersData?.data?.data?.page || 1;
  const followersTotalCount = followersData?.data?.data?.totalCount || 0;

  const followingTotalPages = followingData?.data?.data?.totalPages || 1;
  const followingCurrentPage = followingData?.data?.data?.page || 1;
  const followingTotalCount = followingData?.data?.data?.totalCount || 0;

  const loading =
    activeTab === "followers"
      ? followersLoading
      : followingLoading || followLoading || unfollowLoading;
  const error = activeTab === "followers" ? followersError : followingError;
  const mutate = activeTab === "followers" ? followersMutate : followingMutate;

  if (loading) {
    return (
      <div className="bg-white flex flex-col">
        <ProductsHeader
          header="Followers"
          description="Want view all followers or people you are following. Check it out here"
        />
        <div className="max-w-7xl w-full mt-20">
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading {activeTab}...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white flex items-center justify-center">
        <div className="max-w-7xl w-full border border-gray-200 rounded-md shadow-sm">
          <div className="p-8 text-center">
            <div className="text-red-500 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Error loading data
            </h3>
            <p className="text-gray-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white flex items-center justify-center">
      <div className="max-w-7xl w-full">
        <ProductsHeader
          header="Followers"
          description="Want view all followers or people you are following. Check it out here"
        />
        {/* Tab Navigation */}
        <div
          className="border border-gray-200 rounded-full flex text-sm font-normal text-gray-600 select-none relative"
          role="tablist"
        >
          <button
            role="tab"
            aria-selected={activeTab === "followers"}
            aria-controls="followersPanel"
            className={`flex-1 p-3 relative transition-all duration-300 ease-in-out ${
              activeTab === "followers"
                ? "bg-blue-500 rounded-full text-white "
                : "hover:text-gray-900 hover:bg-gray-50"
            }`}
            type="button"
            onClick={() => setActiveTab("followers")}
          >
            <span className="relative z-10">
              FOLLOWERS ({followersTotalCount})
            </span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === "following"}
            aria-controls="followingPanel"
            className={`flex-1 p-3 relative transition-all duration-300 ease-in-out ${
              activeTab === "following"
                ? "bg-blue-500 rounded-full text-white "
                : "hover:text-gray-900 hover:bg-gray-50"
            }`}
            type="button"
            onClick={() => setActiveTab("following")}
          >
            <span className="relative z-10">
              FOLLOWING ({followingTotalCount})
            </span>
          </button>
        </div>

        {/* Tab Content */}
        <div
          className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 transition-all duration-300 ease-in-out"
          role="tabpanel"
          tabIndex={0}
        >
          {currentProfiles.length > 0 ? (
            <>
              {currentProfiles.map((profile: Profile, index: number) => (
                <div
                  key={`${profile.id}-${activeTab}-${index}`}
                  className="animate-fadeIn"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <ProfileCard
                    id={profile.id}
                    name={profile.name}
                    title={profile.title}
                    avatar={profile.avatar}
                    isFollowing={profile.isFollowing}
                    onFollowToggle={(profileId, currentlyFollowing) =>
                      handleFollowToggle(
                        profileId,
                        currentlyFollowing,
                        followersMutate,
                        followingMutate
                      )
                    }
                    followingId={profile.user_id}
                    mutate={mutate}
                  />
                </div>
              ))}

              {/* Pagination */}
              <Pagination
                currentPage={
                  activeTab === "followers"
                    ? followersCurrentPage
                    : followingCurrentPage
                }
                totalPages={
                  activeTab === "followers"
                    ? followersTotalPages
                    : followingTotalPages
                }
                onPageChange={setPage}
                followersTotalCount={followersTotalCount}
                followingTotalCount={followingTotalCount}
                activeTab={activeTab}
              />
            </>
          ) : (
            <EmptyState activeTab={activeTab} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowersFollowing;
