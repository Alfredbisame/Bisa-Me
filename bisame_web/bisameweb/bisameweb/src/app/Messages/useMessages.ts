import { useState, useCallback } from 'react';
import { Message, ChatMessage } from './types';

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [message, ...prev]);
  }, []);

  const updateMessage = useCallback((messageId: string, updates: Partial<Message>) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, ...updates } : msg
      )
    );
  }, []);

  const addChatMessage = useCallback((chatMessage: ChatMessage) => {
    setChatMessages(prev => [...prev, chatMessage]);
  }, []);

  const markAsRead = useCallback((messageId: string) => {
    updateMessage(messageId, { isRead: true });
  }, [updateMessage]);

  const selectMessage = useCallback((message: Message) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      markAsRead(message.id);
    }
  }, [markAsRead]);

  return {
    messages,
    chatMessages,
    selectedMessage,
    addMessage,
    updateMessage,
    addChatMessage,
    selectMessage,
    setChatMessages
  };
};
