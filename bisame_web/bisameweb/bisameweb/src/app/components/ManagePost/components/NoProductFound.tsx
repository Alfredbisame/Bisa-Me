"use client";
import React from "react";
import { FiInbox } from "react-icons/fi";

const NoProductFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-gradient-to-br from-blue-50 to-white  shadow-inner ">
      <div className="flex items-center justify-center w-28 h-28 rounded-full bg-orange-50 mb-6 shadow-lg">
        <FiInbox className="text-blue-400 opacity-80" size={64} />
      </div>
      <h2 className="md:text-xl font-bold text-gray-700 mb-2">
        No Products Under Review
      </h2>
      <p className="text-gray-500 text-sm md:text-base max-w-md text-center mb-4">
        You have no products under review at the moment.
        <br />
        New posts will appear here while being reviewed.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-2 px-6 py-2 bg-orange-500 text-white text-sm md:text-base rounded-lg shadow hover:bg-orange-600 transition"
      >
        Refresh
      </button>
    </div>
  );
};

export default NoProductFound;
