'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ChatNotificationProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'header' | 'sidebar';
  onUnauthorizedClick?: () => void;
}

const ChatNotification: React.FC<ChatNotificationProps> = ({
  className = '',
  size = 'md',
  variant = 'default',
  onUnauthorizedClick
}) => {
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(3); // Mock unread count
  const [isHovered, setIsHovered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mock function to simulate receiving new messages
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new messages (for demo purposes)
      if (Math.random() > 0.8) {
        setUnreadCount(prev => prev + 1);
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Check login status only on client - following MiddleNav pattern
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');
      setIsLoggedIn(!!token || !!userId);
    };
    
    checkLoginStatus();
    
    // Listen for storage changes to update login status
    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);

  // Handle click with authentication check - following MiddleNav pattern
  const handleClick = () => {
    if (isLoggedIn) {
      router.push('/dashboard/chat-messages');
    } else {
      // Call the callback to show sign-in modal or handle unauthorized access
      onUnauthorizedClick?.();
    }
  };

  // Size configurations
  const sizeConfig = {
    sm: {
      icon: 'w-5 h-5',
      button: 'p-2',
      badge: 'w-4 h-4 text-xs',
      badgeOffset: '-top-1 -right-1'
    },
    md: {
      icon: 'w-6 h-6',
      button: 'p-2.5',
      badge: 'w-5 h-5 text-xs',
      badgeOffset: '-top-2 -right-2'
    },
    lg: {
      icon: 'w-7 h-7',
      button: 'p-3',
      badge: 'w-6 h-6 text-sm',
      badgeOffset: '-top-2 -right-2'
    }
  };

  // Variant configurations
  const variantConfig = {
    default: {
      button: 'bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 shadow-sm',
      badge: 'bg-red-500 text-white'
    },
    header: {
      button: 'bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-800',
      badge: 'bg-red-500 text-white'
    },
    sidebar: {
      button: 'bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200',
      badge: 'bg-orange-500 text-white'
    }
  };

  const currentSize = sizeConfig[size];
  const currentVariant = variantConfig[variant];

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative rounded-lg transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
          ${currentSize.button}
          ${currentVariant.button}
          ${isHovered ? 'transform scale-105' : ''}
        `}
        aria-label={`Chat messages ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
        title={`Chat Messages ${unreadCount > 0 ? `- ${unreadCount} unread messages` : ''}`}
      >
        {/* Chat Icon */}
        <svg
          className={`${currentSize.icon} transition-colors duration-200`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>

        {/* Notification Badge */}
        {unreadCount > 0 && (
          <span
            className={`
              absolute flex items-center justify-center rounded-full font-bold leading-none
              ${currentSize.badge}
              ${currentSize.badgeOffset}
              ${currentVariant.badge}
              animate-pulse
            `}
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}

        {/* Pulse animation for new messages */}
        {unreadCount > 0 && (
          <span
            className={`
              absolute rounded-full opacity-75 animate-ping
              ${currentSize.badge}
              ${currentSize.badgeOffset}
              ${currentVariant.badge}
            `}
          />
        )}
      </button>

      {/* Tooltip on hover */}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-sm text-white bg-gray-800 rounded-lg whitespace-nowrap z-50">
          {unreadCount > 0 
            ? `${unreadCount} unread message${unreadCount !== 1 ? 's' : ''}`
            : 'Chat Messages'
          }
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800" />
        </div>
      )}
    </div>
  );
};

export default ChatNotification;
