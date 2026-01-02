"use client";
import React from 'react';
import { FaCog, FaChartLine, FaEnvelope, FaShieldAlt } from 'react-icons/fa';

const DataUsageSection = () => {
  const usagePurposes = [
    {
      icon: FaCog,
      title: "Service Provision",
      description: "To provide, maintain, and improve our marketplace services",
      examples: ["Account management", "Order processing", "Customer support"]
    },
    {
      icon: FaChartLine,
      title: "Analytics & Insights",
      description: "To understand how our platform is used and optimize user experience",
      examples: ["Usage analytics", "Performance monitoring", "Feature optimization"]
    },
    {
      icon: FaEnvelope,
      title: "Communication",
      description: "To communicate with you about your account and our services",
      examples: ["Order updates", "Security alerts", "Marketing communications"]
    },
    {
      icon: FaShieldAlt,
      title: "Security & Compliance",
      description: "To protect our platform and comply with legal obligations",
      examples: ["Fraud prevention", "Legal compliance", "Safety measures"]
    }
  ];

  return (
    <section id="data-usage" className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mr-4">
          <FaCog className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">How Bisame Uses Your Data</h2>
      </div>
      
      <div className="prose prose-lg max-w-none mb-8">
        <p className="text-gray-700 leading-relaxed">
          We use the information we collect to provide you with the best possible experience on our platform. 
          Your data helps us deliver personalized services while maintaining security and compliance.
        </p>
      </div>

      <div className="space-y-6">
        {usagePurposes.map((purpose, index) => {
          const IconComponent = purpose.icon;
          
          return (
            <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex-shrink-0">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{purpose.title}</h3>
                  <p className="text-gray-700 mb-4">{purpose.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {purpose.examples.map((example, exampleIndex) => (
                      <span 
                        key={exampleIndex}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl border border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-3">Your Data Rights</h3>
        <p className="text-gray-700 mb-4">
          You have the right to access, update, or delete your personal information at any time. 
          Contact us if you wish to exercise these rights.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 bg-white border border-blue-300 text-blue-700 rounded-lg text-sm font-medium">
            Right to Access
          </span>
          <span className="px-4 py-2 bg-white border border-orange-300 text-orange-700 rounded-lg text-sm font-medium">
            Right to Rectification
          </span>
          <span className="px-4 py-2 bg-white border border-green-300 text-green-700 rounded-lg text-sm font-medium">
            Right to Deletion
          </span>
        </div>
      </div>
    </section>
  );
};

export default DataUsageSection;
