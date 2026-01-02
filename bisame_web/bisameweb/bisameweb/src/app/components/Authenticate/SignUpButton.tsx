import React from "react";
import { FaSpinner, FaArrowRight } from "react-icons/fa";

interface SignUpButtonProps {
  isLoading: boolean;
  text?: string;
  loadingText?: string;
}

const SignUpButton: React.FC<SignUpButtonProps> = ({ 
  isLoading, 
  text = "Sign Up", 
  loadingText = "Signing Up..." 
}) => (
  <div className="flex items-center justify-center">
    <button
      type="submit"
      disabled={isLoading}
      className="bg-orange-400 hover:bg-orange-500 w-full  text-white text-xs md:text-sm font-semibold py-2 px-6 rounded focus:outline-none flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <>
          <FaSpinner className="animate-spin" />
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

export default SignUpButton; 