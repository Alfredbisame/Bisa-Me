'use client';

import React, { useState, useRef, useEffect } from 'react';

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}

const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  placeholder = "Type your message here...",
  maxLength = 500
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // Could trigger send message here if needed
    }
  };

  return (
    <div className="px-4 pb-4">
      <label 
        htmlFor="message" 
        className="block text-blue-600 text-xs font-semibold mb-2"
      >
        Type a message
      </label>
      <div className="relative">
        <textarea
          ref={textareaRef}
          id="message"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`
            w-full border rounded-lg px-3 py-3 pr-12 resize-none text-sm min-h-[80px] max-h-[120px]
            transition-all duration-200 placeholder-gray-400
            ${isFocused 
              ? 'border-blue-500 ring-2 ring-blue-100 shadow-sm' 
              : 'border-gray-300 hover:border-gray-400'
            }
            focus:outline-none
          `}
        />
        
        {/* Character count */}
        <div className="absolute bottom-2 right-3 flex items-center space-x-2">
          <span className={`text-xs ${value.length > maxLength * 0.8 ? 'text-orange-500' : 'text-gray-400'}`}>
            {value.length}/{maxLength}
          </span>
          
          {/* Status indicator */}
          <span
            className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
