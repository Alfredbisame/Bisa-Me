'use client';
import React from 'react';
import { FaQuestionCircle, FaArrowLeft, FaHome } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const HelpHeader: React.FC = () => {
    const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  const handleHomeClick = () => {
    router.push('/');
  };

  return (
    <header className="bg-gradient-to-r from-blue-800 to-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between lg:justify-center lg:relative">
          {/* Back Button */}
          <button 
            onClick={handleBackClick}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 hover:bg-white/10 px-3 py-2 rounded-lg lg:absolute lg:left-0"
          >
            <FaArrowLeft className="text-sm" />
            <span className="text-sm font-medium hidden sm:inline">Back</span>
          </button>
          
          {/* Centered Content */}
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/15 rounded-xl backdrop-blur-sm border border-white/20">
              <FaQuestionCircle className="text-2xl text-orange-400" />
            </div>
            <div className="text-center lg:text-left">
              <h1 className="text-2xl font-bold">Help Center</h1>
              <p className="text-sm text-white/80 hidden sm:block">Find answers to your questions</p>
            </div>
          </div>
          
          {/* Home Button */}
          <button 
            onClick={handleHomeClick}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 hover:bg-white/10 px-3 py-2 rounded-lg lg:absolute lg:right-0"
          >
            <FaHome className="text-sm" />
            <span className="text-sm font-medium hidden sm:inline">Home</span>
          </button>
        </div>
      </div>
    </header>
  );
};


export default HelpHeader;
