"use client";
import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageInfo?: boolean;
  totalItems?: number;
  itemsPerPage?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showPageInfo = false,
  totalItems = 0,
  itemsPerPage = 10
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    // Calculate the range of pages to show around current page
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    // Add first page and dots if necessary
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    // Add the calculated range
    rangeWithDots.push(...range);

    // Add last page and dots if necessary
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center space-y-4 mt-8">
      {/* Pagination Controls */}
      <nav
        aria-label="Pagination"
        className="flex justify-center items-center space-x-2"
      >
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-200 ${
            currentPage === 1
              ? 'border-gray-200 text-gray-400 cursor-not-allowed opacity-50'
              : 'border-orange-400 text-orange-400 hover:bg-orange-50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50'
          }`}
          aria-label="Go to previous page"
        >
          <FaArrowLeft className="w-4 h-4" />
        </button>

        {/* Page Numbers */}
        {getVisiblePages().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="flex items-center justify-center w-10 h-10 text-gray-400 select-none">
                ...
              </span>
            ) : (
              <button
                onClick={() => handlePageChange(page as number)}
                className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all duration-200 ${
                  currentPage === page
                    ? 'bg-orange-400 text-white shadow-lg scale-105 ring-2 ring-orange-400 ring-opacity-30'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50'
                }`}
                aria-current={currentPage === page ? 'page' : undefined}
                aria-label={`Go to page ${page}`}
              >
                {String(page).padStart(2, '0')}
              </button>
            )}
          </React.Fragment>
        ))}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-200 ${
            currentPage === totalPages
              ? 'border-gray-200 text-gray-400 cursor-not-allowed opacity-50'
              : 'border-orange-400 text-orange-400 hover:bg-orange-50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50'
          }`}
          aria-label="Go to next page"
        >
          <FaArrowRight className="w-4 h-4" />
        </button>
      </nav>

      {/* Page Info */}
      {showPageInfo && totalItems > 0 && (
        <div className="text-sm text-gray-500 text-center">
          <span className="font-medium">
            Showing {startItem.toLocaleString()} to {endItem.toLocaleString()} of{' '}
            {totalItems.toLocaleString()} results
          </span>
        </div>
      )}

      {/* Quick Jump (for large datasets) */}
      {totalPages > 10 && (
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-600">Jump to:</span>
          <select
            value={currentPage}
            onChange={(e) => handlePageChange(Number(e.target.value))}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
            aria-label="Jump to page"
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <option key={page} value={page}>
                Page {page}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Pagination;
