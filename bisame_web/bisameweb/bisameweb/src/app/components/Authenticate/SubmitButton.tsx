import React from "react";
import { FaArrowRight, FaSpinner } from "react-icons/fa";

interface SubmitButtonProps {
  isLoading: boolean;
  text?: string;
  loadingText?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ 
  isLoading, 
  text = "SIGN IN", 
  loadingText = "Signing in..." 
}) => (
  <div className="flex items-center justify-center">
    <button
      type="submit"
      disabled={isLoading}
      className="bg-orange-400 text-sm rounded-lg hover:bg-orange-500 w-full text-white font-semibold py-2 px-6 focus:outline-none flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <>
          <FaSpinner size={10} className="animate-spin" />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          <span>{text}</span>
          <FaArrowRight size={10} />
        </>
      )}
    </button>
  </div>
);

export default SubmitButton; 