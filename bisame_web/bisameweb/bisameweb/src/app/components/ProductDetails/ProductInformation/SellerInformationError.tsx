import React from 'react';

interface SellerInformationErrorProps {
  message?: string;
}

const SellerInformationError: React.FC<SellerInformationErrorProps> = ({ 
  message = "Failed to load seller information." 
}) => {
  return (
    <div className="lg:col-span-1 lg:border-l lg:pl-8 border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Seller Information</h2>
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600 text-sm">{message}</p>
      </div>
    </div>
  );
};

export default SellerInformationError;
