import React from 'react';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import { SearchButtonProps } from '../types';

const SearchButton: React.FC<SearchButtonProps> = ({
  isLoading,
  disabled,
}) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`
        absolute right-0 top-0 mt-3 mr-4
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-200
      `}
      aria-label="Search button"
    >
      {isLoading ? (
        <FaSpinner className="text-orange-500 animate-spin" />
      ) : (
        <FaSearch className="text-gray-500 hover:text-orange-500" />
      )}
    </button>
  );
};

export default SearchButton;
