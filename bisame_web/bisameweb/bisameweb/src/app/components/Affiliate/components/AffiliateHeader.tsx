import { FaUserTie } from 'react-icons/fa';

interface AffiliateHeaderProps {
  totalAffiliates: number;
  filteredCount: number;
}

const AffiliateHeader = ({ totalAffiliates, filteredCount }: AffiliateHeaderProps) => {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <FaUserTie className="text-orange-600 text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Affiliates</h2>
            <p className="text-sm text-gray-600">Manage your affiliate partners</p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {filteredCount} of {totalAffiliates} affiliates
        </div>
      </div>
    </div>
  );
};

export default AffiliateHeader; 