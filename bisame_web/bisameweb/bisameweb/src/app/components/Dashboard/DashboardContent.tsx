"use client";

import { useState, useEffect, JSX } from "react";
import DashboardStats from "./DashboardStats";
import { FaSun, FaMoon, FaCloudSun } from "react-icons/fa";
import PerformanceChart from "./PerformanceChart";
import { useDashboardData } from "./useDashboardData";
import { useProfileData } from "./useProfileData";

function GreetingHeader() {
  const [greeting, setGreeting] = useState("");
  const [greetingIcon, setGreetingIcon] = useState<JSX.Element | null>(null);
  const { data, loading } = useDashboardData();
  const { data: profileData, loading: profileLoading } = useProfileData();

  // Use profile data if available, otherwise fallback to dashboard data
  const userName = profileData
    ? `${profileData.firstName} ${profileData.lastName}`
    : data?.info?.name || "Bisame User";

  useEffect(() => {
    const updateGreeting = () => {
      const now = new Date();
      const hour = now.getHours();
      if (hour >= 5 && hour < 12) {
        setGreeting("Good Morning");
        setGreetingIcon(<FaSun className="text-yellow-500" />);
      } else if (hour >= 12 && hour < 17) {
        setGreeting("Good Afternoon");
        setGreetingIcon(<FaCloudSun className="text-orange-500" />);
      } else if (hour >= 17 && hour < 21) {
        setGreeting("Good Evening");
        setGreetingIcon(<FaCloudSun className="text-orange-600" />);
      } else {
        setGreeting("Good Night");
        setGreetingIcon(<FaMoon className="text-blue-400" />);
      }
    };
    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-3">
      <div
        className="flex items-center justify-center w-6 h-6 md:w-12 md:h-12 
                     bg-gradient-to-br from-blue-900 to-blue-100 
                     rounded-xl self-start"
      >
        {greetingIcon}
      </div>
      <div>
        <h1 className="md:text-lg font-semibold text-gray-800 flex items-center gap-2 text-sm">
          {greeting},{" "}
          <span className="text-blue-800">
            {loading || profileLoading ? (
              <span className="bg-gray-200 rounded w-24 h-6 inline-block animate-pulse" />
            ) : (
              userName
            )}
          </span>
        </h1>
        <p className="text-xs md:text-sm text-gray-600 mt-1">
          Welcome back to your dashboard
        </p>
      </div>
    </div>
  );
}

function DateTimeSection() {
  const [currentTime, setCurrentTime] = useState("");
  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setCurrentTime(timeString);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="lg:text-right">
      <div className="text-orange-500 md:text-lg font-semibold">{currentTime}</div>
      <div className="text-xs md:text-sm text-gray-500">{getCurrentDate()}</div>
    </div>
  );
}

const DashboardContent = () => {
  return (
    <div className="min-h-screen w-full">
      <div>
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header Section */}
          {/* <div className="bg-white rounded-lg shadow-md border-gray-200 p-6 md:p-6 mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <GreetingHeader />
              <DateTimeSection />
            </div>
          </div> */}
          {/* Dashboard Stats - Full Width */}
          <div className="w-full">
            <DashboardStats />
          </div>
          <PerformanceChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
