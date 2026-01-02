import React from 'react';
import { FaStore, FaPlus } from 'react-icons/fa';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Ads Found',
  description = "This seller hasn't posted any ads yet.",
  actionText,
  onAction,
  icon,
  className = ''
}) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="text-gray-400 text-6xl mb-4">
        {icon || <FaStore className="mx-auto" />}
      </div>
      <h3 className="text-xl font-semibold text-gray-600 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">{description}</p>
      
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center gap-2 mx-auto"
        >
          <FaPlus className="w-4 h-4" />
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
