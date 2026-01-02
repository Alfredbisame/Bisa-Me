'use client';

import React from 'react';
import TermsSection from './TermsSection';

const IntellectualPropertySection: React.FC = () => {
  return (
    <TermsSection id="intellectual-property" title="Intellectual Property" icon="💡" colorScheme="orange">
      <div className="space-y-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          Bisame respects intellectual property rights and expects our users to do the same. 
          We have policies in place to address copyright infringement and other IP violations.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/80 rounded-2xl p-6 border border-orange-100">
            <h3 className="text-xl font-bold text-orange-600 mb-4">Our Rights</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <span className="text-orange-500 font-bold">•</span>
                <span>Bisame trademark and logo</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-orange-500 font-bold">•</span>
                <span>Website design and user interface</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-orange-500 font-bold">•</span>
                <span>Software and platform technology</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-orange-500 font-bold">•</span>
                <span>Original content and documentation</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-orange-500 font-bold">•</span>
                <span>Data compilation and algorithms</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white/80 rounded-2xl p-6 border border-blue-100">
            <h3 className="text-xl font-bold text-blue-600 mb-4">Your Rights</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <span className="text-blue-500 font-bold">•</span>
                <span>Content you create and post</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-500 font-bold">•</span>
                <span>Product images and descriptions</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-500 font-bold">•</span>
                <span>Business names and trademarks</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-500 font-bold">•</span>
                <span>Personal information and data</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-500 font-bold">•</span>
                <span>Reviews and feedback content</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <h4 className="font-bold text-red-800 mb-3">🚫 Copyright Infringement</h4>
          <p className="text-red-700 mb-3">
            If you believe your copyright has been infringed, please provide us with:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="text-red-700 space-y-2 text-sm">
              <li>• Description of the copyrighted work</li>
              <li>• Location of the infringing material</li>
              <li>• Your contact information</li>
            </ul>
            <ul className="text-red-700 space-y-2 text-sm">
              <li>• Statement of good faith belief</li>
              <li>• Statement of accuracy under penalty of perjury</li>
              <li>• Electronic or physical signature</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h4 className="font-bold text-blue-800 mb-3">📧 DMCA Contact</h4>
          <div className="bg-white/60 rounded-lg p-4">
            <p className="text-blue-700 mb-2">
              <span className="font-semibold">Email:</span> dmca@bisame.com
            </p>
            <p className="text-blue-700 mb-2">
              <span className="font-semibold">Address:</span> Legal Department, Bisame Ghana Ltd.
            </p>
            <p className="text-blue-700 text-sm">
              We will respond to valid DMCA notices within 24-48 hours
            </p>
          </div>
        </div>
      </div>
    </TermsSection>
  );
};

export default IntellectualPropertySection;
