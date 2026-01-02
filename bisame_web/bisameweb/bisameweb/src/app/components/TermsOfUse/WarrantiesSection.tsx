'use client';

import React from 'react';
import TermsSection from './TermsSection';

const WarrantiesSection: React.FC = () => {
  return (
    <TermsSection id="warranties" title="Representations and Warranties" icon="🛡️" colorScheme="orange">
      <div className="space-y-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          By using Bisame, you make certain representations and warranties to us and other users. 
          We also provide certain warranties about our service, subject to the limitations outlined below.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/80 rounded-2xl p-6 border border-orange-100">
            <h3 className="text-xl font-bold text-orange-600 mb-4">Your Warranties</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <span className="text-orange-500 font-bold">•</span>
                <span>You have the legal right to sell listed items</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-orange-500 font-bold">•</span>
                <span>All information provided is accurate and truthful</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-orange-500 font-bold">•</span>
                <span>You will comply with all applicable laws</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-orange-500 font-bold">•</span>
                <span>Items are as described and in stated condition</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-orange-500 font-bold">•</span>
                <span>You will honor all transaction commitments</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white/80 rounded-2xl p-6 border border-blue-100">
            <h3 className="text-xl font-bold text-blue-600 mb-4">Our Warranties</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <span className="text-blue-500 font-bold">•</span>
                <span>Platform availability and functionality</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-500 font-bold">•</span>
                <span>Data security and privacy protection</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-500 font-bold">•</span>
                <span>Fair and unbiased dispute resolution</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-500 font-bold">•</span>
                <span>Timely customer support response</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-500 font-bold">•</span>
                <span>Transparent fee structure</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <h4 className="font-bold text-yellow-800 mb-3">⚠️ Disclaimer</h4>
          <p className="text-yellow-700 mb-3">
            THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND. 
            WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING:
          </p>
          <ul className="text-yellow-700 space-y-1 text-sm">
            <li>• Warranties of merchantability and fitness for a particular purpose</li>
            <li>• Warranties regarding the accuracy or completeness of content</li>
            <li>• Warranties that the service will be uninterrupted or error-free</li>
            <li>• Warranties regarding third-party content or services</li>
          </ul>
        </div>
      </div>
    </TermsSection>
  );
};

export default WarrantiesSection;
