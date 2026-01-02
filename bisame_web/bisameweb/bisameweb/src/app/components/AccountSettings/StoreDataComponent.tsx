'use client';

import StoreDisplay from '../Dashboard/StoreDisplay/StoreDisplay';
import { useAccountData } from './useAccountData';

const StoreDataComponent = () => {
  const { data, loading, error } = useAccountData();

  // Default store data as fallback
  const defaultStoreData = {
    images: [
      '/s9.png',
      '/s10.png',
      '/f10.png',
      '/s21.png',
      '/s22.png',
    ],
    address: {
      storeName: "Alfred's Electronics Store",
      location: "Achimota ABC, Word No. 04, Road No. 13/x, House no. 1320/C, Flat No. 5D, ABC, Ghana",
      closeLandmark: "Near Melcom, opposite to GT Bank",
      phoneNumber: "+233 554572904"
    }
  };

  // Use API data if available, otherwise fall back to defaults
  const storeData = data?.shop && data.shop.length > 0 ? {
    images: data.image && data.image.length > 0 
      ? data.image.map(img => img.image_link)
      : defaultStoreData.images,
    address: {
      storeName: data.shop[0].name || defaultStoreData.address.storeName,
      location: data.shop[0].location || defaultStoreData.address.location,
      closeLandmark: data.shop[0].landmark || defaultStoreData.address.closeLandmark,
      phoneNumber: data.shop[0].phone || defaultStoreData.address.phoneNumber
    }
  } : defaultStoreData;

  if (loading) {
    return (
      <div className="store-section">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="store-section">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-center text-red-600">
            <p>Error loading store information: {error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="store-section">
      <StoreDisplay storeData={storeData} />
    </div>
  );
};

export default StoreDataComponent;
