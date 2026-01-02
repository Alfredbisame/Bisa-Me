"use client";

import React from "react";
import ShareButtons from "./ShareButtons";
import { useAffiliateData } from "./useAffiliateData";
import { useProfileData } from "../Dashboard/useProfileData";

const InviteFriendTab = () => {
  // const { data, error, loading } = useAffiliateData();
  const { data: profileData, loading, error } = useProfileData();

  // Use the invite code from API response or fallback
  const invitationCode = profileData?.userReferralCode || "165636";
  const shareText = `Join me on Bisame! Use my invitation code: ${invitationCode}`;
  const shareUrl = `https://bisame.com/UserAccounts/SignUp?referralCode=${invitationCode}`;

  if (loading) {
    return (
      <div className="p-4">
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          <span className="ml-2 text-gray-600">Loading invitation data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-red-400 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-red-800 text-sm">
              Failed to load invitation data. Using default code.
            </p>
          </div>
        </div>
        {/* Still render the component with fallback data */}
        <InviteContent
          invitationCode={invitationCode}
          shareText={shareText}
          shareUrl={shareUrl}
        />
      </div>
    );
  }

  return (
    <div className="p-4">
      <InviteContent
        invitationCode={invitationCode}
        shareText={shareText}
        shareUrl={shareUrl}
      />
    </div>
  );
};

// Separate component for the main content
const InviteContent: React.FC<{
  invitationCode: string;
  shareText: string;
  shareUrl: string;
}> = ({ invitationCode, shareText, shareUrl }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <span className="text-gray-700 font-medium">Share invitation</span>

        {/* Invitation Code */}
        <span className="bg-gray-100 px-3 py-1 rounded-md font-mono md:text-lg font-semibold text-gray-800 select-all">
          {invitationCode}
        </span>

        {/* Reusable Share Buttons Component */}
        <ShareButtons
          invitationCode={invitationCode}
          shareText={shareText}
          shareUrl={shareUrl}
        />
      </div>

      {/* Additional Info */}
      <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
        <p className="text-sm text-blue-800">
          <svg
            className="w-4 h-4 inline mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          Share your invitation code with friends to earn rewards when they
          join!
        </p>
      </div>
    </>
  );
};

export default InviteFriendTab;
