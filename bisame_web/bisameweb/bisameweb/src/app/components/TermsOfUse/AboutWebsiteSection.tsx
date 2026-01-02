'use client';

import React from 'react';
import TermsSection from './TermsSection';

const AboutWebsiteSection: React.FC = () => {
  return (
    <TermsSection id="about-website" title="About the Website" icon="🌐" colorScheme="orange">
      <div className="space-y-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          Bisame is Ghana&apos;s premier online marketplace that connects buyers and sellers across the country. 
          Our platform facilitates secure transactions while providing a user-friendly experience for all participants.
        </p>
        
        <div className="bg-white/80 rounded-2xl p-6 border border-orange-100">
          <h3 className="text-xl font-bold text-orange-600 mb-4">Platform Features</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start space-x-3">
              <span className="text-orange-500 font-bold">•</span>
              <span>Secure messaging system between buyers and sellers</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-orange-500 font-bold">•</span>
              <span>Advanced search and filtering capabilities</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-orange-500 font-bold">•</span>
              <span>User verification and rating systems</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-orange-500 font-bold">•</span>
              <span>Mobile-responsive design for all devices</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-orange-500 font-bold">•</span>
              <span>24/7 customer support and safety monitoring</span>
            </li>
          </ul>
        </div>

        <p className="text-gray-700 leading-relaxed">
          We reserve the right to modify, suspend, or discontinue any aspect of our website at any time 
          without prior notice. We are not liable for any modification, suspension, or discontinuation of the website.
        </p>
      </div>
    </TermsSection>
  );
};

export default AboutWebsiteSection;
