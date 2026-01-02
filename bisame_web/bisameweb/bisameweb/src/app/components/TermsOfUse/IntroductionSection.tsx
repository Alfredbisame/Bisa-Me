'use client';

import React from 'react';
import TermsSection from './TermsSection';

const IntroductionSection: React.FC = () => {
  return (
    <TermsSection id="introduction" title="Introduction" icon="👋" colorScheme="blue">
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-6 border border-blue-100">
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Welcome to <span className="font-bold text-blue-600">Bisame</span>, Ghana&apos;s premier online marketplace 
            connecting buyers and sellers across the country. We&apos;re committed to providing a safe, reliable, 
            and user-friendly platform for all your buying and selling needs.
          </p>
          
          <p className="text-gray-700 leading-relaxed">
            These Terms of Use (&quot;Terms&quot;) govern your access to and use of the Bisame website, mobile applications, 
            and related services (collectively, the &quot;Service&quot;). By accessing or using our Service, you agree to be 
            bound by these Terms and our Privacy Policy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/80 rounded-2xl p-6 border border-blue-100">
            <h3 className="text-xl font-bold text-blue-600 mb-4 flex items-center">
              <span className="mr-2">🎯</span>
              Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed">
              To empower Ghanaians by creating the most trusted and convenient platform for buying and selling 
              goods and services, fostering economic growth and community connections across the nation.
            </p>
          </div>
          
          <div className="bg-white/80 rounded-2xl p-6 border border-orange-100">
            <h3 className="text-xl font-bold text-orange-600 mb-4 flex items-center">
              <span className="mr-2">🌟</span>
              Our Values
            </h3>
            <ul className="text-gray-700 space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                Trust and transparency
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                User safety and security
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                Innovation and excellence
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <h4 className="font-bold text-yellow-800 mb-3 flex items-center">
            <span className="mr-2">⚠️</span>
            Important Notice
          </h4>
          <p className="text-yellow-700 mb-3">
            Please read these Terms carefully before using our Service. These Terms contain important information about:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="text-yellow-700 space-y-1 text-sm">
              <li>• Your rights and responsibilities</li>
              <li>• Our liability limitations</li>
              <li>• Dispute resolution procedures</li>
            </ul>
            <ul className="text-yellow-700 space-y-1 text-sm">
              <li>• Account termination conditions</li>
              <li>• Intellectual property rights</li>
              <li>• Privacy and data protection</li>
            </ul>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
          <h4 className="font-bold text-green-800 mb-2 flex items-center">
            <span className="mr-2">📅</span>
            Effective Date
          </h4>
          <p className="text-green-700">
            These Terms are effective as of <span className="font-semibold">January 1, {new Date().getFullYear()}</span> and will remain 
            in effect until modified or terminated in accordance with the provisions herein.
          </p>
        </div>
      </div>
    </TermsSection>
  );
};

export default IntroductionSection;
