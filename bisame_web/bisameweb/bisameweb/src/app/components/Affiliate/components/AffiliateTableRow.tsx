import { AffiliateUser } from '../types';
import { getImageUrl } from '../../ProductDetails/utils/imageUtils';
import Image from 'next/image';

interface AffiliateTableRowProps {
  affiliate: AffiliateUser;
  imgSrcMap: Record<string, string>;
  onImageError: (affiliateName: string) => void;
  index: number;
}

const AffiliateTableRow = ({ affiliate, imgSrcMap, onImageError, index }: AffiliateTableRowProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <tr
      className={
        index % 2 === 0
          ? 'bg-white hover:bg-orange-100/40 transition-colors duration-150'
          : 'bg-orange-50 hover:bg-orange-100/60 transition-colors duration-150'
      }
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            {affiliate.profile ? (
              <Image
                src={imgSrcMap[affiliate.name] || getImageUrl(affiliate.profile, 40, 40)}
                alt={affiliate.name}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
                onError={() => onImageError(affiliate.name)}
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {getInitials(affiliate.name)}
                </span>
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-600"></span>
              {affiliate.name}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 font-medium">{affiliate.datetime}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          affiliate.status.toLowerCase() === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-orange-100 text-orange-800'
        }`}>
          {affiliate.status}
        </span>
      </td>
    </tr>
  );
};

export default AffiliateTableRow; 