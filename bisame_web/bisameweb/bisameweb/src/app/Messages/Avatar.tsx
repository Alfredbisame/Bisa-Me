import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  icon?: React.ReactNode;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  initials,
  size = 'md',
  color = 'bg-gray-400',
  icon,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-lg'
  };

  const baseClasses = `${sizeClasses[size]} rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0 ${className}`;

  if (src) {
    return (
      <Image
      src={src}
      alt={alt || 'Avatar'}
      width={48}
      height={48} 
      className={`${baseClasses} object-cover`}
      unoptimized
    />
    );
  }
  
  return (
    <div className={`${baseClasses} ${color}`}>
      {icon || initials}
    </div>
  );
};

export default Avatar;
