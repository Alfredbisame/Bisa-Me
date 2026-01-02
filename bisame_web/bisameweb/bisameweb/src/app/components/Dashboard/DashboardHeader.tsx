"use client";

import { useState } from "react";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";
import AccountInfo from "./AccountInfo";
import BusinessDetails from "./BusinessDetails";
import { useDashboardData } from "./useDashboardData";
import { useProfileData } from "./useProfileData";

const DashboardHeader = () => {
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const [showBusinessDetails, setShowBusinessDetails] = useState(false);
  const { data, loading } = useDashboardData();
  const { data: profileData, loading: profileLoading } = useProfileData();

  const userName = profileData
    ? `${profileData.firstName} ${profileData.lastName}`
    : data?.info?.name || "Bisame User";

  console.log(profileData);

  const userProfile = profileData?.profilePicture || "/profile.jpeg";

  const [imgSrc, setImgSrc] = useState(userProfile);

  const toggleAccountInfo = () => {
    setShowAccountInfo(!showAccountInfo);
    if (!showAccountInfo) setShowBusinessDetails(false);
  };

  const toggleBusinessDetails = () => {
    setShowBusinessDetails(!showBusinessDetails);
    if (!showBusinessDetails) setShowAccountInfo(false);
  };

  const closeAllDropdowns = () => {
    setShowAccountInfo(false);
    setShowBusinessDetails(false);
  };

  return (
    <div className="mb-5">
      {/* Header */}
      {/* bg-blue-900 shadow-md border-gray-200 p-2 rounded-lg */}
      <header>
        <div className="flex flex-row md:items-stretch items-center justify-between gap-2 sm:gap-0">
          {/* Left side - Business Details */}
          <div className="relative w-full sm:w-auto">
            <div>
              <h2 className="md:text-xl text-blue-900 font-semibold">
                Welcome Back, {userName.split(" ")[0]}!
              </h2>
              <p className="text-gray-500 text-xs md:text-sm">
                Access your dashboard details here
              </p>
            </div>
            {/* <button
              onClick={toggleBusinessDetails}
              className="flex items-center w-full sm:w-auto space-x-3 bg-blue-50 hover:bg-blue-100 
                         px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-all duration-200 
                        "            >
              <div className="bg-blue-900 p-2 sm:p-3 rounded-xl">
                <FaBuilding className="md:w-5 md:h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="text-left flex-1">
                <h1 className="text-base lg:text font-bold text-blue-800">
                  Business Details
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">
                  Manage your business information
                </p>
              </div>
              <FaChevronDown
                className={`w-4 h-4 text-blue-500 transition-transform duration-200 
                          ${showBusinessDetails ? "rotate-180" : ""}`}
              />
            </button> */}

            {/* Dropdown Business Details */}
            {showBusinessDetails && (
              <div className="absolute -left-6 md:left-0 top-full mt-2 z-50 w-full min-w-[90vw] max-w-7xl sm:min-w-[320px] sm:max-w-md animate-in slide-in-from-top-2 duration-200">
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 w-full">
                  {/* Close button overlay */}
                  <div className="relative">
                    <button
                      onClick={() => setShowBusinessDetails(false)}
                      className="absolute top-2 right-2 z-10 
                               text-gray-400 hover:text-gray-600 
                               bg-white rounded-full p-1 shadow-sm"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <BusinessDetails />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right side - Profile Section */}
          <div className="relative w-auto">
            <button
              onClick={toggleAccountInfo}
              className="flex md:gap-2"
            >
              {loading || profileLoading ? (
                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
              ) : (
                <Image
                  src={imgSrc}
                  alt={`Profile picture of ${userName}`}
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-orange-500"
                  onError={() => setImgSrc("/newUser.png")}
                />
              )}
              <div className="text-left flex-1 hidden sm:block">
                <p className="font-semibold text-gray-800 text-sm md:text-base">
                  {loading || profileLoading ? (
                    <span className="bg-gray-200 rounded w-24 h-4 inline-block animate-pulse" />
                  ) : (
                    userName
                  )}
                </p>
                <p className="text-xs text-gray-600">View Profile</p>
              </div>
              <FaChevronDown
                className={`w-4 h-4 text-orange-500 transition-transform ml-3 duration-200 self-center
                          ${showAccountInfo ? "rotate-180" : ""} hidden md:block`}
              />
            </button>

            {/* Dropdown Account Info */}
            {showAccountInfo && (
              <div className="absolute right-0 top-full mt-2 z-50 w-full min-w-[90vw] max-w-7xl sm:min-w-[320px] sm:max-w-md animate-in slide-in-from-top-2 duration-200">
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 w-full">
                  {/* Close button overlay */}
                  <div className="relative">
                    <button
                      onClick={() => setShowAccountInfo(false)}
                      className="absolute top-2 right-2 z-10 
                               text-gray-400 hover:text-gray-600 
                               bg-white rounded-full p-1 shadow-sm"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <AccountInfo />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Overlay to close dropdown when clicking outside */}
      {(showAccountInfo || showBusinessDetails) && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-10 filter backdrop-blur-sm"
          onClick={closeAllDropdowns}
        />
      )}
    </div>
  );
};

export default DashboardHeader;
