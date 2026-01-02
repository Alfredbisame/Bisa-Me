"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const SignInSignUp: React.FC = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

  // Check for tab parameter in URL on component mount
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'signup') {
      setActiveTab('signup');
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center py-10 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        {/* Tabs */}
        <div className="flex border-b mb-4">
          <button
            onClick={() => setActiveTab("signin")}
            className={`flex-1 py-2 text-center font-semibold ${
              activeTab === "signin"
                ? "border-b-2 border-orange-500 text-orange-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-2 text-center font-semibold ${
              activeTab === "signup"
                ? "border-b-2 border-orange-500 text-orange-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Content */}
        {activeTab === "signin" ? (
          <SignInForm />
        ) : (
          <SignUpForm />
        )}
      </div>
    </div>
  );
};

export default SignInSignUp;