"use client";
import React from "react";
import Image from "next/image";
import { Message } from "./types";

interface MessageItemProps {
  message: Message;
  isSelected: boolean;
  onClick: () => void;
}

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  isSelected,
  onClick,
}) => {
  const formatTimestamp = (timestamp: string | Date): string => {
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    const now = new Date();

    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (days < 7) {
      return date.toLocaleDateString([], {
        weekday: "short",
      });
    } else {
      return date.toLocaleDateString([], {
        month: "short",
        day: "numeric",
      });
    }
  };

  // Memoize the payload to prevent recreating on every render
  // const messagePayload = useMemo(
  //   () => ({
  //     listingId: message.listingId,
  //     messageId: `${Date.now()}-${nanoid(16)}`,
  //     sellerId: message.id,
  //     userId: message.mainId,
  //   }),
  //   [message.listingId, message.id, message.mainId]
  // );

  // Pass the payload through onClick instead of using context with useEffect
  const handleClick = () => {
    onClick();
    // If you need to update context, do it here instead of useEffect
    // handleMessagePayload(messagePayload);
  };

  
  console.log(message)

  return (
    <li
      className={`flex items-start p-2 space-x-2 cursor-pointer transition-colors hover:bg-gray-50 ${
        isSelected ? "bg-blue-50 border-r-2 border-blue-500" : ""
      }`}
      onClick={handleClick}
    >
      {/* Avatar */}
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full ${message.avatarColor} text-white font-semibold flex-shrink-0`}
      >
        {message.avatarImage ? (
          <Image
            src={message.imageUrl ?? message.avatarImage}
            alt={message.title}
            width={48}
            height={48}
            className="rounded-full object-cover"
            unoptimized
            onError={() => {

            }}
          />
        ) : message.avatarIcon === "check" ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          message.avatar
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1">
          <p className="text-xs font-semibold text-gray-900 truncate">
            {message.title}
          </p>
          <time className="text-xs text-gray-500 flex-shrink-0">
            {formatTimestamp(message.timestamp)}
          </time>
        </div>

        {message.status === "closed" && message.adTitle && (
          <div className="flex items-center space-x-2 mt-1">
            <span className="bg-orange-500 text-white text-xs whitespace-nowrap font-medium rounded px-2 py-0.5">
              Closed ad
            </span>
            <p className="text-xs text-gray-600 truncate">{message.adTitle}</p>
          </div>
        )}

        <p className="text-xs text-gray-600 truncate mt-0.5">
          {message.lastMessage}
        </p>

        {!message.isRead && (
          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
        )}
      </div>
    </li>
  );
};

export default MessageItem;
