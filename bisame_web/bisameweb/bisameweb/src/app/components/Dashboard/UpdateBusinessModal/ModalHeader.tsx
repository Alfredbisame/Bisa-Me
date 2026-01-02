import { X, Building2 } from 'lucide-react';

interface ModalHeaderProps {
  onClose: () => void;
}

const ModalHeader = ({ onClose }: ModalHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-100">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-orange-500 rounded-lg">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Update Business</h2>
      </div>
      <button
        onClick={onClose}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <X className="w-6 h-6 text-gray-500" />
      </button>
    </div>
  );
};

export default ModalHeader;
