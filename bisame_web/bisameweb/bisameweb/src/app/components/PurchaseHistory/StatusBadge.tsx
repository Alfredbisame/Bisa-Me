import React from 'react';
import { PurchaseRecord } from './types';

interface StatusBadgeProps {
  status: PurchaseRecord['status'];
}

const statusStyles = {
  Paid: 'bg-green-200 text-green-800 border-green-300',
  Unpaid: 'bg-amber-200 text-amber-800 border-amber-300',
  FAILED: 'bg-red-200 text-red-800 border-red-300',
  SUCCESSFUL: 'bg-orange-200 text-orange-800 border-orange-300',
  PENDING: 'bg-blue-200 text-blue-800 border-blue-300',
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => (
  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${statusStyles[status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
    {status}
  </span>
);

export default StatusBadge; 