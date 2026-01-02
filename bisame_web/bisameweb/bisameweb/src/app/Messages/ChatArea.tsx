"use client";
import React, { memo } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { Message } from "./types";
import StartConversation from "./StartConversation";
import { ChatsPayload } from "./interfaces";

interface ChatAreaProps {
  selectedMessage: Message | null;
  currentUserId: string;
  onSendMessage: (content: string) => void;
  messageSearchParams: ChatsPayload;
}

const ChatArea: React.FC<ChatAreaProps> = memo(
  ({ selectedMessage, currentUserId, messageSearchParams, onSendMessage }) => {
    if (!selectedMessage) {
      return <StartConversation />;
    }

    return (
      <section className="flex-1 flex flex-col bg-gray-50 min-h-full overflow-hidden h-full">
        <ChatHeader selectedMessage={selectedMessage} />
        <div className="flex-1 min-h-60 max-h-96  overflow-y-scroll">
          <ChatMessages
            currentUserId={currentUserId}
            messageSearchParams={messageSearchParams}
          />
        </div>
        <div className="flex-shrink-0 fixed md:static bottom-0 z-50 p-1">
          <ChatInput
            userId={currentUserId}
            onSendMessage={onSendMessage}
            selectedMessage={selectedMessage}
          />
        </div>
      </section>
    );
  }
);

ChatArea.displayName = "ChatArea";

export default ChatArea;
