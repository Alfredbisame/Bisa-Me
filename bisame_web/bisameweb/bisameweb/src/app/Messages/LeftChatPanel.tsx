import React, { memo, useState, useMemo } from "react";
import MessagesList from "./MessagesList";
import { Message } from "./types";

interface LeftChatPanelProps {
  messages: Message[];
  selectedMessage: Message | null;
  isLoadingChatContacts: boolean;
  onSelectMessage: (message: Message) => void;
}

const LeftChatPanel: React.FC<LeftChatPanelProps> = memo(
  ({ messages, selectedMessage, isLoadingChatContacts, onSelectMessage }) => {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter messages based on search query
    const filteredMessages = useMemo(() => {
      if (!searchQuery.trim()) return messages;

      const query = searchQuery.toLowerCase();
      return messages.filter(
        (message) =>
          message.title.toLowerCase().includes(query) ||
          message.lastMessage?.toLowerCase().includes(query) ||
          message.adTitle?.toLowerCase().includes(query)
      );
    }, [messages, searchQuery]);

    return (
      <div className="w-full lg:w-auto h-full flex flex-col border-r border-gray-100 bg-gray-50">
        <div className="px-3 py-3 md:py-2 border-b border-gray-100 bg-white space-y-2">
          <h2 className="font-semibold">Messages</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border text-xs border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            />
            <svg
              className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <MessagesList
            messages={filteredMessages}
            selectedMessage={selectedMessage}
            isLoadingMessage={isLoadingChatContacts}
            onSelectMessage={onSelectMessage}
          />
        </div>
      </div>
    );
  }
);

LeftChatPanel.displayName = "LeftChatPanel";

export default LeftChatPanel;
