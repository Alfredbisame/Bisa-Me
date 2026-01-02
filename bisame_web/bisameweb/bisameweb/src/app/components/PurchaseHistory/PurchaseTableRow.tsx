import React from 'react';
import { PurchaseRecord } from './types';
import StatusBadge from './StatusBadge';

interface PurchaseTableRowProps {
  record: PurchaseRecord;
}

const formatDateTime = (dateTimeString: string) => {
  try {
    const date = new Date(dateTimeString);
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    const time = date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    return `${month} ${day}, ${year} ${time}`;
  } catch (error) {
    console.error('Error formatting date time:', error);
    return dateTimeString; // Fallback to original string if parsing fails
  }
};

const PurchaseTableRow: React.FC<PurchaseTableRowProps> = ({ record }) => (
  <tr className="hover:bg-gray-50 transition-colors duration-200 group">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center">
            <span className="text-white font-medium text-sm">
              {record.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">{record.name}</div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded">
        {record.invocieID}
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">
        <div className="font-semibold text-green-600">₵{record.amount}</div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <StatusBadge status={record.status} />
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-700">{formatDateTime(record.datetime)}</div>
    </td>
  </tr>
);

export default PurchaseTableRow;