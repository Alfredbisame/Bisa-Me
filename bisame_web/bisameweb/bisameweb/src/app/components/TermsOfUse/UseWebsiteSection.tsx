'use client';

import React from 'react';
import TermsSection from './TermsSection';

const UseWebsiteSection: React.FC = () => {
  return (
    <TermsSection id="use-website" title="Use of the Website" icon="💻" colorScheme="blue">
      <div className="space-y-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          By using Bisame, you agree to use our platform responsibly and in accordance with these terms. 
          You must be at least 18 years old or have parental consent to use our services.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/80 rounded-2xl p-6 border border-blue-100">
            <h3 className="text-xl font-bold text-blue-600 mb-4">✅ Permitted Uses</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Browse and search for products</li>
              <li>• Create listings for legitimate items</li>
              <li>• Communicate with other users</li>
              <li>• Leave honest reviews and ratings</li>
              <li>• Report suspicious activities</li>
            </ul>
          </div>
          
          <div className="bg-white/80 rounded-2xl p-6 border border-red-100">
            <h3 className="text-xl font-bold text-red-600 mb-4">❌ Prohibited Uses</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Posting illegal or harmful content</li>
              <li>• Impersonating other users</li>
              <li>• Spamming or harassment</li>
              <li>• Circumventing security measures</li>
              <li>• Commercial scraping or data mining</li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <h4 className="font-bold text-yellow-800 mb-2">⚠️ Important Notice</h4>
          <p className="text-yellow-700">
            Violation of these terms may result in account suspension or termination. 
            We reserve the right to investigate and take appropriate action against users who violate these terms.
          </p>
        </div>
      </div>
    </TermsSection>
  );
};

export default UseWebsiteSection;
