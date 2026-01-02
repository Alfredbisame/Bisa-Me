'use client';

import React from 'react';
import TermsSection from './TermsSection';

const ChangesTermsSection: React.FC = () => {
  return (
    <TermsSection id="changes-terms" title="Changes in Terms of Use" icon="🔄" colorScheme="orange">
      <div className="space-y-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately 
          upon posting on our website unless otherwise specified.
        </p>
        
        <div className="bg-white/80 rounded-2xl p-6 border border-orange-100">
          <h3 className="text-xl font-bold text-orange-600 mb-4">How We Notify You</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">SMS Notification</h4>
                <p className="text-gray-600">Registered users will receive SMS notifications of significant changes</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Website Banner</h4>
                <p className="text-gray-600">Prominent notices will be displayed on our homepage</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">In-App Notifications</h4>
                <p className="text-gray-600">Push notifications for mobile app users</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          Your continued use of the website after changes are posted constitutes acceptance of the new terms. 
          If you do not agree with the changes, you should discontinue use of our services.
        </p>
      </div>
    </TermsSection>
  );
};

export default ChangesTermsSection;
