import React from 'react';

interface BlobRingProps {
  className?: string;
  children?: React.ReactNode;
}

const BlobRing: React.FC<BlobRingProps> = ({ className = '', children }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: 136, height: 136 }}>
      {/* Animated Fancy Ring Effect */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        viewBox="0 0 136 136"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer animated ring */}
        <circle
          className="blob-ring-outer"
          cx="68"
          cy="68"
          r="60"
          stroke="url(#orangeGradient)"
          strokeWidth="5"
          fill="none"
          strokeDasharray="24 12 8 16"
        />
        {/* Inner animated ring */}
        <circle
          className="blob-ring-inner"
          cx="68"
          cy="68"
          r="52"
          stroke="url(#orangeGradient2)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="10 8 6 14"
        />
        <defs>
          <linearGradient id="orangeGradient" x1="0" y1="0" x2="136" y2="136" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F57C00" /> {/* Deeper orange */}
            <stop offset="1" stopColor="#EF6C00" /> {/* Lighter orange */}
          </linearGradient>
          <linearGradient id="orangeGradient2" x1="136" y1="0" x2="0" y2="136" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FB8C00" />
            <stop offset="1" stopColor="#E65100" /> {/* Darker orange */}
          </linearGradient>
        </defs>
      </svg>
      {/* Profile Image or children */}
      <div className="relative z-10 w-28 h-28 rounded-full overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default BlobRing;
