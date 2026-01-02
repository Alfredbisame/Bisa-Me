import React, { useState } from 'react';

interface MessageActionsProps {
  messageId: string;
  onReply?: (messageId: string) => void;
  onDelete?: (messageId: string) => void;
  onCopy?: (messageId: string) => void;
  onForward?: (messageId: string) => void;
}

const MessageActions: React.FC<MessageActionsProps> = ({
  messageId,
  onReply,
  onDelete,
  onCopy,
  onForward
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { label: 'Reply', icon: '↩️', action: onReply },
    { label: 'Copy', icon: '📋', action: onCopy },
    { label: 'Forward', icon: '➡️', action: onForward },
    { label: 'Delete', icon: '🗑️', action: onDelete, danger: true }
  ].filter(action => action.action);

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded"
      >
        <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 min-w-[120px]">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={() => handleAction(() => action.action!(messageId))}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 ${
                action.danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'
              }`}
            >
              <span>{action.icon}</span>
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageActions;
