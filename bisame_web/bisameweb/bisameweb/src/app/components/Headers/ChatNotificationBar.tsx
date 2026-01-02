"use client";
import { FC, useState, useEffect } from "react";
import { X, Bell, MessageCircle } from "lucide-react";
import useChatContact from "@/app/Messages/hooks/use-chat-contacts";
import { ConversationProps } from "@/app/Messages/interfaces";

interface NotificationBarProps {
  autoScroll?: boolean;
  scrollSpeed?: number;
  showOnlyActive?: boolean;
}

const NotificationBar: FC<NotificationBarProps> = ({
  autoScroll = true,
  scrollSpeed = 50,
  showOnlyActive = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const { chatContactsData, isLoadingChatContacts } = useChatContact(
    1,
    20,
    "desc"
  );

  // Filter for active/open conversations
  const notifications =
    chatContactsData?.filter((contact) =>
      showOnlyActive ? !contact.isClosed : true
    ) || [];

  useEffect(() => {
    if (!autoScroll || isPaused || notifications.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length);
    }, scrollSpeed * 100);

    return () => clearInterval(interval);
  }, [autoScroll, isPaused, notifications.length, scrollSpeed]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % notifications.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + notifications.length) % notifications.length
    );
  };

  const formatTime = (timestamp: string | Date) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getUserName = (contact: ConversationProps) => {
    if (contact.userInfo?.firstName && contact.userInfo?.lastName) {
      return `${contact.userInfo.firstName} ${contact.userInfo.lastName}`;
    }
    if (contact.userInfo?.firstName) {
      return contact.userInfo.firstName;
    }
    if (contact.userInfo?.email) {
      // return contact.userInfo.email.split("@")[0];
    }
    return "Unknown User";
  };

  const getListingTitle = (contact: ConversationProps) => {
    return contact.listingInfo?.title || "Listing";
  };

  const getStatusColor = (contact: ConversationProps) => {
    if (contact.isClosed) return "from-gray-600 to-gray-700";
    if (contact.isConnected) return "from-green-600 to-green-700";
    return "from-blue-600 to-blue-700";
  };

  if (!isVisible || notifications.length === 0 || isLoadingChatContacts)
    return null;

  const currentNotification = notifications[currentIndex];
  const activeCount = notifications.filter((n) => !n.isClosed).length;

  return (
    <div
      className={`relative flex items-center justify-between bg-blue-500 text-white p-3 md:p-4 shadow-lg transition-all duration-300`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Bell Icon with Badge */}
      <div className="flex-shrink-0 mr-3 relative">
        <Bell
          size={20}
          className={currentNotification.isConnected ? "animate-pulse" : ""}
        />
        {activeCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {activeCount > 9 ? "9+" : activeCount}
          </span>
        )}
      </div>

      {/* Notification Content */}
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center justify-center gap-4">
          {/* Previous Button */}
          {notifications.length > 1 && (
            <button
              onClick={goToPrev}
              className="flex-shrink-0 hover:bg-white/20 rounded p-1 transition-colors"
              aria-label="Previous notification"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Message */}
          <div className="text-center flex-1 min-w-0">
            <div className="flex items-center justify-center gap-2 mb-1 flex-wrap">
              <MessageCircle size={16} />
              <span className="text-xs font-semibold">
                {getUserName(currentNotification)}
              </span>
              <span className="text-xs opacity-75">
                • {getListingTitle(currentNotification)}
              </span>
              {currentNotification.isConnected && (
                <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Online
                </span>
              )}
              {currentNotification.isClosed && (
                <span className="bg-gray-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Closed
                </span>
              )}
            </div>
            <p className="text-sm md:text-base font-medium truncate">
              {currentNotification.lastMessage?.message || "No message yet"}
            </p>
            <p className="text-xs opacity-75 mt-1">
              {currentNotification.lastMessage?.createdAt
                ? formatTime(currentNotification.lastMessage.createdAt)
                : currentNotification.lastConnectionAt
                ? `Connected ${formatTime(
                    currentNotification.lastConnectionAt
                  )}`
                : formatTime(currentNotification.createdAt)}
            </p>
          </div>

          {/* Next Button */}
          {notifications.length > 1 && (
            <button
              onClick={goToNext}
              className="flex-shrink-0 hover:bg-white/20 rounded p-1 transition-colors"
              aria-label="Next notification"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Pagination Dots */}
        {notifications.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-2">
            {notifications.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-white w-4"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to notification ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Close Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="flex-shrink-0 ml-3 hover:bg-white/20 rounded p-1 transition-colors"
        aria-label="Close notification bar"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default NotificationBar;
