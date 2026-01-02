"use client";

import ProfileSection from "./ProfileSection";
import PasswordSection from "./PasswordSection";
import DeleteAccountButton from "./DeleteAccountButton";
import StoreDataComponent from "./StoreDataComponent";
import { useAccountData } from "./useAccountData";
import { getImageUrl } from "@/app/components/ProductDetails/utils/imageUtils";
import { useProfileData } from "../Dashboard/useProfileData";
import ProductsHeader from "../SavedProducts/SavedProductsHeader";
import { FaBuilding, FaChevronDown } from "react-icons/fa";
import { useState } from "react";

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface AccountSettingsProps {
  onProfileEdit?: () => void;
  onPasswordChange?: (data: PasswordFormData) => void;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({
  onProfileEdit,
  onPasswordChange,
}) => {
  // const { data, loading, error } = useAccountData();

  const { data: AccountData, fullName, loading, error } = useProfileData();

  // Business accounts
  // const [showAccountInfo, setShowAccountInfo] = useState(false);
  // const [showBusinessDetails, setShowBusinessDetails] = useState(false);

  console.log(AccountData);

  console.log(AccountData?.email);
  // Default profile data as fallback
  const defaultProfileData = {
    userName: "Alfred Bisame",
    phoneNumber: "+233 554572904",
    profileImage: "/profile.jpeg",
    email: "alfredbisame@gmail.com",
  };

  // Use API data if available, otherwise fall back to defaults
  const profileData = AccountData
    ? {
        userName: fullName || defaultProfileData.userName,
        phoneNumber: AccountData.phoneNumber || undefined,
        profileImage: AccountData.profilePicture
          ? AccountData.profilePicture
          : defaultProfileData.profileImage,
        email: AccountData.email || undefined,
      }
    : defaultProfileData;

  if (loading) {
    return (
      <div className="bg-blue-50 min-h-screen">
        <ProductsHeader
          header="Settings"
          description="Want update your profile. Make necessary changes here"
        />
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Account Settings
            </h1>
            <p className="text-gray-600">Loading your account information...</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Account Settings
            </h1>
            <p className="text-red-600">
              Error loading account information: {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ProductsHeader
        header="Settings"
        description="Want to update your profile. Make necessary changes here"
      />
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Profile and Password Settings */}
        <div>
          <form>
            <ProfileSection profileData={profileData} onEdit={onProfileEdit} />

            <PasswordSection onPasswordChange={onPasswordChange} />
          </form>
        </div>

        {/* Store Display Section - Now using separate component */}
        {/* <StoreDataComponent /> */}

        {/* Delete Account Section */}
        {/* <div className="bg-white rounded-lg shadow-sm p-6"> */}
        <DeleteAccountButton />
        {/* </div> */}

        {/* <button
          onClick={toggleBusinessDetails}
          className="flex items-center w-full sm:w-auto space-x-3 bg-blue-50 hover:bg-blue-100 
                         px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-all duration-200 
                        "
        >
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
      </div>
    </div>
  );
};

export default AccountSettings;
