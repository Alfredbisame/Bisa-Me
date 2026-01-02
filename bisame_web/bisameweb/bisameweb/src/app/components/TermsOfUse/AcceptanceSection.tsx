'use client';

import React from 'react';
import TermsSection from './TermsSection';

const AcceptanceSection: React.FC = () => {
  return (
    <TermsSection id="acceptance" title="Acceptance of Terms" icon="✅" colorScheme="orange">
      <div className="space-y-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          By accessing, browsing, or using the Bisame platform in any way, you acknowledge that you have read, 
          understood, and agree to be bound by these Terms of Use and all applicable laws and regulations.
        </p>

        <div className="bg-white/80 rounded-2xl p-6 border border-orange-100">
          <h3 className="text-xl font-bold text-orange-600 mb-4">How You Accept These Terms</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Creating an Account</h4>
                <p className="text-gray-600 text-sm">
                  When you register for a Bisame account, you explicitly agree to these Terms by checking 
                  the acceptance box during the registration process.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Using Our Services</h4>
                <p className="text-gray-600 text-sm">
                  Your continued use of any Bisame service, including browsing listings, posting ads, 
                  or communicating with other users, constitutes acceptance of these Terms.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Making Transactions</h4>
                <p className="text-gray-600 text-sm">
                  Each time you engage in a transaction through our platform, you reaffirm your 
                  acceptance of these Terms and any updates that may have been made.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
            <h4 className="font-bold text-green-800 mb-3 flex items-center">
              <span className="mr-2">✅</span>
              What Acceptance Means
            </h4>
            <ul className="text-green-700 space-y-2 text-sm">
              <li>• You agree to comply with all Terms</li>
              <li>• You accept our Privacy Policy</li>
              <li>• You consent to our data practices</li>
              <li>• You acknowledge our liability limitations</li>
              <li>• You agree to dispute resolution procedures</li>
            </ul>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <h4 className="font-bold text-red-800 mb-3 flex items-center">
              <span className="mr-2">❌</span>
              If You Don&apos;t Agree
            </h4>
            <ul className="text-red-700 space-y-2 text-sm">
              <li>• You must not use our services</li>
              <li>• You should not create an account</li>
              <li>• You cannot post listings or ads</li>
              <li>• You must cease all platform activities</li>
              <li>• Existing accounts may be terminated</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h4 className="font-bold text-blue-800 mb-3 flex items-center">
            <span className="mr-2">🔄</span>
            Ongoing Acceptance
          </h4>
          <p className="text-blue-700 mb-3">
            Your acceptance of these Terms is ongoing and continues each time you:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="text-blue-700 space-y-1 text-sm">
              <li>• Log into your account</li>
              <li>• Browse our website or app</li>
              <li>• Post new listings</li>
              <li>• Contact other users</li>
            </ul>
            <ul className="text-blue-700 space-y-1 text-sm">
              <li>• Make or receive payments</li>
              <li>• Use promotional features</li>
              <li>• Access customer support</li>
              <li>• Participate in community features</li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
            <span className="mr-2">📋</span>
            Legal Capacity
          </h4>
          <p className="text-yellow-700">
            By accepting these Terms, you represent that you have the legal capacity to enter into this agreement. 
            If you are accepting on behalf of a company or organization, you represent that you have the authority 
            to bind that entity to these Terms.
          </p>
        </div>
      </div>
    </TermsSection>
  );
};

export default AcceptanceSection;
