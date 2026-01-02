"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import MessageInput from "./MessageInput";
import useSendChats from "@/app/Messages/hooks/use-send-chat";
import { APIChatMessage } from "@/app/Messages/interfaces";
import { ChatMessageType } from "@/app/Messages/enum";
import { useOptionalChatContext } from "@/app/Messages/context/ChatContext";
import { nanoid } from "nanoid";
import QuickReplies from "@/app/Messages/QuickReplies";

interface MessageBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendMessage?: (message: string) => void;
  recipientName?: string;
  productTitle?: string;
  recipientId?: string;
  listingId?: string;
  currentUserId?: string;
}

const MessageBoxModal: React.FC<MessageBoxModalProps> = ({
  isOpen,
  onClose,
  onSendMessage,
  recipientName = "Seller",
  productTitle,
  recipientId,
  listingId,
  currentUserId,
}) => {
  const router = useRouter();
  const chatContext = useOptionalChatContext();
  const [message, setMessage] = useState("");
  const [selectedQuickMessage, setSelectedQuickMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const { chatHandler } = useSendChats(currentUserId || "");

  /* Escape Key */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isLoading) onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isLoading, onClose]);

  /* Reset modal state on open */
  useEffect(() => {
    if (isOpen) {
      setMessage("");
      setSelectedQuickMessage("");
      setIsLoading(false);
      setShowSuccessAnimation(false);
    }
  }, [isOpen]);

  const handleQuickMessageSelect = (msg: string) => {
    setSelectedQuickMessage((s) => (s === msg ? "" : msg));
    setMessage(msg);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Validate required fields
    if (!currentUserId || !recipientId || !listingId) {
      console.error("Missing required fields:", {
        currentUserId,
        recipientId,
        listingId,
      });
      alert("Cannot send message. Missing required information.");
      return;
    }

    setIsLoading(true);

    try {
      // Create properly typed API message
      const messageDetails: APIChatMessage = {
        messageId: `${Date.now()}-${nanoid(16)}`,
        fromUserId: currentUserId,
        toUserId: recipientId,
        listingId: listingId,
        message: message.trim(),
        messageType: ChatMessageType.Text,
        createdAt: new Date().toISOString(),
      };

      console.log("Sending message:", messageDetails);

      // Optimistic update - add message to UI immediately (only if context exists)
      if (chatContext?.handleMessagePayload) {
        chatContext.handleMessagePayload({ newMessage: messageDetails });
      }

      // Use the real chat handler to send message
      await chatHandler(messageDetails);

      // Call optional callback if provided
      await onSendMessage?.(message.trim());

      setShowSuccessAnimation(true);

      setTimeout(() => {
        onClose();
        setShowSuccessAnimation(false);
        // Wait for message to be processed and stored before redirecting
        setTimeout(() => {
          router.push("/dashboard/chat-messages");
        }, 2000);
      }, 2900);
    } catch (err) {
      console.error("Failed to send message:", err);
      alert(
        err instanceof Error
          ? err.message
          : "Failed to send message. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isLoading) onClose();
  };

  const handleQuickReply = (reply: string) => {
    setMessage(reply);
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fadeIn" />

      {/* Modal */}
      <div
        className={`
          relative w-full max-w-xl bg-white rounded-xl shadow-xl overflow-hidden 
          animate-scaleIn border border-gray-200 
          ${showSuccessAnimation ? "pointer-events-none" : ""}
        `}
      >
        {/* Success Overlay */}
        {showSuccessAnimation && (
          <div className="absolute inset-0 z-20 bg-white/80 backdrop-blur-sm flex items-center justify-center animate-fadeIn">
            <div className="bg-white p-6 rounded-full shadow-lg border border-blue-200 animate-bounceIn">
              <svg
                className="w-10 h-10 text-blue-600"
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
            </div>
          </div>
        )}

        {/* HEADER */}
        <div className="px-6 py-5 bg-white border-b">
          <div className="flex items-start justify-between">
            <div className="space-y-2 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900">
                Send a Message
              </h3>

              {productTitle && (
                <p className="text-sm bg-gray-100 px-3 py-1 rounded-md truncate border font-medium text-gray-700">
                  {productTitle}
                </p>
              )}

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-blue-600 text-white text-sm font-semibold rounded-full flex items-center justify-center">
                  {recipientName.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  To: {recipientName}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              disabled={isLoading}
              aria-label="Close"
              className="p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* QUICK MESSAGES */}
        <div className="bg-gray-50 border-b px-6 py-3 space-y-5">
          <h4 className="text-base font-semibold text-gray-700">
            Quick messages
          </h4>
          <QuickReplies onQuickReply={handleQuickReply} />
        </div>

        {/* INPUT */}
        <div className="bg-white px-6 py-4">
          <MessageInput
            value={message}
            onChange={(val) => {
              setMessage(val);
              if (selectedQuickMessage && val !== selectedQuickMessage)
                setSelectedQuickMessage("");
            }}
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="px-6 py-5 bg-gray-50 border-t space-y-3">
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 py-3 border rounded-lg hover:bg-gray-100 font-medium text-gray-700"
              disabled={isLoading}
            >
              Cancel
            </button>

            <button
              onClick={handleSendMessage}
              disabled={!message.trim() || isLoading}
              className={`
                flex-1 py-3 rounded-lg font-semibold transition
                ${
                  message.trim() && !isLoading
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }
              `}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </div>
              ) : (
                "Send Message"
              )}
            </button>
          </div>

          {/* FOOTER INFO */}
          <div className="flex justify-between text-xs text-gray-500">
            <span>
              {message ? `${message.length} characters` : "No message typed"}
            </span>

            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              Ready to send
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBoxModal;
