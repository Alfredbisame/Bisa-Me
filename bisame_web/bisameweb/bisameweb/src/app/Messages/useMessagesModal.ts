import { useState, useCallback } from 'react';

export const useMessagesModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [context, setContext] = useState<Record<string, unknown> | null>(null);

  const openMessages = useCallback((initialContext?: Record<string, unknown>) => {
    setIsOpen(true);
    setContext(initialContext || null);
  }, []);
  
  const closeMessages = useCallback(() => {
    setIsOpen(false);
    setContext(null);
  }, []);

  const toggleMessages = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return {
    isOpen,
    context,
    openMessages,
    closeMessages,
    toggleMessages
  };
};