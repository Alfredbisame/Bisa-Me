import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Loading seller data...", 
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-[400px] ${className}`}>
      {/* Modern Spinner */}
      <div className="relative mb-4">
        {/* Outer ring */}
        <div className={`
          ${sizeClasses[size]} 
          border-4 border-gray-200 rounded-full animate-pulse
        `}></div>
        
        {/* Inner spinning ring */}
        <div className={`
          ${sizeClasses[size]} 
          border-4 border-transparent border-t-orange-500 rounded-full 
          absolute top-0 left-0 animate-spin
        `}></div>
        
        {/* Center dot */}
        <div className={`
          ${size === 'lg' ? 'w-3 h-3' : size === 'md' ? 'w-2 h-2' : 'w-1.5 h-1.5'} 
          bg-orange-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          animate-pulse
        `}></div>
      </div>
      
      {/* Loading text */}
      <div className="text-center">
        <p className={`${textSizes[size]} text-gray-600 font-medium mb-2`}>
          {message}
        </p>
        <div className="flex space-x-1 justify-center">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 