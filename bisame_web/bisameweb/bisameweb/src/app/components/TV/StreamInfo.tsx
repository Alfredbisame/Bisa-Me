import React from 'react';

interface StreamInfoProps {
  isLive: boolean;
  viewCount: number;
  channelName?: string;
}

const StreamInfo: React.FC<StreamInfoProps> = ({ 
  isLive, 
  viewCount, 
  channelName = "Bisame TV" 
}) => {
  // Show stream info if live or if we have a view count (stream might be loading)
  if (!isLive && viewCount === 0) return null;

  return (
    <div className="mt-4 px-4">
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {isLive && (
              <>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm">Live Now</span>
                </div>
                <span className="text-gray-400 text-sm">•</span>
              </>
            )}
            {viewCount > 0 && (
              <span className="text-gray-300 text-sm">
                {viewCount.toLocaleString()} viewers
              </span>
            )}
          </div>
          <div className="text-gray-400 text-sm">
            {channelName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamInfo;
