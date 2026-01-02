'use client';

import React, { useState, useEffect } from 'react';

const BackgroundAnimation: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/10 to-orange-400/10 rounded-full blur-3xl"
        style={{
          left: mousePosition.x / 10,
          top: mousePosition.y / 10,
          transition: 'all 0.3s ease-out'
        }}
      />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-orange-300/20 to-blue-300/20 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-200/15 to-orange-200/15 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '6s' }} />
    </div>
  );
};

export default BackgroundAnimation;
