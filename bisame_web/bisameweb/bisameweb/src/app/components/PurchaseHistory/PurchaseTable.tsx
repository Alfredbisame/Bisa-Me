import React from 'react';
import { PurchaseRecord } from './types';
import PurchaseTableRow from './PurchaseTableRow';

interface PurchaseTableProps {
  data: PurchaseRecord[];
}

const PurchaseTable: React.FC<PurchaseTableProps> = ({ data }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Invoice ID
          </th>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Amount
          </th>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Date & Time
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((record, index) => (
          <PurchaseTableRow key={index} record={record} />
        ))}
      </tbody>
    </table>
  </div>
);

export default PurchaseTable; 