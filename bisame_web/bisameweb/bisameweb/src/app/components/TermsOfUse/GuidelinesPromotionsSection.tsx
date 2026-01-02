'use client';

import React from 'react';
import TermsSection from './TermsSection';

const GuidelinesPromotionsSection: React.FC = () => {
  return (
    <TermsSection id="guidelines-promotions" title="Guidelines for Promotions" icon="📋" colorScheme="orange">
      <div className="space-y-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          To maintain a fair and trustworthy marketplace, all promotional activities must adhere to our strict guidelines. 
          Violations may result in promotion cancellation and account penalties.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/80 rounded-2xl p-6 border border-green-100">
            <h3 className="text-xl font-bold text-green-600 mb-4">✅ Allowed Practices</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <span className="text-green-500 font-bold">•</span>
                <span>Accurate product descriptions and images</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-green-500 font-bold">•</span>
                <span>Competitive pricing strategies</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-green-500 font-bold">•</span>
                <span>Highlighting unique product features</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-green-500 font-bold">•</span>
                <span>Customer testimonials and reviews</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-green-500 font-bold">•</span>
                <span>Limited-time offers and discounts</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white/80 rounded-2xl p-6 border border-red-100">
            <h3 className="text-xl font-bold text-red-600 mb-4">❌ Prohibited Practices</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <span className="text-red-500 font-bold">•</span>
                <span>False or misleading claims</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-red-500 font-bold">•</span>
                <span>Fake reviews or ratings manipulation</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-red-500 font-bold">•</span>
                <span>Spam or excessive promotional messages</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-red-500 font-bold">•</span>
                <span>Promoting illegal or restricted items</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-red-500 font-bold">•</span>
                <span>Copying competitor&apos;s promotional content</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h4 className="font-bold text-blue-800 mb-3">📊 Performance Monitoring</h4>
          <p className="text-blue-700 mb-3">
            We continuously monitor promotional activities to ensure compliance and effectiveness:
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/60 rounded-lg p-3">
              <span className="font-semibold text-blue-800">Click-through Rates</span>
              <p className="text-blue-600">Track engagement metrics</p>
            </div>
            <div className="bg-white/60 rounded-lg p-3">
              <span className="font-semibold text-blue-800">Conversion Tracking</span>
              <p className="text-blue-600">Monitor sales performance</p>
            </div>
            <div className="bg-white/60 rounded-lg p-3">
              <span className="font-semibold text-blue-800">Quality Scores</span>
              <p className="text-blue-600">Assess content quality</p>
            </div>
          </div>
        </div>
      </div>
    </TermsSection>
  );
};

export default GuidelinesPromotionsSection;
