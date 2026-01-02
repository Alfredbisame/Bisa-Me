import React from "react";
import { ChatMessage } from "./types";

interface ChatBubbleProps {
  message: ChatMessage;
  showAvatar?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "sent":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "delivered":
        return (
          <div className="flex">
            <svg
              className="w-4 h-4 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      case "read":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="currentColor"
            className="w-5 h-5 text-blue-500"
          >
            <path d="M9.5 18.5l-4.5-4.5 1.4-1.4 3.1 3.1 6.4-6.4 1.4 1.4-7.8 7.8zm6 0l-4.5-4.5 1.4-1.4 3.1 3.1 8.4-8.4 1.4 1.4-9.8 9.8z" />
          </svg>
        );
      default:
        return null;
    }
  };

  if (message.isOwn) {
    return (
      <div className="flex justify-end">
        <div className="max-w-xs lg:max-w-md">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl rounded-br-md px-3 py-2 shadow-sm">
            <p className="text-xs break-words">{message.content}</p>
          </div>
          <div className="flex items-center justify-end space-x-1 mt-0.5 px-2">
            <time className="text-xs text-gray-500">
              {formatTime(message.timestamp)}
            </time>
            {message.status && (
              <div className="text-gray-400">
                {getStatusIcon(message.status)}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-xs lg:max-w-md">
        <div className="bg-gray-200 rounded-2xl rounded-bl-md px-3 py-2 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-800 break-words">{message.content}</p>
        </div>
        <div className="flex items-center justify-start mt-0.5 px-2">
          <time className="text-xs text-gray-500">
            {formatTime(message.timestamp)}
          </time>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
