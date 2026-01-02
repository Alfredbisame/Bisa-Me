"use client";
import { FaWhatsapp, FaSms, FaSpinner } from "react-icons/fa";

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (method: 'whatsapp' | 'sms') => void;
  isLoading?: boolean;
}

const VerificationModal: React.FC<VerificationModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelect, 
  isLoading = false 
}) => {
  if (!isOpen) return null;

  const handleMethodSelect = (method: 'whatsapp' | 'sms') => {
    if (!isLoading) {
      onSelect(method);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 transform transition-all">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Verification Method
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Choose how you want to receive your verification code
        </p>
        
        <div className="space-y-4">
          <button
            onClick={() => handleMethodSelect('whatsapp')}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white p-4 rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <FaSpinner className="animate-spin text-xl" />
            ) : (
              <FaWhatsapp className="text-2xl" />
            )}
            <span className="font-semibold text-center">
              {isLoading ? 'Sending...' : 'WhatsApp'}
            </span>
          </button>
  
          <button
            onClick={() => handleMethodSelect('sms')}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 bg-blue-700 hover:bg-blue-800 disabled:bg-blue-300 text-white p-4 rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <FaSpinner className="animate-spin text-xl" />
            ) : (
              <FaSms className="text-2xl" />
            )}
            <span className="font-semibold text-center">
              {isLoading ? 'Sending...' : 'SMS'}
            </span>
          </button>
        </div>
  
        <button
          onClick={handleClose}
          disabled={isLoading}
          className="mt-6 w-full text-orange-500 hover:text-orange-600 disabled:text-orange-300 font-medium disabled:cursor-not-allowed"
        >
          {isLoading ? 'Please wait...' : 'Cancel'}
        </button>
      </div>
    </div>
  );  
};

export default VerificationModal;
