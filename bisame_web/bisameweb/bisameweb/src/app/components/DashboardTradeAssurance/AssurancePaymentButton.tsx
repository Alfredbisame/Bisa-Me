"use client";
import { useState } from 'react';
import { FaLock, FaRocket } from 'react-icons/fa';

interface AssurancePaymentButtonProps {
  productId: string;
  isPaymentEnabled?: boolean;
  onPaymentClick?: (productId: string) => void;
}

const AssurancePaymentButton = ({ 
  productId, 
  isPaymentEnabled = true, 
  onPaymentClick
}: AssurancePaymentButtonProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleClick = async () => {
    if (!isPaymentEnabled || isProcessing) return;
    
    setIsProcessing(true);
    onPaymentClick?.(productId);
    
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  };
  
  const getButtonContent = () => {
    if (isProcessing) {
      return (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Processing...</span>
        </div>
      );
    }
    
    if (isPaymentEnabled) {
      return (
        <div className="flex items-center justify-center space-x-2">
          <FaRocket className="text-sm" />
          <span>Pay for Assurance</span>
        </div>
      );
    }
    
    return (
      <div className="flex items-center justify-center space-x-2">
        <FaLock className="text-sm" />
        <span>Pay for Assurance</span>
      </div>
    );
  };
  
  const getButtonStyles = () => {
    if (isProcessing) {
      return 'bg-gradient-to-r from-blue-500 to-blue-400 cursor-wait';
    }
    
    if (isPaymentEnabled) {
      return 'bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 hover:from-blue-600 hover:via-blue-500 hover:to-blue-400 shadow-lg hover:shadow-emerald-500/25 transform hover:scale-[1.02] active:scale-[0.98]';
    }
    
    return 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed opacity-75';
  };
  
  return (
    <button
      onClick={handleClick}
      disabled={!isPaymentEnabled || isProcessing}
      className={`
        w-full text-white text-center py-4 rounded-b-xl text-sm font-semibold 
        transition-all duration-300 ease-out backdrop-blur-sm
        ${getButtonStyles()}
      `}
      type="button"
    >
      {getButtonContent()}
    </button>
  );
};

export default AssurancePaymentButton;
