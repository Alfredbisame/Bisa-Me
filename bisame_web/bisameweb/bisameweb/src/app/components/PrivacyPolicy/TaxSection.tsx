"use client";
import React from 'react';
import { FaCalculator, FaPercentage, FaFileInvoiceDollar, FaInfoCircle } from 'react-icons/fa';

const TaxSection = () => {
  const taxBenefits = [
    {
      icon: FaPercentage,
      title: "Small Business Deductions",
      description: "Eligible small businesses can claim up to 15% tax reduction on platform fees",
      eligibility: "Annual revenue under GHS 100,000"
    },
    {
      icon: FaFileInvoiceDollar,
      title: "Startup Incentives",
      description: "New businesses get 25% tax reduction for their first year on the platform",
      eligibility: "Businesses registered within the last 12 months"
    },
    {
      icon: FaCalculator,
      title: "Volume-Based Reductions",
      description: "High-volume sellers qualify for progressive tax reductions up to 20%",
      eligibility: "Monthly sales exceeding GHS 50,000"
    }
  ];

  return (
    <section id="tax-reductions" className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl mr-4">
          <FaCalculator className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Tax Reductions</h2>
      </div>
      
      <div className="prose prose-lg max-w-none mb-8">
        <p className="text-gray-700 leading-relaxed">
          Bisame offers various tax reduction programs to support businesses of all sizes. These incentives 
          are designed to help entrepreneurs and established businesses reduce their tax burden while 
          growing their presence on our platform.
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {taxBenefits.map((benefit, index) => {
          const IconComponent = benefit.icon;
          
          return (
            <div key={index} className="border border-gray-200 rounded-xl p-6 hover:border-green-300 transition-colors duration-200">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex-shrink-0">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-700 mb-3">{benefit.description}</p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center">
                      <FaInfoCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-green-800 text-sm font-medium">Eligibility: </span>
                      <span className="text-green-700 text-sm">{benefit.eligibility}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-4">How to Apply for Tax Reductions</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-blue-900 mb-3">Required Documents</h4>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Business registration certificate</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Tax identification number (TIN)</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Financial statements (last 12 months)</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Bank statements</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-green-900 mb-3">Application Process</h4>
            <ul className="space-y-2 text-green-800 text-sm">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Submit application through seller dashboard</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Upload required documentation</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Wait for verification (5-7 business days)</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Receive approval notification</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaxSection;
