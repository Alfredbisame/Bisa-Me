import { FaExclamationTriangle } from 'react-icons/fa';

interface AffiliateErrorStateProps {
  error: string;
}

const AffiliateErrorState = ({ error }: AffiliateErrorStateProps) => {
  return (
    <div className="p-12 text-center">
      <div className="flex flex-col items-center">
        <FaExclamationTriangle className="h-12 w-12 text-red-400 mb-4" />
        <h3 className="text-sm font-medium text-gray-900 mb-1">Error loading affiliates</h3>
        <p className="text-sm text-gray-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default AffiliateErrorState; 