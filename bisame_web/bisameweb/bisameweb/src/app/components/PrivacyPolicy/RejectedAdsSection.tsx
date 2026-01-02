"use client";
import React from 'react';
import { FaBan, FaExclamationCircle, FaShieldAlt } from 'react-icons/fa';

const RejectedAdsSection = () => {
  const rejectedCategories = [
    {
      category: "Illegal Products & Services",
      items: ["Drugs and controlled substances", "Weapons and ammunition", "Counterfeit goods", "Stolen items"]
    },
    {
      category: "Harmful Content",
      items: ["Adult content and services", "Violence and graphic content", "Hate speech and discrimination", "Misleading health claims"]
    },
    {
      category: "Fraudulent Activities",
      items: ["Get-rich-quick schemes", "Pyramid schemes", "Fake reviews and testimonials", "Phishing attempts"]
    },
    {
      category: "Inappropriate Services",
      items: ["Gambling and betting", "Tobacco and vaping products", "Unregulated financial services", "Personal data sales"]
    }
  ];

  return (
    <section id="rejected-ads" className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl mr-4">
          <FaBan className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Ads with Underlisted Contents Shall Be Rejected</h2>
      </div>
      
      <div className="prose prose-lg max-w-none mb-8">
        <p className="text-gray-700 leading-relaxed">
          To maintain a safe and trustworthy marketplace, Bisame strictly prohibits certain types of 
          advertisements. The following content categories are not permitted on our platform and will 
          result in immediate rejection and potential account suspension.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {rejectedCategories.map((category, index) => (
          <div key={index} className="border border-red-200 rounded-xl p-6 bg-gradient-to-br from-red-50 to-red-100">
            <div className="flex items-center mb-4">
              <FaExclamationCircle className="w-5 h-5 text-red-600 mr-3" />
              <h3 className="font-semibold text-red-900">{category.category}</h3>
            </div>
            <ul className="space-y-2">
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start text-red-800 text-sm">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex-shrink-0">
            <FaShieldAlt className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Enforcement Actions</h3>
            <p className="text-gray-700 mb-4">
              Violations of our advertisement policy may result in the following actions:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                  <span className="text-sm text-gray-700">Warning and content removal</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  <span className="text-sm text-gray-700">Temporary account suspension</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                  <span className="text-sm text-gray-700">Permanent account termination</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                  <span className="text-sm text-gray-700">Legal action when applicable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RejectedAdsSection;
