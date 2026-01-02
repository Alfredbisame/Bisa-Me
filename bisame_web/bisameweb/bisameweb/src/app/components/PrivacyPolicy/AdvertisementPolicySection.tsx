"use client";
import React from 'react';
import { FaBullhorn, FaBullseye, FaEye, FaChartBar } from 'react-icons/fa';

const AdvertisementPolicySection = () => {
  const adPolicies = [
    {
      icon: FaBullseye,
      title: "Targeted Advertising",
      description: "We may use your information to show you relevant ads based on your interests and browsing behavior"
    },
    {
      icon: FaEye,
      title: "Ad Transparency",
      description: "All advertisements are clearly marked and distinguished from organic content"
    },
    {
      icon: FaChartBar,
      title: "Performance Tracking",
      description: "We track ad performance to improve relevance and user experience"
    }
  ];

  return (
    <section id="advertisement-policy" className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl mr-4">
          <FaBullhorn className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Bisame Advertisement Policy</h2>
      </div>
      
      <div className="prose prose-lg max-w-none mb-8">
        <p className="text-gray-700 leading-relaxed">
          Our advertising policy ensures that all advertisements on the Bisame platform are relevant, 
          appropriate, and comply with our community standards. We strive to provide a safe and 
          trustworthy advertising environment for all users.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {adPolicies.map((policy, index) => {
          const IconComponent = policy.icon;
          
          return (
            <div key={index} className="p-6 border border-gray-200 rounded-xl hover:border-orange-300 transition-colors duration-200">
              <div className="text-center">
                <div className="inline-flex p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mb-4">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">{policy.title}</h3>
                <p className="text-gray-700 text-sm">{policy.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-orange-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Advertisement Guidelines</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-blue-900 mb-3">Acceptable Practices</h4>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Truthful and accurate product descriptions</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Clear pricing and terms</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Appropriate content for all audiences</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Compliance with local laws and regulations</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-orange-900 mb-3">User Controls</h4>
            <ul className="space-y-2 text-orange-800 text-sm">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Opt-out of personalized advertising</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Report inappropriate advertisements</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Manage ad preferences in settings</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Block specific advertisers</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvertisementPolicySection;
