"use client";

import { FC } from 'react';

interface ErrorDisplayProps {
  error?: Error | null;
  onRetry: () => void;
}

const ErrorDisplay: FC<ErrorDisplayProps> = ({ error, onRetry }) => {
  const getErrorMessage = () => {
    if (error) {
      return 'Failed to load product details. Please try again later.';
    }
    return 'Product not found';
  };

  return (
    <div className="max-w-8xl mx-auto p-4 px-52">
      <div className="text-red-500 text-center py-8">
        <p>{getErrorMessage()}</p>
        <button
          onClick={onRetry}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorDisplay;
