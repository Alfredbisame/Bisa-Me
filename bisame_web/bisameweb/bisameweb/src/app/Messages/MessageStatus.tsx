import React from 'react';

interface MessageStatusProps {
  status: 'sent' | 'delivered' | 'read';
  className?: string;
}

const MessageStatus: React.FC<MessageStatusProps> = ({ status, className = '' }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'sent':
        return 'text-gray-400';
      case 'delivered':
        return 'text-gray-500';
      case 'read':
        return 'text-blue-500';
      default:
        return 'text-gray-400';
    }
  };

  const renderIcon = () => {
    if (status === 'sent') {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      );
    }

    return (
      <div className="flex -space-x-1">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    );
  };

  return (
    <div className={`${getStatusColor()} ${className}`}>
      {renderIcon()}
    </div>
  );
};

export default MessageStatus;
