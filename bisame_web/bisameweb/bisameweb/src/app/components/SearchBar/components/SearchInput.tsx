import React, { ChangeEvent } from 'react';
import { SearchInputProps } from '../types';

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onKeyPress,
  placeholder,
  disabled,
  hasError,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleInputChange}
      onKeyDown={onKeyPress}
      placeholder={placeholder}
      disabled={disabled}
      className={`
        w-full p-2 pl-4 pr-10 rounded-md bg-gray-100 text-gray-800 
        focus:outline-none focus:ring- focus:ring-orange-500
        disabled:opacity-50 disabled:cursor-not-allowed
        ${hasError ? 'border-2 border-red-500' : ''}
      `}
      aria-label="Search input"
    />
  );
};

export default SearchInput;
