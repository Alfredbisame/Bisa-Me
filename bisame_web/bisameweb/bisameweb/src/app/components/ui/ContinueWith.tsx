import React from "react";

interface ContinueWithProps {
  style?: string;
}

const ContinueWith: React.FC<ContinueWithProps> = ({ style }) => {
  return (
    <div className={`flex items-center gap-2 ${style}`}>
      <span className="left w-1/3 h-[0.5px] bg-gray-300"></span>
      <span className="text-xs flex-grow text-gray-500">Or continue with</span>
      <span className="right w-1/3 h-[0.5px] bg-gray-300"></span>
    </div>
  );
};

export default ContinueWith;
