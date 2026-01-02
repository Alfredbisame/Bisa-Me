import React from "react";

const ChatSystemHeader = () => {
  return (
    <header className="flex items-center justify-between bg-blue-900/95 border-b border-gray-200 px-6 h-16 shadow-sm">
      <div className="flex items-center space-x-4">
        <span className="text-white font-semibold select-none">My Chats</span>
      </div>
      {/* <div className="text-white font-semibold select-none hidden sm:block">
            {initialContext?.sellerName?.toUpperCase()}
          </div> */}
      <div className="flex items-center space-x-3">
        <button
          aria-label="Flag"
          className="border border-gray-300 rounded-lg p-2 text-white hover:bg-orange-600 focus:outline-none transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 2h6.5a2 2 0 012 2v6a2 2 0 01-2 2H9l-1-2H5a2 2 0 01-2-2z"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default ChatSystemHeader;
