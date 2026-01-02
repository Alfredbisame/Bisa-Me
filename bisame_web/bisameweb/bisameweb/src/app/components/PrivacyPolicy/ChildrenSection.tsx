"use client";
import React from 'react';
import { FaChild, FaExclamationTriangle, FaUserShield } from 'react-icons/fa';

const ChildrenSection = () => {
  return (
    <section id="children" className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl mr-4">
          <FaChild className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Children&apos;s Privacy</h2>
      </div>
      
      <div className="prose prose-lg max-w-none mb-8">
        <p className="text-gray-700 leading-relaxed">
          Protecting the privacy of children is especially important to us. Our service is not intended 
          for children under the age of 13, and we do not knowingly collect personal information from 
          children under 13 years of age.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
          <div className="flex items-center mb-4">
            <FaUserShield className="w-6 h-6 text-purple-600 mr-3" />
            <h3 className="font-semibold text-purple-900">Age Verification</h3>
          </div>
          <p className="text-purple-800 text-sm">
            We require users to confirm they are at least 13 years old when creating an account. 
            Users under 18 must have parental consent to use our services.
          </p>
        </div>

        <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
          <div className="flex items-center mb-4">
            <FaExclamationTriangle className="w-6 h-6 text-orange-600 mr-3" />
            <h3 className="font-semibold text-orange-900">Parental Notice</h3>
          </div>
          <p className="text-orange-800 text-sm">
            If we become aware that we have collected personal information from a child under 13, 
            we will take steps to remove that information from our servers immediately.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-4">What Parents Should Know</h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <span className="text-gray-700">Monitor your child&apos;s online activities and educate them about online safety</span>
          </div>
          <div className="flex items-start">
            <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <span className="text-gray-700">Contact us immediately if you believe your child has provided personal information</span>
          </div>
          <div className="flex items-start">
            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <span className="text-gray-700">Review and approve any purchases or account activities for minors</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChildrenSection;
