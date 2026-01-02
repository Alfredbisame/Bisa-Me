import React from 'react';

interface LoadMoreButtonProps {
  onClick: () => void;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick }) => (
  <div className="mt-6 flex justify-center">
    <button
      className="text-orange-500 border border-orange-500 px-4 py-2 rounded-md hover:bg-orange-50 transition-colors"
      onClick={onClick}
    >
      Load More Reviews
    </button>
  </div>
);

export default LoadMoreButton;