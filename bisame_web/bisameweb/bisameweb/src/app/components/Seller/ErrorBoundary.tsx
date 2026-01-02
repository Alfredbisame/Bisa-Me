'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';

interface ErrorBoundaryProps {
  error?: string;
  onRetry?: () => void;
  showBackButton?: boolean;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  error = 'Something went wrong',
  onRetry,
  showBackButton = true
}) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="text-red-500 text-6xl mb-4">
          <FaExclamationTriangle className="mx-auto" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleRetry}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors font-medium"
          >
            Try Again
          </button>
          
          {showBackButton && (
            <button
              onClick={handleGoBack}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
            >
              <FaArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;
