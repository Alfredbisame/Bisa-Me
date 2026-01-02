"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaHeart } from "react-icons/fa";

const EmptySavedProducts: React.FC = () => {
  const router = useRouter();
  const handleBrowseProducts = () => {
    router.push("/");
  };
  return (
    <div className="text-center py-16">
      <div className="mb-4">
        <FaHeart className="mx-auto text-gray-300 w-16 h-16" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No Saved Products
      </h3>
      <p className="text-gray-600 mb-6">
        You haven&apos;t saved any products yet. Start browsing to save your
        favorites!
      </p>
      <button
        onClick={handleBrowseProducts}
        className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200"
      >
        Browse Products
      </button>
    </div>
  );
};

export default EmptySavedProducts;
