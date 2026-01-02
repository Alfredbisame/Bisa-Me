'use client';

import React from 'react';

interface QuickMessageButtonProps {
  message: string;
  onClick: (message: string) => void;
  variant?: 'primary' | 'secondary';
  isActive?: boolean;
  isDisabled?: boolean;
}

const QuickMessageButton: React.FC<QuickMessageButtonProps> = ({
  message,
  onClick,
  variant = 'primary',
  isActive = false,
  isDisabled = false
}) => {
  const baseClasses = `
    inline-flex items-center justify-center
    rounded-full px-4 py-2 text-sm font-medium
    whitespace-nowrap cursor-pointer select-none
    transition-all duration-200 ease-in-out
    transform hover:scale-105 active:scale-95
    focus:outline-none focus:ring-2 focus:ring-offset-2
    shadow-sm hover:shadow-md
  `;

  const getVariantClasses = () => {
    if (isDisabled) {
      return "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed hover:scale-100";
    }

    if (isActive) {
      return variant === 'primary' 
        ? "bg-blue-600 text-white border border-blue-600 shadow-lg ring-2 ring-blue-200"
        : "bg-gray-700 text-white border border-gray-700 shadow-lg ring-2 ring-gray-200";
    }

    return variant === 'primary'
      ? `
        bg-white text-blue-600 border border-blue-300
        hover:bg-blue-50 hover:border-blue-500 hover:text-blue-700
        focus:ring-blue-500
      `
      : `
        bg-white text-gray-600 border border-gray-300
        hover:bg-gray-50 hover:border-gray-400 hover:text-gray-700
        focus:ring-gray-500
      `;
  };

  const handleClick = () => {
    if (!isDisabled) {
      onClick(message);
    }
  };

  return (
    <button
      className={`${baseClasses} ${getVariantClasses()}`}
      type="button"
      onClick={handleClick}
      disabled={isDisabled}
      aria-pressed={isActive}
      title={message}
    >
      <span className="relative">
        {message}
        {isActive && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
        )}
      </span>
    </button>
  );
};

export default QuickMessageButton;
