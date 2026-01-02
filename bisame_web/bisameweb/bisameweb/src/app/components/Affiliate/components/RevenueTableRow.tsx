import { RevenueData } from '../types';

interface RevenueTableRowProps {
  revenue: RevenueData;
  index: number;
}

const RevenueTableRow = ({ revenue, index }: RevenueTableRowProps) => {
  // Format as ₵1.75 (figure only)
  const formatCurrency = (amount: number) => `₵${amount.toFixed(2)}`;

  return (
    <tr
      className={
        index % 2 === 0
          ? 'bg-white hover:bg-orange-100/40 transition-colors duration-150'
          : 'bg-orange-50 hover:bg-orange-100/60 transition-colors duration-150'
      }
    >
      {/* Affiliate */}
      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800 flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-orange-400"></span>
        {revenue.affiliateName}
      </td>
      {/* Direct */}
      <td className="px-6 py-4 whitespace-nowrap text-green-600 font-bold">
        {formatCurrency(revenue.direct)}
      </td>
      {/* Indirect */}
      <td className="px-6 py-4 whitespace-nowrap text-purple-600 font-bold">
        {formatCurrency(revenue.indirect)}
      </td>
      {/* This Month */}
      <td className="px-6 py-4 whitespace-nowrap text-orange-600 font-bold align-middle">
        <div className="flex flex-col items-start">
          <span>{formatCurrency(revenue.total)}</span>
        </div>
      </td>
      {/* Status */}
      <td className="px-6 py-4 whitespace-nowrap font-semibold">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-bold
            ${revenue.status === 'Pending' ? 'bg-orange-100 text-orange-700 border border-orange-300' : ''}
            ${revenue.status === 'Applied' ? 'bg-green-100 text-green-700 border border-green-300' : ''}
            ${revenue.status === 'Expired' ? 'bg-gray-200 text-gray-600 border border-gray-300' : ''}
          `}
        >
          {revenue.status}
        </span>
      </td>
    </tr>
  );
};

export default RevenueTableRow; 