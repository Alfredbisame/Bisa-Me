"use client";

import { FiRefreshCw, FiAlertCircle, FiWifi, FiServer } from "react-icons/fi";

interface ErrorStateProps {
  onRetry: () => void;
  isRetrying?: boolean;
  error?: Error;
  retryCount?: number;
}

const ErrorState: React.FC<ErrorStateProps> = ({ 
  onRetry, 
  isRetrying = false, 
  error,
  retryCount = 0 
}) => {
  const getErrorIcon = () => {
    if (error?.message.includes('timeout') || error?.message.includes('network')) {
      return <FiWifi className="text-red-500 text-6xl" />;
    }
    if (error?.message.includes('server') || error?.message.includes('500')) {
      return <FiServer className="text-red-500 text-6xl" />;
    }
    return <FiAlertCircle className="text-red-500 text-6xl" />;
  };

  const getErrorMessage = () => {
    if (error?.message.includes('timeout')) {
      return {
        title: "Connection Timeout",
        description: "The request took too long to complete. Please check your internet connection and try again."
      };
    }
    if (error?.message.includes('network')) {
      return {
        title: "Network Error",
        description: "Unable to connect to the server. Please check your internet connection."
      };
    }
    if (error?.message.includes('404')) {
      return {
        title: "No Products Found",
        description: "We couldn't find any related products for this category."
      };
    }
    return {
      title: "Failed to load related products",
      description: "Something went wrong while fetching the products. Please try again."
    };
  };

  const { title, description } = getErrorMessage();

  return (
    <div className="max-w-8xl mx-auto p-2 sm:px-6 md:px-52 lg:px-52">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Related Products</h2>
      <div className="text-center py-12">
        <div className="flex flex-col items-center space-y-4">
          {getErrorIcon()}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-gray-600 text-sm max-w-md">{description}</p>
            {retryCount > 0 && (
              <p className="text-xs text-gray-500">
                Retry attempt: {retryCount}/3
              </p>
            )}
          </div>
          <button
            onClick={onRetry}
            disabled={isRetrying}
            className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            <FiRefreshCw className={`text-sm ${isRetrying ? 'animate-spin' : ''}`} />
            <span>{isRetrying ? 'Retrying...' : 'Try Again'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
