import React from "react";

interface LoadingPageProps {
  status?: "review" | "active" | "decline" | "update" | "closed";
}

const LoadingPage = ({ status }: LoadingPageProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-gray-500 text-sm">Loading your {status} products...</p>
    </div>
  );
};

export default LoadingPage;
