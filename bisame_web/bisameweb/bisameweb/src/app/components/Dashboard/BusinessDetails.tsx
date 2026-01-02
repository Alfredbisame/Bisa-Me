'use client';

import { useState } from 'react';
import UpdateBusinessModal from './UpdateBusinessModal/UpdateBusinessModal';

const BusinessDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="p-8 rounded-lg">
        <h2 className="md:text-lg font-semibold mb-4 pb-2 border-b border-gray-200 text-blue-500">
          BUSINESS DETAILS
        </h2>
        <div className="space-y-3">
          <p className="font-semibold text-gray-800 text-sm md:text-base">Kevin Gilbert</p>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            East Tejturi Bazar, Word No. 04, Road No. 13/x, House no. 1320/C, Flat No. 5D, Dhaka-1200, Bangladesh
          </p>
          <p className="text-gray-600 text-sm md:text-base">
            <span className="font-medium text-blue-500">Phone Number:</span> +1-202-555-0118
          </p>
          <p className="text-gray-600 text-sm md:text-base">
            <span className="font-medium text-blue-500">Email:</span> kevin.gilbert@gmail.com
          </p>
          <button 
            onClick={openModal}
            className="border-2 border-blue-500 text-blue-500 text-sm px-6 py-1 md:py-2 
                       rounded-lg mt-4 hover:bg-blue-500 hover:text-white 
                       transition-all duration-300 ease-in-out font-medium
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                       transform hover:scale-105"
          >
            UPDATE BUSINESS
          </button>
        </div>
      </div>

      <UpdateBusinessModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </>
  );
};

export default BusinessDetails;
