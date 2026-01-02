import React, { useEffect, useRef } from 'react';

interface MessageContextMenuProps {
  isOpen: boolean;
  position: { x: number; y: number };
  onClose: () => void;
  onReply: () => void;
  onCopy: () => void;
  onDelete: () => void;
  onForward: () => void;
  isOwnMessage: boolean;
}

const MessageContextMenu: React.FC<MessageContextMenuProps> = ({
  isOpen,
  position,
  onClose,
  onReply,
  onCopy,
  onDelete,
  onForward,
  isOwnMessage
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const menuItems = [
    { label: 'Reply', action: onReply, icon: '↩️' },
    { label: 'Copy', action: onCopy, icon: '📋' },
    { label: 'Forward', action: onForward, icon: '➡️' },
    ...(isOwnMessage ? [{ label: 'Delete', action: onDelete, icon: '🗑️', danger: true }] : [])
  ];

  return (
    <div
      ref={menuRef}
      className="fixed bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 min-w-[140px]"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      {menuItems.map((item) => (
        <button
          key={item.label}
          onClick={() => {
            item.action();
            onClose();
          }}
          className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 ${
            item.danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'
          }`}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MessageContextMenu;
