import { Camera, MapPin } from 'lucide-react';

interface TabNavigationProps {
  activeTab: 'images' | 'address';
  onTabChange: (tab: 'images' | 'address') => void;
}

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <div className="flex border-b border-gray-100">
      <button
        onClick={() => onTabChange('images')}
        className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
          activeTab === 'images'
            ? 'border-b-3 border-blue-500 text-blue-500 bg-blue-50'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center justify-center space-x-2">
          <Camera className="w-5 h-5" />
          <span>Store Images</span>
        </div>
      </button>
      <button
        onClick={() => onTabChange('address')}
        className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
          activeTab === 'address'
            ? 'border-b-3 border-orange-500 text-orange-500 bg-orange-50'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center justify-center space-x-2">
          <MapPin className="w-5 h-5" />
          <span>Store Address</span>
        </div>
      </button>
    </div>
  );
};

export default TabNavigation;
