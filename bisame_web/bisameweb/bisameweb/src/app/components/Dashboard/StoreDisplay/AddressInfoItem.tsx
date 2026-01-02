import { ReactNode } from 'react';

interface AddressInfoItemProps {
  icon: ReactNode;
  label: string;
  value: string;
  bgColor: string;
  borderColor: string;
}

const AddressInfoItem = ({ icon, label, value, bgColor, borderColor }: AddressInfoItemProps) => {
  return (
    <div className={`${bgColor} ${borderColor} border rounded-xl p-6 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
            {label}
          </p>
          <p className="text-lg font-medium text-gray-800 leading-relaxed break-words">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddressInfoItem;
