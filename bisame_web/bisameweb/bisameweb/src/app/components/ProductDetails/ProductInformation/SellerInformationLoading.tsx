import React from 'react';

const SellerInformationLoading: React.FC = () => {
  return (
    <div className="lg:col-span-1 lg:border-l lg:pl-8 border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Seller Information</h2>
      <div className="animate-pulse">
        <div className="flex items-center mb-6">
          <div className="rounded-full bg-gray-200 h-14 w-14 mr-4"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
        <div className="h-10 bg-gray-200 rounded-lg w-full mb-4"></div>
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 rounded-lg w-full"></div>
          <div className="h-8 bg-gray-200 rounded-lg w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SellerInformationLoading;
