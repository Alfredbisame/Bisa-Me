import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

interface PurchaseHistoryHeaderProps {
  total: number;
}

const PurchaseHistoryHeader: React.FC<PurchaseHistoryHeaderProps> = ({ total }) => (
  <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-orange-100">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-orange-500 rounded-lg">
        <FaShoppingCart className="text-white text-lg" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-800">Purchase History</h2>
        <p className="text-sm text-gray-600">Total {total} purchases</p>
      </div>
    </div>
  </div>
);

export default PurchaseHistoryHeader; 