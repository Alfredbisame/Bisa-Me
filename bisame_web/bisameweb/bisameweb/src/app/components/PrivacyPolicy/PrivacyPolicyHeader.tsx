"use client";
import React from 'react';
import { FaShieldAlt, FaLock, FaUserShield } from 'react-icons/fa';

const PrivacyPolicyHeader = () => {
  return (
    <React.Fragment>
    <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          {/* Icon Group */}
          <div className="flex justify-center space-x-4 mb-8">
            <div className="p-3 bg-orange-500 rounded-full">
              <FaShieldAlt className="w-6 h-6" />
            </div>
            <div className="p-3 bg-blue-600 rounded-full">
              <FaLock className="w-6 h-6" />
            </div>
            <div className="p-3 bg-orange-500 rounded-full">
              <FaUserShield className="w-6 h-6" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Privacy <span className="text-orange-400">Policy</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Your privacy is our priority. Learn how Bisame protects and manages your personal information.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 text-sm text-blue-200">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
              Last updated: {new Date().toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
              Effective immediately
            </div>
          </div>
        </div>
      </div>
    </div>
    </React.Fragment>
  );
};

export default PrivacyPolicyHeader;
