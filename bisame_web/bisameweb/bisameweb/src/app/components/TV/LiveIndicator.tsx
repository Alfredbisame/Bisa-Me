import React from 'react';

interface LiveIndicatorProps {
  isLive: boolean;
  viewCount?: number;
  showViewCount?: boolean;
}

const LiveIndicator: React.FC<LiveIndicatorProps> = ({ 
  isLive, 
  viewCount = 0, 
  showViewCount = true 
}) => {
  // Show view count even if not live yet (stream might be loading)
  if (!isLive && viewCount === 0) return null;

  return (
    <div className="flex items-center space-x-4">
      {isLive && (
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-red-500 font-semibold text-sm">LIVE</span>
        </div>
      )}
      {showViewCount && viewCount > 0 && (
        <div className="text-gray-300 text-sm">
          {viewCount.toLocaleString()} watching
        </div>
      )}
    </div>
  );
};

export default LiveIndicator;
