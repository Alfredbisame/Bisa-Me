import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDashboardData } from "./useDashboardData";
import { useProfileData } from "./useProfileData";
import { useState } from "react";
import { useLogout } from "../DashboardSideBar/useLogout";

const AccountInfo = () => {
  const router = useRouter();
  const { data, loading: dashboardLoading } = useDashboardData();
  const { data: profileData, loading: profileLoading } = useProfileData();

  // Logout
  const handleLogout = useLogout();

  // Use profile data if available, otherwise fallback to dashboard data
  const name = profileData
    ? `${profileData.firstName} ${profileData.lastName}`
    : data?.info?.name || "Bisame User";

  const email = profileData?.email || data?.info?.email || "";
  const phone = profileData
    ? `+${profileData.phoneNumber}`
    : data?.info?.phone || "+1-202-555-0118";

  const profile =
    profileData?.profilePicture || data?.info?.profile || "/profile.jpeg";

  // Optionally handle image error
  const [imgSrc, setImgSrc] = useState(profile);

  const handleEditAccount = () => {
    router.push("/dashboard/settings");
  };

  const loading = dashboardLoading || profileLoading;
  console.log(phone);

  return (
    <div className="p-4 rounded-lg">
      <h2 className="md:text-lg font-semibold mb-4 pb-2 border-b border-gray-200 text-blue-500">
        ACCOUNT INFO
      </h2>
      <div className="mb-4 text-sm md:text-base">
        <div className="flex items-center mb-4">
          {loading ? (
            <div className="w-16 h-16 rounded-full bg-gray-300 animate-pulse mr-4 border-2 border-orange-500" />
          ) : (
            <Image
              src={imgSrc}
              alt={`Profile picture of ${name}`}
              width={60}
              height={60}
              className="w-16 h-16 rounded-full mr-4 border-2 border-orange-500"
              onError={() => setImgSrc("/user.png")}
            />
          )}
          <p className="font-semibold text-gray-800">
            {loading ? (
              <span className="bg-gray-200 rounded w-24 h-5 inline-block animate-pulse" />
            ) : (
              name
            )}
          </p>
        </div>
        <div className="ml-2 space-y-2">
          {/* Only show email if present and not loading */}
          {!loading && email && (
            <p className="text-gray-600">
              <span className="font-medium text-blue-500">Email:</span> {email}
            </p>
          )}
          {loading ? (
            <p className="text-gray-600">
              <span className="font-medium text-blue-500">Phone:</span>{" "}
              <span className="bg-gray-200 rounded w-24 h-4 inline-block animate-pulse" />
            </p>
          ) : (
            <p className="text-gray-600">
              {profileData?.phoneNumber && (
                <span className="font-medium text-blue-500">
                  Phone: {phone}
                </span>
              )}
            </p>
          )}

          {/* Show referral code if profile data is available */}
          {!loading && profileData && profileData.userReferralCode && (
            <p className="text-gray-600">
              <span className="font-medium text-blue-500">Referral Code:</span>{" "}
              {profileData.userReferralCode}
            </p>
          )}

          {/* Show country if profile data is available */}
          {!loading && profileData && profileData.countryName && (
            <p className="text-gray-600">
              <span className="font-medium text-blue-500">Country:</span>{" "}
              {profileData.countryName}
            </p>
          )}

          <div className="space-x-3">
            <button
              onClick={handleEditAccount}
              className="border-2 border-blue-500 text-blue-500 text-sm  px-6 py-1 md:py-2
                       rounded-lg mt-4 hover:bg-blue-500 hover:text-white
                       transition-all duration-300 ease-in-out font-medium
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="border-2 border-red-500 text-red-500 text-sm  px-6 py-1 md:py-2
                       rounded-lg mt-4 hover:bg-red-500 hover:text-white
                       transition-all duration-300 ease-in-out font-medium
                       focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
