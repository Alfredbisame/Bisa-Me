'use client';

import React from 'react';
import TermsSection from './TermsSection';

const ConductSection: React.FC = () => {
  return (
    <TermsSection id="conduct" title="Your Conduct" icon="👤" colorScheme="blue">
      <div className="space-y-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          We expect all users to maintain high standards of conduct that promote a safe, 
          respectful, and trustworthy marketplace environment for everyone.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/80 rounded-2xl p-6 border border-green-100">
            <h3 className="text-xl font-bold text-green-600 mb-4">✅ Expected Behavior</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <span className="text-green-500 font-bold">•</span>
                <span>Treat all users with respect and courtesy</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-green-500 font-bold">•</span>
                <span>Provide honest and accurate information</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-green-500 font-bold">•</span>
                <span>Respond promptly to inquiries and messages</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-green-500 font-bold">•</span>
                <span>Honor all agreements and commitments</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-green-500 font-bold">•</span>
                <span>Report suspicious or inappropriate behavior</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white/80 rounded-2xl p-6 border border-red-100">
            <h3 className="text-xl font-bold text-red-600 mb-4">❌ Prohibited Conduct</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <span className="text-red-500 font-bold">•</span>
                <span>Harassment, bullying, or threatening behavior</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-red-500 font-bold">•</span>
                <span>Fraudulent activities or misrepresentation</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-red-500 font-bold">•</span>
                <span>Spam, excessive messaging, or unsolicited contact</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-red-500 font-bold">•</span>
                <span>Attempting to circumvent platform fees</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-red-500 font-bold">•</span>
                <span>Posting illegal, offensive, or inappropriate content</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h4 className="font-bold text-blue-800 mb-3">🚨 Enforcement Actions</h4>
          <p className="text-blue-700 mb-4">
            Violations of conduct standards may result in the following actions:
          </p>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white/60 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">⚠️</div>
              <h5 className="font-semibold text-blue-800 text-sm">Warning</h5>
              <p className="text-blue-600 text-xs">First offense notification</p>
            </div>
            <div className="bg-white/60 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">⏸️</div>
              <h5 className="font-semibold text-blue-800 text-sm">Suspension</h5>
              <p className="text-blue-600 text-xs">Temporary account restriction</p>
            </div>
            <div className="bg-white/60 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🚫</div>
              <h5 className="font-semibold text-blue-800 text-sm">Termination</h5>
              <p className="text-blue-600 text-xs">Permanent account closure</p>
            </div>
            <div className="bg-white/60 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">⚖️</div>
              <h5 className="font-semibold text-blue-800 text-sm">Legal Action</h5>
              <p className="text-blue-600 text-xs">Serious violations reported</p>
            </div>
          </div>
        </div>
      </div>
    </TermsSection>
  );
};

export default ConductSection;
