"use client";
import React from 'react';
import { FaDatabase, FaMobile, FaGlobe, FaCookie } from 'react-icons/fa';

const DataCollectionSection = () => {
  const collectionMethods = [
    {
      icon: FaDatabase,
      title: "Account Information",
      description: "Name, email, phone number, and profile details when you register",
      color: "blue"
    },
    {
      icon: FaMobile,
      title: "Device Information",
      description: "Device type, operating system, browser information, and IP address",
      color: "orange"
    },
    {
      icon: FaGlobe,
      title: "Usage Data",
      description: "How you interact with our platform, pages visited, and time spent",
      color: "green"
    },
    {
      icon: FaCookie,
      title: "Cookies & Tracking",
      description: "Cookies, web beacons, and similar technologies for enhanced experience",
      color: "purple"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "from-blue-500 to-blue-600 bg-blue-50 border-blue-200 text-blue-700",
      orange: "from-orange-500 to-orange-600 bg-orange-50 border-orange-200 text-orange-700",
      green: "from-green-500 to-green-600 bg-green-50 border-green-200 text-green-700",
      purple: "from-purple-500 to-purple-600 bg-purple-50 border-purple-200 text-purple-700"
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <section id="data-collection" className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl mr-4">
          <FaDatabase className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">How Bisame Collects Information</h2>
      </div>
      
      <div className="prose prose-lg max-w-none mb-8">
        <p className="text-gray-700 leading-relaxed">
          We collect information from you in several ways to provide and improve our services. 
          Here&apos;s how we gather your information:
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {collectionMethods.map((method, index) => {
          const IconComponent = method.icon;
          const colorClasses = getColorClasses(method.color);
          
          return (
            <div key={index} className={`p-6 rounded-xl border ${colorClasses.split(' ').slice(2).join(' ')}`}>
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${colorClasses.split(' ').slice(0, 2).join(' ')} mb-4`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{method.title}</h3>
              <p className={`text-sm ${colorClasses.split(' ').slice(-1)}`}>
                {method.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3">Information Collection Methods</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <span>Directly from you when you create an account or make purchases</span>
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <span>Automatically through your use of our platform</span>
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <span>From third-party services with your consent</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default DataCollectionSection;
