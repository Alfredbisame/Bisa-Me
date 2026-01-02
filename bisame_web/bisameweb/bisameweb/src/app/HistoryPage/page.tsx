"use client";
import React, { useState } from "react";
import AllProductHistory from "../components/HistoryPage/AllProductHistory";
import { useRecentViews } from "../components/BrowsingHistory";
import { useUser } from "../hooks/useUser";

const HistoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { userId } = useUser();
  const { recentViews, loading, error, totalPages } = useRecentViews({
    userId: userId || undefined,
    page: currentPage,
    pageSize: 20
  });
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your browsing history...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Error loading browsing history: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <AllProductHistory
      products={recentViews}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
};

export default HistoryPage;