'use client';

import React from 'react';
import TermsSection from './TermsSection';

const PromotionSection: React.FC = () => {
  return (
    <TermsSection id="promotion" title="Promotion" icon="📢" colorScheme="blue">
      <div className="space-y-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          Bisame offers various promotional features to help sellers increase visibility and reach more potential buyers. 
          All promotional activities must comply with our guidelines and applicable laws.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/80 rounded-2xl p-6 border border-blue-100">
            <h3 className="text-xl font-bold text-blue-600 mb-4">Available Promotions</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">⭐</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Featured Listings</h4>
                  <p className="text-gray-600 text-sm">Highlight your products at the top of search results</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🚀</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Boost Visibility</h4>
                  <p className="text-gray-600 text-sm">Increase your listing&apos;s exposure to potential buyers</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Targeted Ads</h4>
                  <p className="text-gray-600 text-sm">Reach specific demographics and locations</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 rounded-2xl p-6 border border-green-100">
            <h3 className="text-xl font-bold text-green-600 mb-4">Pricing Structure</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-700">Featured Listing (7 days)</span>
                <span className="font-bold text-green-600">GH₵ 20</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-700">Boost Visibility (3 days)</span>
                <span className="font-bold text-green-600">GH₵ 10</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">Targeted Ads (per click)</span>
                <span className="font-bold text-green-600">GH₵ 0.50</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
          <h4 className="font-bold text-orange-800 mb-2">💡 Promotion Tips</h4>
          <p className="text-orange-700">
            All promotional content must be truthful, not misleading, and comply with Ghana&apos;s advertising standards. 
            Refunds for promotional services are subject to our refund policy.
          </p>
        </div>
      </div>
    </TermsSection>
  );
};

export default PromotionSection;
