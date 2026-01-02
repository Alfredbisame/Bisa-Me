import { RevenueData, RevenueTotals } from '../types';
import RevenueTableRow from './RevenueTableRow';

interface RevenueTableProps {
  revenueData: RevenueData[];
  totals: RevenueTotals;
}

const RevenueTable = ({ revenueData, totals }: RevenueTableProps) => {
  // Format as ₵1.75 
  const formatCurrency = (amount: number) => `₵${amount.toFixed(2)}`;

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col style={{ width: '160px' }} />
        </colgroup>
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Affiliate
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Direct(2.5%)
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Indirect(0.75%)
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Total
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {revenueData.map((revenue, index) => (
            <RevenueTableRow
              key={revenue.id}
              revenue={revenue}
              index={index}
            />
          ))}
          {/* Summary Row */}
          <tr className="bg-gray-100 font-bold">
            <td className="px-8 py-4 text-gray-700">Total</td>
            <td className="px-6 py-4 text-green-700">{formatCurrency(totals.direct)}</td>
            <td className="px-6 py-4 text-purple-700">{formatCurrency(totals.indirect)}</td>
            <td className="px-6 py-4 text-orange-700">{formatCurrency(totals.direct + totals.indirect)}</td>
            <td className="px-6 py-4 text-blue-700 flex items-center gap-2">
              -
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RevenueTable; 