import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';

interface ErrorDisplayProps {
  error?: unknown;
  onRetry?: () => void;
}

const ErrorDisplay = ({ error, onRetry }: ErrorDisplayProps) => {
  let errorMessage = "We couldn't load the product information. Please try again.";
  if (error && typeof error === 'object' && 'message' in error && typeof (error as { message?: unknown }).message === 'string') {
    errorMessage = (error as { message: string }).message;
  }
  return (
    <div className="max-w-8xl mx-auto p-2 px-4 sm:px-6 md:px-12 lg:px-52 mt-8">
      <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <FaExclamationTriangle className="text-red-500 text-6xl" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {errorMessage}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              <FaRedo className="mr-2" />
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
