import React from "react";

const StartConversation = () => {
  return (
    <div className="flex-1 flex items-center h-[70vh] justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <h3 className="font-medium text-gray-900 mb-2">
          Select a conversation
        </h3>
        <p className="text-gray-500 text-sm">
          Choose a message from the list to start chatting
        </p>
      </div>
    </div>
  );
};

export default StartConversation;
