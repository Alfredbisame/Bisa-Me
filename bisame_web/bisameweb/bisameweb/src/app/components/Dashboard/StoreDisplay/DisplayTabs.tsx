import { Images, MapPin } from 'lucide-react';

interface DisplayTabsProps {
  activeView: 'gallery' | 'info';
  onViewChange: (view: 'gallery' | 'info') => void;
}

const DisplayTabs = ({ activeView, onViewChange }: DisplayTabsProps) => {
  return (
    <div className="flex border-b border-gray-100 bg-gray-50">
      <button
        onClick={() => onViewChange('gallery')}
        className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-300 ${
          activeView === 'gallery'
            ? 'border-b-3 border-blue-500 text-blue-600 bg-white shadow-sm'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        }`}
      >
        <div className="flex items-center justify-center space-x-2">
          <Images className="w-5 h-5" />
          <span>Store Gallery</span>
        </div>
      </button>
      <button
        onClick={() => onViewChange('info')}
        className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-300 ${
          activeView === 'info'
            ? 'border-b-3 border-orange-500 text-orange-600 bg-white shadow-sm'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        }`}
      >
        <div className="flex items-center justify-center space-x-2">
          <MapPin className="w-5 h-5" />
          <span>Store Info</span>
        </div>
      </button>
    </div>
  );
};

export default DisplayTabs;
