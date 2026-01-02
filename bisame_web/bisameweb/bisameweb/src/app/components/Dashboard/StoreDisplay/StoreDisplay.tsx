'use client';

import { useState } from 'react';
import StoreImageGallery from './StoreImageGallery';
import StoreAddressCard from './StoreAddressCard';
import DisplayTabs from './DisplayTabs';

interface StoreData {
  images: string[];
  address: {
    storeName: string;
    location: string;
    closeLandmark: string;
    phoneNumber: string;
  };
}

interface StoreDisplayProps {
  storeData: StoreData;
}

const StoreDisplay = ({ storeData }: StoreDisplayProps) => {
  const [activeView, setActiveView] = useState<'gallery' | 'info'>('gallery');

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-6 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Store Information</h2>
        <p className="text-gray-600">View your store images and address details</p>
      </div>

      {/* Navigation Tabs */}
      <DisplayTabs 
        activeView={activeView} 
        onViewChange={setActiveView} 
      />

      {/* Content Area */}
      <div className="p-6">
        {activeView === 'gallery' ? (
          <StoreImageGallery images={storeData.images} />
        ) : (
          <StoreAddressCard address={storeData.address} />
        )}
      </div>
    </div>
  );
};

export default StoreDisplay;
