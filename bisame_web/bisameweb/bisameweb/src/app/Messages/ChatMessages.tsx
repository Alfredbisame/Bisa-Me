"use client";

import React, { memo, useMemo } from "react";
import SafetyNotice from "./SafetyNotice";
import useFetchChats from "./hooks/use-fetch-chats";
import ChatBubble from "./ChatBubble";
import { ChatMessage, ChatsPayload } from "./interfaces";

interface ChatMessagesProps {
  messageSearchParams: ChatsPayload;
  currentUserId: string;
}

const LoadingSkeleton = memo(() => (
  <div className="flex flex-col space-y-4 animate-pulse">
    {/* Message 1 - Right side */}
    <div className="flex justify-end">
      <div className="h-10 w-48 rounded-2xl bg-gradient-to-r from-gray-200 to-gray-100"></div>
    </div>

    {/* Message 2 - Left side */}
    <div className="flex justify-start">
      <div className="h-10 w-40 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200"></div>
    </div>

    {/* Message 3 - Right side */}
    <div className="flex justify-end">
      <div className="h-12 w-52 rounded-2xl bg-gradient-to-r from-gray-200 to-gray-100"></div>
    </div>

    {/* Message 4 - Left side with multiple lines */}
    <div className="flex justify-start flex-col gap-2">
      <div className="h-10 w-44 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200"></div>
      <div className="h-10 w-36 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200"></div>
    </div>

    {/* Message 5 - Right side */}
    <div className="flex justify-end">
      <div className="h-10 w-40 rounded-2xl bg-gradient-to-r from-gray-200 to-gray-100"></div>
    </div>

    {/* Message 6 - Left side */}
    <div className="flex justify-start">
      <div className="h-10 w-32 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200"></div>
    </div>
  </div>
));

LoadingSkeleton.displayName = "LoadingSkeleton";

const ChatMessages: React.FC<ChatMessagesProps> = memo(
  ({ messageSearchParams, currentUserId }) => {
    const { chatData, isChatLoading } = useFetchChats(
      messageSearchParams.listingId as string,
      messageSearchParams.userId1 as string,
      messageSearchParams.userId2 as string
    );

    // Convert API messages to UI messages
    const normalizeStatus = (status?: string): ChatMessage["status"] => {
      if (!status) return undefined;

      const normalized = status.toLowerCase();

      if (
        normalized === "sent" ||
        normalized === "delivered" ||
        normalized === "read"
      ) {
        return normalized;
      }

      return undefined;
    };

    const messages: ChatMessage[] = useMemo(() => {
      if (!chatData?.length) return [];

      return chatData.map<ChatMessage>((item) => ({
        id: item.messageId || "",
        content: item.message || "",
        timestamp: new Date(item.createdAt),
        isOwn: item.fromUserId === currentUserId,
        type: "text",
        status: normalizeStatus(item.messageStatus),
      }));
    }, [chatData, currentUserId]);

    // Memoize the current date string
    const dateString = useMemo(() => {
      return new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }, []);

    return (
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-4 space-y-4">
        {/* Date separator */}
        <div className="flex justify-center">
          <time className="text-center text-gray-500 text-xs bg-white px-3 py-1.5 rounded-full shadow-sm">
            {dateString}
          </time>
        </div>

        {/* Safety notice */}
        <SafetyNotice
          type="warning"
          message="Avoid paying in advance! Even for delivery"
        />

        {/* Chat messages */}
        <div className="space-y-3">
          {isChatLoading && <LoadingSkeleton />}

          {!isChatLoading &&
            messages.map((message, index) => {
              const showAvatar =
                index === 0 || messages[index - 1].isOwn !== message.isOwn;

              return (
                <ChatBubble
                  key={`${message.id}-${index}`}
                  message={message}
                  showAvatar={showAvatar}
                />
              );
            })}
        </div>

        {/* Safety notice for WhatsApp */}
        <SafetyNotice
          type="info"
          message="It's safer to stay in Bisame chat. We can't protect you in other messaging apps"
          icon="💚"
        />
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison to prevent unnecessary rerenders
    return (
      prevProps.currentUserId === nextProps.currentUserId &&
      prevProps.messageSearchParams.listingId ===
        nextProps.messageSearchParams.listingId &&
      prevProps.messageSearchParams.userId1 ===
        nextProps.messageSearchParams.userId1 &&
      prevProps.messageSearchParams.userId2 ===
        nextProps.messageSearchParams.userId2
    );
  }
);

ChatMessages.displayName = "ChatMessages";

export default ChatMessages;
