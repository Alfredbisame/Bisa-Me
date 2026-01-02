import React from 'react';
import { FaSearch } from 'react-icons/fa';

const NoLocationsFound: React.FC = () => (
  <div className="text-center py-12 text-gray-500">
    <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
      <FaSearch className="mx-auto text-gray-300 text-3xl mb-4" />
      <p className="text-lg font-medium">No locations found</p>
      <p className="text-sm text-gray-400 mt-1">Try adjusting your search terms</p>
    </div>
  </div>
);

export default NoLocationsFound; 