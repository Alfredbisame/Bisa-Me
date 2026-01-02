import { AffiliateUser } from '../types';
import AffiliateTableRow from './AffiliateTableRow';

interface AffiliateTableProps {
  affiliates: AffiliateUser[];
  imgSrcMap: Record<string, string>;
  onImageError: (affiliateName: string) => void;
}

const AffiliateTable = ({ affiliates, imgSrcMap, onImageError }: AffiliateTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <colgroup>
          <col />
          <col />
          <col style={{ width: '120px' }} />
        </colgroup>
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Affiliate
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Date Joined
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {affiliates.map((affiliate, index) => (
            <AffiliateTableRow
              key={index}
              affiliate={affiliate}
              imgSrcMap={imgSrcMap}
              onImageError={onImageError}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AffiliateTable; 