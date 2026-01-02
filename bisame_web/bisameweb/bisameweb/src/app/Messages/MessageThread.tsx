import React from 'react';
import ChatBubble from './ChatBubble';
import TypingIndicator from './TypingIndicator';
import { ChatMessage } from './types';

interface MessageThreadProps {
  messages: ChatMessage[];
  isTyping?: boolean;
  typingUser?: string;
}

const MessageThread: React.FC<MessageThreadProps> = ({ 
  messages, 
  isTyping = false, 
  typingUser 
}) => {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
      {messages.map((message, index) => (
        <div key={message.id} className="group">
          <ChatBubble 
            message={message}
            showAvatar={index === 0 || messages[index - 1].isOwn !== message.isOwn}
          />
        </div>
      ))}
      
      <TypingIndicator isTyping={isTyping} userName={typingUser} />
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageThread;
