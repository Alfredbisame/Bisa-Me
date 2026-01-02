"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface AuthHeaderProps {
  defaultTab: "signin" | "signup";
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ defaultTab }) => {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">(defaultTab);
  const router = useRouter();

  const handleTabSwitch = (tab: "signin" | "signup") => {
    setActiveTab(tab);

    // Update URL to reflect the current tab
    if (tab === "signup") {
      router.push("/UserAccounts/SignUp");
    } else {
      router.push("/UserAccounts/SignIn");
    }
  };

  return (
    <div className="flex border-b mb-4">
      <button
        onClick={() => handleTabSwitch("signin")}
        className={`flex-1 py-2 text-center font-semibold ${
          activeTab === "signin"
            ? "border-b-2 border-orange-500 text-orange-500"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Sign In
      </button>
      <button
        onClick={() => handleTabSwitch("signup")}
        className={`flex-1 py-2 text-center font-semibold ${
          activeTab === "signup"
            ? "border-b-2 border-orange-500 text-orange-500"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Sign Up
      </button>
    </div>
  );
};

export default AuthHeader;
