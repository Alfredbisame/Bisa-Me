import { ArrowRight, Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  isEnabled: boolean;
  isLoading?: boolean;
  text?: string;
  onClick?: () => void;
}

const SubmitButton = ({ 
  isEnabled, 
  isLoading = false, 
  text = "Next",
  onClick 
}: SubmitButtonProps) => {
  return (
    <button
      type="button"
      disabled={!isEnabled || isLoading}
      onClick={onClick}
      className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
        isEnabled && !isLoading
          ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.01]'
          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
      }`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          <span>{text}</span>
          {isEnabled && <ArrowRight className="w-4 h-4" />}
        </>
      )}
    </button>
  );
};

export default SubmitButton;
