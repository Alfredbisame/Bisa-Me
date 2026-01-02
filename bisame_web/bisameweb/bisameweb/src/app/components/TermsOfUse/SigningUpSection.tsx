'use client';

import React from 'react';
import TermsSection from './TermsSection';

const SigningUpSection: React.FC = () => {
  return (
    <TermsSection id="signing-up" title="Signing Up for Account" icon="✍️" colorScheme="blue">
      <div className="space-y-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          Creating an account on Bisame is free and gives you access to enhanced features. 
          You are responsible for maintaining the confidentiality of your account information.
        </p>
        
        <div className="bg-white/80 rounded-2xl p-6 border border-blue-100">
          <h3 className="text-xl font-bold text-blue-600 mb-4">Account Requirements</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Required Information</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Valid email address</li>
                <li>• Phone number verification</li>
                <li>• Full legal name</li>
                <li>• Secure password</li>
                <li>• Age verification (18+)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Your Responsibilities</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Provide accurate information</li>
                <li>• Keep login credentials secure</li>
                <li>• Update information when needed</li>
                <li>• Report unauthorized access</li>
                <li>• One account per person</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <h4 className="font-bold text-red-800 mb-2">🚫 Account Termination</h4>
          <p className="text-red-700">
            We reserve the right to suspend or terminate accounts that violate our terms, 
            engage in fraudulent activities, or pose risks to other users. You may also 
            delete your account at any time through your account settings.
          </p>
        </div>
      </div>
    </TermsSection>
  );
};

export default SigningUpSection;
