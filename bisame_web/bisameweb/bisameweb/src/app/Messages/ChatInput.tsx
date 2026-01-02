"use client";

import React, { useState, useCallback, memo, useRef, useEffect } from "react";
import QuickReplies from "./QuickReplies";
import ChatSubmitButton from "./ChatSubmitButton";
import ChatAudioButton from "./ChatAudioButton";
import ChatAttachmentButton from "./ChatAttachmentButton";
import { Message } from "./types";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  userId: string;
  selectedMessage?: Message | null;
}

const ChatInput: React.FC<ChatInputProps> = memo(
  ({ onSendMessage, selectedMessage }) => {
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const chatInputRef = useRef<HTMLInputElement | null>(null);

    // Automatically focus to chat input
    useEffect(() => {
      if (chatInputRef.current) {
        chatInputRef.current.focus();
      }
    }, [chatInputRef]);

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
      },
      []
    );

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const trimmedMessage = message.trim();
      if (!trimmedMessage || isSending) return;

      setIsSending(true);

      if (chatInputRef.current) {
        chatInputRef.current.focus();
      }

      try {
        await onSendMessage(trimmedMessage);
        setMessage(""); // Clear input only after successful send
      } catch (error) {
        console.error("Failed to send message:", error);
        // Keep the message in input if send fails
      } finally {
        setIsSending(false);
      }
    };

    const handleQuickReply = (reply: string) => {
      setMessage(reply);
    };

    return (
      <div className="bg-white p-4 space-y-2">
        {/* Quick replies */}
        <QuickReplies onQuickReply={handleQuickReply} />

        {/* Input area */}
        <form onSubmit={handleSubmit} className="flex items-center space-x-3">
          {/* Attachment buttons */}
          <ChatAttachmentButton />

          <input
            className="flex-1 border border-gray-300 rounded-full p-3 text-xs text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Write your message here..."
            type="text"
            ref={chatInputRef}
            value={message}
            onChange={handleChange}
            disabled={isSending}
          />

          {message.trim() ? <ChatSubmitButton /> : <ChatAudioButton />}
        </form>
      </div>
    );
  }
);

ChatInput.displayName = "ChatInput";

export default ChatInput;
