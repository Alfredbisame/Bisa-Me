import React from "react";

const ChatSubmitButton = () => {
  return (
    <button
      type="submit"
      className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
      aria-label="Send message"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
        />
      </svg>
    </button>
  );
};

export default ChatSubmitButton;
