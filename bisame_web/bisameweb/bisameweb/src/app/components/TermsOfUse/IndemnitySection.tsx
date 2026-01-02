'use client';

import React from 'react';
import TermsSection from './TermsSection';

const IndemnitySection: React.FC = () => {
  return (
    <TermsSection id="indemnity" title="Indemnity" icon="⚖️" colorScheme="orange">
      <div className="space-y-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          You agree to indemnify, defend, and hold harmless Bisame, its officers, directors, employees, 
          and agents from any claims, damages, or expenses arising from your use of our platform.
        </p>
        
        <div className="bg-white/80 rounded-2xl p-6 border border-orange-100">
          <h3 className="text-xl font-bold text-orange-600 mb-4">Indemnification Scope</h3>
          <p className="text-gray-700 mb-4">
            You agree to indemnify us against claims arising from:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <span className="text-orange-500 font-bold">•</span>
                <span>Your violation of these terms of use</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-orange-500 font-bold">•</span>
                <span>Your violation of applicable laws or regulations</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-orange-500 font-bold">•</span>
                <span>Your infringement of third-party rights</span>
              </li>
            </ul>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <span className="text-orange-500 font-bold">•</span>
                <span>Content you post or transmit through our platform</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-orange-500 font-bold">•</span>
                <span>Your transactions with other users</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-orange-500 font-bold">•</span>
                <span>Your negligent or wrongful conduct</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <h4 className="font-bold text-red-800 mb-3">🛡️ Defense Obligations</h4>
          <p className="text-red-700 mb-3">
            Your indemnification obligations include:
          </p>
          <ul className="text-red-700 space-y-2">
            <li>• Defending us against any claims or lawsuits</li>
            <li>• Paying all legal fees, costs, and damages</li>
            <li>• Cooperating fully in our defense</li>
            <li>• Settling claims only with our written consent</li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h4 className="font-bold text-blue-800 mb-2">📋 Process</h4>
          <p className="text-blue-700">
            We will promptly notify you of any claims and give you control of the defense, 
            provided you acknowledge your indemnification obligations in writing.
          </p>
        </div>
      </div>
    </TermsSection>
  );
};

export default IndemnitySection;
