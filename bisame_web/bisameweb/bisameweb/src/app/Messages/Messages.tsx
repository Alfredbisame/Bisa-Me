"use client";

import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import RightChatPanel from "./RightChatPanel";
import LeftChatPanel from "./LeftChatPanel";
import useChatContact from "./hooks/use-chat-contacts";
import useFormatChatContact from "./hooks/use-format-chat-contact";
import { APIChatMessage, ChatsPayload, InitialContext } from "./interfaces";
import { Message } from "./types";
import ChatSystemHeader from "./ChatSystemHeader";
import useSendChats from "./hooks/use-send-chat";
import { ChatMessageType } from "./enum";
import { nanoid } from "nanoid";
import { useProfileData } from "../components/Dashboard/useProfileData";

interface MessagePage {
  productTitle?: string;
  userId?: string;
  userName?: string;
}

const Messages = () => {
  const { data, fullName } = useProfileData();

  const initialContext: MessagePage = {
    userId: data?.id,
    userName: fullName,
  };

  const { chatContactsData, isLoadingChatContacts } = useChatContact();
  const userId = useMemo(
    () => initialContext?.userId ?? "",
    [initialContext?.userId]
  );

  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  const formattedMessages = useFormatChatContact(chatContactsData, userId);

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const hasSetInitialMessage = useRef(false);

  useEffect(() => {
    if (
      !hasSetInitialMessage.current &&
      !selectedMessage &&
      formattedMessages?.length > 0
    ) {
      setSelectedMessage(formattedMessages[0]);
      // hasSetInitialMessage.current = true;
    }
  }, [formattedMessages, selectedMessage]);

  const messageSearchParams: ChatsPayload | null = useMemo(() => {
    if (!selectedMessage) return null;

    return {
      userId1: userId,
      userId2: selectedMessage.id,
      listingId: selectedMessage.listingId,
    };
  }, [userId, selectedMessage]);

  const { chatHandler } = useSendChats(userId);

  const handleSendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) {
        console.warn("Cannot send empty message");
        return;
      }

      if (!selectedMessage) {
        console.warn("No selected message/conversation");
        return;
      }

      if (!userId) {
        console.warn("No userId available");
        return;
      }

      // Create properly typed API message
      const messageDetails: APIChatMessage = {
        messageId: `${Date.now()}-${nanoid(16)}`,
        fromUserId: userId,
        toUserId: selectedMessage.id,
        listingId: selectedMessage.listingId || "",
        message: content,
        messageType: ChatMessageType.Text,
        createdAt: new Date().toISOString(),
      };

      console.log("Sending message:", messageDetails);

      try {
        await chatHandler(messageDetails);
        console.log("Message sent successfully");
      } catch (error) {
        console.error("Failed to send message:", error);
        alert("Failed to send message. Please try again.");
      }
    },
    [selectedMessage, userId, chatHandler]
  );

  const handleSelectMessage = useCallback((message: Message) => {
    console.log("Selected conversation:", message);
    setSelectedMessage(message);

    // Mobile: jump to chat screen when a conversation is selected
    setMobileView("chat");
  }, []);

  const handleBackToList = useCallback(() => {
    setMobileView("list");
  }, []);

  // If a user resizes up to desktop, keep layout showing both panels naturally.
  useEffect(() => {
    const onResize = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth >= 1024) {
        // Desktop/tablet: no need to force either view
        // (we keep state, but layout shows both at lg+)
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto rounded-lg border-2 border-gray-50 overflow-hidden">
      {/* <ChatSystemHeader /> */}

      <main
        className="
  flex flex-col lg:flex-row
  min-h-[50vh]
  xl:min-h-[70vh]
  overflow-auto
"
      >
        <div
          className={[
            "h-full",
            mobileView === "list" ? "block" : "hidden",
            "lg:block lg:w-1/3",
          ].join(" ")}
        >
          <LeftChatPanel
            messages={formattedMessages || []}
            isLoadingChatContacts={isLoadingChatContacts}
            selectedMessage={selectedMessage}
            onSelectMessage={handleSelectMessage}
          />
        </div>

        <div
          className={` h-full flex-1 ${
            mobileView === "chat" ? "block" : "hidden"
          } lg:block`}
        >
          <RightChatPanel
            initialContext={initialContext as InitialContext}
            selectedMessage={selectedMessage}
            messageSearchParams={messageSearchParams}
            onSendMessage={handleSendMessage}
            onBack={handleBackToList}
          />
        </div>
      </main>
    </div>
  );
};

export default Messages;
