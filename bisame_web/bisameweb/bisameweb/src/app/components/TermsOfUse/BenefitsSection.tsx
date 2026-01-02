'use client';

import React from 'react';
import TermsSection from './TermsSection';

const BenefitsSection: React.FC = () => {
  return (
    <TermsSection id="benefits" title="Benefits" icon="🎁" colorScheme="blue">
      <div className="space-y-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          As a Bisame user, you enjoy numerous benefits designed to enhance your buying and selling experience. 
          These benefits are subject to fair usage policies and may be modified based on account standing.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/80 rounded-2xl p-6 border border-blue-100 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🆓</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Free Basic Listings</h4>
            <p className="text-gray-600 text-sm">Post unlimited basic listings at no cost</p>
          </div>
          
          <div className="bg-white/80 rounded-2xl p-6 border border-blue-100 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛡️</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Buyer Protection</h4>
            <p className="text-gray-600 text-sm">Secure transactions with dispute resolution</p>
          </div>
          
          <div className="bg-white/80 rounded-2xl p-6 border border-blue-100 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📞</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">24/7 Support</h4>
            <p className="text-gray-600 text-sm">Round-the-clock customer assistance</p>
          </div>
          
          <div className="bg-white/80 rounded-2xl p-6 border border-blue-100 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Analytics Dashboard</h4>
            <p className="text-gray-600 text-sm">Track your listing performance</p>
          </div>
          
          <div className="bg-white/80 rounded-2xl p-6 border border-blue-100 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⭐</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Rating System</h4>
            <p className="text-gray-600 text-sm">Build trust through user ratings</p>
          </div>
          
          <div className="bg-white/80 rounded-2xl p-6 border border-blue-100 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔔</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Smart Notifications</h4>
            <p className="text-gray-600 text-sm">Stay updated on relevant activities</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-orange-50 border border-blue-200 rounded-2xl p-6">
          <h4 className="font-bold text-blue-800 mb-3">🏆 Premium Benefits</h4>
          <p className="text-blue-700 mb-4">
            Upgrade to premium for enhanced features and priority support:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-blue-700">
              <li>• Priority customer support</li>
              <li>• Advanced analytics and insights</li>
              <li>• Bulk listing management tools</li>
            </ul>
            <ul className="space-y-2 text-blue-700">
              <li>• Featured seller badge</li>
              <li>• Extended listing duration</li>
              <li>• Promotional discounts</li>
            </ul>
          </div>
        </div>
      </div>
    </TermsSection>
  );
};

export default BenefitsSection;
