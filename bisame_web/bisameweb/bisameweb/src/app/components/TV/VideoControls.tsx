import React from 'react';

interface VideoControlsProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isPiPActive: boolean;
  togglePiP: () => void;
  isPiPSupported: boolean;
}

const VideoControls: React.FC<VideoControlsProps> = ({ 
  // videoRef, 
  isPiPActive, 
  togglePiP, 
  isPiPSupported 
}) => {
  return (
    <div className="absolute bottom-4 right-4 z-20 flex space-x-2">
      {isPiPSupported && (
        <button
          onClick={togglePiP}
          className={`p-2 rounded-lg transition-colors ${
            isPiPActive 
              ? 'bg-blue-600 text-white' 
              : 'bg-black bg-opacity-70 text-white hover:bg-opacity-90'
          }`}
          title={isPiPActive ? 'Exit Picture-in-Picture' : 'Enter Picture-in-Picture'}
        >
          <svg 
            className="w-5 h-5" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            {isPiPActive ? (
              // Exit PiP icon
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            ) : (
              // Enter PiP icon
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            )}
          </svg>
        </button>
      )}
    </div>
  );
};

export default VideoControls;
