import React, { memo } from "react";
import ChatArea from "./ChatArea";
import { Message } from "./types";
import { ChatsPayload, InitialContext } from "./interfaces";
import StartConversation from "./StartConversation";
import { IoArrowBack } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";

interface RightChatPanelProps {
  selectedMessage: Message | null;
  initialContext: InitialContext;
  messageSearchParams: ChatsPayload | null;
  onSendMessage: (content: string) => void;

  // Mobile-only UI control
  onBack?: () => void;
}

const RightChatPanel: React.FC<RightChatPanelProps> = memo(
  ({
    selectedMessage,
    initialContext,
    messageSearchParams,
    onSendMessage,
    onBack,
  }) => {
    if (!selectedMessage || !messageSearchParams) {
      return (
        <div className="flex-1 flex flex-col bg-white h-full">
          {/* Mobile header row (UI-only) */}
          <div className="lg:hidden flex items-center gap-2 px-3 py-2 border-b border-gray-100">
            <button
              type="button"
              onClick={onBack}
              className="px-3 py-2 text-sm rounded-md border border-gray-200 bg-white"
            >
              <IoMdArrowRoundBack />
              Back
            </button>
            <div className="text-sm text-gray-600 truncate">Messages</div>
          </div>

          <div className="flex-1 overflow-hidden">
            <StartConversation />
          </div>
        </div>
      );
    }

    return (
      <div className="flex-1 flex flex-col bg-white h-full">
        {/* Mobile header row (UI-only) */}
        <div className="lg:hidden flex items-center justify-between gap-2 px-3 py-2 border-b border-gray-100">
          <button
            type="button"
            onClick={onBack}
            className="px-3 py-2 text-xs rounded-md border border-gray-200 bg-white flex items-center gap-1"
          >
            <IoMdArrowRoundBack />
            Back
          </button>
          <div className="text-sm text-gray-600 truncate">Conversation</div>
        </div>

        <div className="flex-1 overflow-hidden">
          <ChatArea
            currentUserId={initialContext?.userId as string}
            messageSearchParams={messageSearchParams}
            selectedMessage={selectedMessage}
            onSendMessage={onSendMessage}
          />
        </div>
      </div>
    );
  }
);

RightChatPanel.displayName = "RightChatPanel";

export default RightChatPanel;
