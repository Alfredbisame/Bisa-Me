'use client';

import React from 'react';
import TermsSection from './TermsSection';

const DisputeResolutionSection: React.FC = () => {
  return (
    <TermsSection id="dispute-resolution" title="Dispute Resolution" icon="🤝" colorScheme="blue">
      <div className="space-y-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          We are committed to resolving disputes fairly and efficiently. Our multi-step dispute resolution 
          process is designed to address conflicts between users and with our platform.
        </p>
        
        <div className="bg-white/80 rounded-2xl p-6 border border-blue-100">
          <h3 className="text-xl font-bold text-blue-600 mb-6">Resolution Process</h3>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">1</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-2">Direct Communication</h4>
                <p className="text-gray-600 mb-2">
                  Users are encouraged to resolve disputes directly through our messaging system.
                </p>
                <div className="text-sm text-blue-600">Timeline: 3-5 business days</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">2</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-2">Mediation</h4>
                <p className="text-gray-600 mb-2">
                  Our support team will mediate and help find a mutually acceptable solution.
                </p>
                <div className="text-sm text-orange-600">Timeline: 5-7 business days</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">3</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-2">Arbitration</h4>
                <p className="text-gray-600 mb-2">
                  Binding arbitration through Ghana Arbitration Centre for unresolved disputes.
                </p>
                <div className="text-sm text-green-600">Timeline: 30-60 days</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
            <h4 className="font-bold text-green-800 mb-3">✅ Covered Disputes</h4>
            <ul className="text-green-700 space-y-2 text-sm">
              <li>• Transaction-related conflicts</li>
              <li>• Product quality issues</li>
              <li>• Payment and refund disputes</li>
              <li>• Account suspension appeals</li>
              <li>• Terms of service violations</li>
            </ul>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <h4 className="font-bold text-red-800 mb-3">❌ Excluded Disputes</h4>
            <ul className="text-red-700 space-y-2 text-sm">
              <li>• Intellectual property claims</li>
              <li>• Criminal activities</li>
              <li>• Class action lawsuits</li>
              <li>• Disputes exceeding GH₵ 50,000</li>
              <li>• Government regulatory matters</li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <h4 className="font-bold text-yellow-800 mb-2">⚖️ Governing Law</h4>
          <p className="text-yellow-700">
            These terms and any disputes arising from them shall be governed by the laws of Ghana. 
            The courts of Accra shall have exclusive jurisdiction over any legal proceedings.
          </p>
        </div>
      </div>
    </TermsSection>
  );
};

export default DisputeResolutionSection;
