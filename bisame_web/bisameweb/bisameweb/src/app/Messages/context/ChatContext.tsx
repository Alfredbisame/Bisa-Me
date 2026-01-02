"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { ChildrenProps } from "../interfaces";

interface ChatContextProviderProps {
  messagePayload: Record<string, unknown>;
  handleMessagePayload: (data: Record<string, unknown>) => void;
}

const ChatContext = createContext<ChatContextProviderProps | null>(null);

const ChatContextProvider = ({ children }: ChildrenProps) => {
  const [messagePayload, setMessagePayload] = useState<Record<string, unknown>>(
    {}
  );

  const handleMessagePayload = useCallback((data: Record<string, unknown>) => {
    setMessagePayload((prevPayload) => ({ ...prevPayload, ...data }));
  }, []);

  return (
    <ChatContext.Provider value={{ messagePayload, handleMessagePayload }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within ChatContextProvider");
  }

  return context;
};

// Optional accessor that returns null when provider is absent.
export const useOptionalChatContext = () => {
  return useContext(ChatContext);
};

export { ChatContext };

export default ChatContextProvider;
