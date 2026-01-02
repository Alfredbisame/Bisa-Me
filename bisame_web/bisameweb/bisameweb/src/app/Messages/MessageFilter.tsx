import React from 'react';

interface MessageFilterProps {
  activeFilter: 'all' | 'unread' | 'active' | 'closed';
  onFilterChange: (filter: 'all' | 'unread' | 'active' | 'closed') => void;
}

const MessageFilter: React.FC<MessageFilterProps> = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { key: 'all' as const, label: 'All', count: 12 },
    { key: 'unread' as const, label: 'Unread', count: 3 },
    { key: 'active' as const, label: 'Active', count: 8 },
    { key: 'closed' as const, label: 'Closed', count: 4 }
  ];

  return (
    <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`
            flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors
            ${activeFilter === filter.key
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
            }
          `}
        >
          <span>{filter.label}</span>
          {filter.count > 0 && (
            <span className={`
              ml-2 px-2 py-0.5 text-xs rounded-full
              ${activeFilter === filter.key
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-200 text-gray-600'
              }
            `}>
              {filter.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default MessageFilter;
