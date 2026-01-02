'use client';

import React from 'react';
import TermsSection from './TermsSection';

const TheServiceSection: React.FC = () => {
  return (
    <TermsSection id="the-service" title="The Service" icon="⚙️" colorScheme="orange">
      <div className="space-y-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          Bisame provides a platform that connects buyers and sellers. We facilitate transactions 
          but are not directly involved in the actual exchange of goods or services between users.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/80 rounded-2xl p-6 border border-orange-100 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛍️</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Marketplace</h4>
            <p className="text-gray-600 text-sm">Connect with thousands of buyers and sellers across Ghana</p>
          </div>
          
          <div className="bg-white/80 rounded-2xl p-6 border border-orange-100 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Communication</h4>
            <p className="text-gray-600 text-sm">Secure messaging system for safe negotiations</p>
          </div>
          
          <div className="bg-white/80 rounded-2xl p-6 border border-orange-100 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛡️</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Safety</h4>
            <p className="text-gray-600 text-sm">Advanced security measures and user verification</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h4 className="font-bold text-blue-800 mb-3">Service Availability</h4>
          <p className="text-blue-700 mb-3">
            We strive to maintain 99.9% uptime, but cannot guarantee uninterrupted service. 
            Maintenance windows and updates may temporarily affect availability.
          </p>
          <ul className="text-blue-700 space-y-1 text-sm">
            <li>• Scheduled maintenance: Sundays 2:00-4:00 AM GMT</li>
            <li>• Emergency maintenance: As needed with advance notice</li>
            <li>• Service status updates: Available on our status page</li>
          </ul>
        </div>
      </div>
    </TermsSection>
  );
};

export default TheServiceSection;
