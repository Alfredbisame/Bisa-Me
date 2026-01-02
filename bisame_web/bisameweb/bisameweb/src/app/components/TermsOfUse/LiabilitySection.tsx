'use client';

import React from 'react';
import TermsSection from './TermsSection';

const LiabilitySection: React.FC = () => {
  return (
    <TermsSection id="liability" title="Limitation of Liability" icon="🚫" colorScheme="blue">
      <div className="space-y-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          Our liability to you is limited as set forth below. These limitations apply to the fullest extent 
          permitted by applicable law and regardless of the legal theory upon which damages are sought.
        </p>
        
        <div className="bg-white/80 rounded-2xl p-6 border border-blue-100">
          <h3 className="text-xl font-bold text-blue-600 mb-4">Liability Limitations</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Excluded Damages</h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Indirect or consequential damages</li>
                <li>• Loss of profits or revenue</li>
                <li>• Loss of data or business interruption</li>
                <li>• Punitive or exemplary damages</li>
                <li>• Loss of goodwill or reputation</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Maximum Liability</h4>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-800 font-bold text-lg">GH₵ 1,000</p>
                <p className="text-blue-600 text-sm">
                  Or the amount you paid us in the 12 months preceding the claim, whichever is greater
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <h4 className="font-bold text-yellow-800 mb-3">⚠️ Important Notice</h4>
          <p className="text-yellow-700 mb-3">
            BISAME SHALL NOT BE LIABLE FOR ANY DAMAGES ARISING FROM:
          </p>
          <ul className="text-yellow-700 space-y-2 text-sm">
            <li>• User-generated content or third-party materials</li>
            <li>• Transactions between users of the platform</li>
            <li>• Unauthorized access to your account or data</li>
            <li>• Technical failures or service interruptions</li>
            <li>• Actions or omissions of third-party service providers</li>
          </ul>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
          <h4 className="font-bold text-green-800 mb-2">🏛️ Jurisdictional Variations</h4>
          <p className="text-green-700 text-sm">
            Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability. 
            In such jurisdictions, our liability is limited to the maximum extent permitted by law.
          </p>
        </div>
      </div>
    </TermsSection>
  );
};

export default LiabilitySection;
