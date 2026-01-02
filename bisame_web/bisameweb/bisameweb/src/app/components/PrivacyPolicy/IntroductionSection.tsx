"use client";
import React from 'react';
import { FaShieldAlt, FaCalendarAlt, FaGlobe, FaUserShield } from 'react-icons/fa';

const IntroductionSection = () => {
  const keyPoints = [
    {
      icon: FaShieldAlt,
      title: "Data Protection",
      description: "We implement industry-standard security measures to protect your personal information"
    },
    {
      icon: FaUserShield,
      title: "User Rights",
      description: "You have full control over your data with rights to access, modify, or delete your information"
    },
    {
      icon: FaGlobe,
      title: "Transparency",
      description: "We clearly explain how we collect, use, and share your information"
    }
  ];

  return (
    <section id="introduction" className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mr-4">
          <FaShieldAlt className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Introduction</h2>
      </div>
      
      <div className="prose prose-lg max-w-none mb-8">
        <p className="text-gray-700 leading-relaxed mb-6">
          Welcome to Bisame&apos;s Privacy Policy. At Bisame, we are committed to protecting your privacy 
          and ensuring the security of your personal information. This Privacy Policy explains how we 
          collect, use, disclose, and safeguard your information when you use our online marketplace 
          platform and mobile applications.
        </p>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          By accessing or using our services, you agree to the collection and use of information in 
          accordance with this policy. We encourage you to read this Privacy Policy carefully and 
          contact us if you have any questions or concerns about how we handle your personal data.
        </p>

        <p className="text-gray-700 leading-relaxed">
          This policy applies to all users of the Bisame platform, including buyers, sellers, and 
          visitors to our website and mobile applications. We may update this policy from time to 
          time, and we will notify you of any significant changes.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {keyPoints.map((point, index) => {
          const IconComponent = point.icon;
          
          return (
            <div key={index} className="p-6 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors duration-200">
              <div className="text-center">
                <div className="inline-flex p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-4">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">{point.title}</h3>
                <p className="text-gray-700 text-sm">{point.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-orange-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex-shrink-0">
            <FaCalendarAlt className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Policy Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center mb-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <span className="text-sm text-gray-700"><strong>Effective Date:</strong> January 1, 2025</span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  <span className="text-sm text-gray-700"><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</span>
                </div>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span className="text-sm text-gray-700"><strong>Jurisdiction:</strong> Ghana</span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  <span className="text-sm text-gray-700"><strong>Language:</strong> English</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;
