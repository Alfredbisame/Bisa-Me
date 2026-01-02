"use client";
import React from 'react';
import { FaLock, FaServer, FaKey, FaEye } from 'react-icons/fa';

const SecuritySection = () => {
  const securityMeasures = [
    {
      icon: FaLock,
      title: "Data Encryption",
      description: "All sensitive data is encrypted both in transit and at rest using industry-standard protocols"
    },
    {
      icon: FaServer,
      title: "Secure Infrastructure",
      description: "Our servers are hosted in secure facilities with 24/7 monitoring and access controls"
    },
    {
      icon: FaKey,
      title: "Access Control",
      description: "Strict access controls ensure only authorized personnel can access your information"
    },
    {
      icon: FaEye,
      title: "Regular Audits",
      description: "We conduct regular security audits and assessments to identify and address vulnerabilities"
    }
  ];

  return (
    <section id="security" className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl mr-4">
          <FaLock className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Security</h2>
      </div>
      
      <div className="prose prose-lg max-w-none mb-8">
        <p className="text-gray-700 leading-relaxed">
          The security of your personal information is extremely important to us. We implement a variety of 
          security measures to maintain the safety of your personal information when you place an order or 
          access your personal information.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {securityMeasures.map((measure, index) => {
          const IconComponent = measure.icon;
          
          return (
            <div key={index} className="p-6 border border-gray-200 rounded-xl hover:border-green-300 transition-colors duration-200">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex-shrink-0">
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{measure.title}</h3>
                  <p className="text-gray-700 text-sm">{measure.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6">
        <h3 className="font-semibold text-red-900 mb-3 flex items-center">
          <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
          Important Security Notice
        </h3>
        <p className="text-red-800 mb-4">
          While we strive to use commercially acceptable means to protect your personal information, 
          we cannot guarantee its absolute security. No method of transmission over the Internet or 
          electronic storage is 100% secure.
        </p>
        <div className="bg-white border border-red-200 rounded-lg p-4">
          <h4 className="font-medium text-red-900 mb-2">What you can do:</h4>
          <ul className="text-red-800 text-sm space-y-1">
            <li>• Use strong, unique passwords</li>
            <li>• Enable two-factor authentication when available</li>
            <li>• Keep your account information up to date</li>
            <li>• Report suspicious activity immediately</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
