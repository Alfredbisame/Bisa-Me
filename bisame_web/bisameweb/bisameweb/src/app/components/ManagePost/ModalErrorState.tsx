import React from 'react';

interface ModalErrorStateProps {
  error: Error | string | null;
  onCancel: () => void;
}

const ModalErrorState: React.FC<ModalErrorStateProps> = ({ error, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fadeIn">
    <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 p-6 flex flex-col items-center">
      <p className="text-red-600 font-semibold mb-2">Failed to load product</p>
      <p className="text-gray-500 text-sm max-w-xs text-center">
        {typeof error === 'string' ? error : error instanceof Error ? error.message : 'An unknown error occurred'}
      </p>
      <button
        onClick={onCancel}
        className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
      >
        Close
      </button>
    </div>
  </div>
);

export default ModalErrorState; 