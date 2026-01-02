"use client";
import React from "react";
import { FaTimes } from "react-icons/fa";

const ErrorPage = ({ error }: { error: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-12 h-12 flex items-center justify-center bg-orange-50 rounded-full mb-4">
        <FaTimes className="text-red-500" size={28} />
      </div>
      <p className="text-red-600 font-semibold mb-2">Failed to load products</p>
      <p className="text-gray-500 text-sm max-w-xs text-center">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorPage;
