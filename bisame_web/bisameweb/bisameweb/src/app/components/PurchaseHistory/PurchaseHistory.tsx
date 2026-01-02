"use client";
import React, { useState } from 'react';
import { PurchaseRecord } from './types';
import PurchaseHistoryHeader from './PurchaseHistoryHeader';
import PurchaseTable from './PurchaseTable';
import PurchasePagination from './PurchasePagination';
import { usePurchasesData } from './usePurchasesData';

const ITEMS_PER_PAGE = 10;

const PurchaseHistory: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading, error } = usePurchasesData();

  // Handle loading state
  if (loading) {
    return (
      <div className="p-6 mt-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="p-6 mt-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-6">
            <div className="text-center">
              <div className="text-red-500 text-xl mb-2">⚠️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Purchase History</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle empty state
  if (!data || !data.purchases || data.purchases.length === 0) {
    return (
      <div className="p-6 mt-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-6">
            <div className="text-center">
              <div className="text-gray-400 text-4xl mb-4">📦</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Purchase History</h3>
              <p className="text-gray-600">You haven&apos;t made any purchases yet.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Convert API data to PurchaseRecord format
  const purchaseData: PurchaseRecord[] = data.purchases.map(purchase => ({
    invocieID: purchase.invocieID,
    name: purchase.name,
    amount: purchase.amount,
    status: purchase.status as PurchaseRecord['status'],
    datetime: purchase.datetime
  }));

  const totalPages = Math.ceil(purchaseData.length / ITEMS_PER_PAGE);
  const paginatedData = purchaseData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
          <PurchaseHistoryHeader total={purchaseData.length} />
          <PurchaseTable data={paginatedData} />
          <PurchasePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalResults={purchaseData.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;