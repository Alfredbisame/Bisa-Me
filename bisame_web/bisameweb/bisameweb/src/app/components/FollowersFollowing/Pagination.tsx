import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  followersTotalCount?: number;
  followingTotalCount?: number;
  activeTab?: 'followers' | 'following';
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  followersTotalCount = 0,
  followingTotalCount = 0,
  activeTab = 'followers'
}) => {
  if (totalPages <= 1) return null;

  const totalCount = activeTab === 'followers' ? followersTotalCount : followingTotalCount;

  return (
    <div className="col-span-full flex justify-center items-center mt-6 space-x-2">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md ${
          currentPage === 1 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Previous
      </button>
      
      <span className="text-gray-600">
        Page {currentPage} of {totalPages} ({totalCount} total)
      </span>
      
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md ${
          currentPage === totalPages 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;