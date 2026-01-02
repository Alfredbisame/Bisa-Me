"use client";
import React from 'react';
import { FaShieldAlt, FaUsers, FaGlobe } from 'react-icons/fa';

const PrivacyPolicySection = () => {
  return (
    <section id="privacy-policy" className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mr-4">
          <FaShieldAlt className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Privacy Policy</h2>
      </div>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 leading-relaxed mb-6">
          At Bisame, we are committed to protecting your privacy and ensuring the security of your personal information. 
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
          online marketplace platform.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 my-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
            <FaUsers className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="font-semibold text-blue-900 mb-2">User-Centric</h3>
            <p className="text-blue-700 text-sm">
              Your privacy preferences and rights are at the center of everything we do.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
            <FaShieldAlt className="w-8 h-8 text-orange-600 mb-4" />
            <h3 className="font-semibold text-orange-900 mb-2">Secure</h3>
            <p className="text-orange-700 text-sm">
              We implement industry-standard security measures to protect your data.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
            <FaGlobe className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="font-semibold text-green-900 mb-2">Transparent</h3>
            <p className="text-green-700 text-sm">
              We believe in clear communication about how your data is handled.
            </p>
          </div>
        </div>
        
        <p className="text-gray-700 leading-relaxed">
          By using Bisame&apos;s services, you agree to the collection and use of information in accordance with this policy. 
          We will not use or share your information with anyone except as described in this Privacy Policy.
        </p>
      </div>
    </section>
  );
};

export default PrivacyPolicySection;
