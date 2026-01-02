import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface PurchasePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalResults: number;
  itemsPerPage: number;
}

const PurchasePagination: React.FC<PurchasePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalResults,
  itemsPerPage,
}) => (
  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-600">
        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalResults)} of {totalResults} results
      </div>
      <nav className="inline-flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className={`p-2 rounded-full border transition-all duration-200 ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
              : 'bg-white text-orange-600 border-orange-300 hover:bg-orange-50 hover:border-orange-400'
          }`}
          disabled={currentPage === 1}
        >
          <FaArrowLeft size={12} />
        </button>
        <div className="flex gap-1">
          {[...Array(Math.min(totalPages, 5))].map((_, index) => {
            let pageNumber;
            if (totalPages <= 5) {
              pageNumber = index + 1;
            } else if (currentPage <= 3) {
              pageNumber = index + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNumber = totalPages - 4 + index;
            } else {
              pageNumber = currentPage - 2 + index;
            }
            return (
              <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className={`w-10 h-10 rounded-full border transition-all duration-200 text-sm font-medium ${
                  currentPage === pageNumber
                    ? 'bg-orange-500 text-white border-orange-500 shadow-lg scale-105'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600'
                }`}
              >
                {String(pageNumber).padStart(2, '0')}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className={`p-2 rounded-full border transition-all duration-200 ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
              : 'bg-white text-orange-600 border-orange-300 hover:bg-orange-50 hover:border-orange-400'
          }`}
          disabled={currentPage === totalPages}
        >
          <FaArrowRight size={12} />
        </button>
      </nav>
    </div>
  </div>
);

export default PurchasePagination; 