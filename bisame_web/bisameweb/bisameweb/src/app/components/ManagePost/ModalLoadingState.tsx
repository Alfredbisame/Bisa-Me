import React from "react";
import LoadingSpinner from "../Forms/OtherFields/LoadingSpinner";

const ModalLoadingState: React.FC = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fadeIn">
    <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 p-6 flex flex-col items-center">
      <LoadingSpinner size="lg" color="orange" />
      <p className="text-gray-500 text-sm mt-4">Loading product data...</p>
    </div>
  </div>
);

export default ModalLoadingState;
