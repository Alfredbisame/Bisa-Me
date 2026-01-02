'use client';

import React from 'react';
import { motion } from 'framer-motion';

const EmergencyContact: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mt-16 text-center"
    >
      <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl p-1 max-w-2xl mx-auto my-10">
        <div className="bg-white rounded-3xl p-8">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center">
              <span className="text-2xl">🚨</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Emergency Contact</h3>
              <p className="text-gray-600">Report suspicious activity immediately</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-900 mb-2">24/7 Safety Hotline</h4>
              <p className="text-2xl font-bold text-blue-600">+233 59 467 3304</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-900 mb-2">Email Support</h4>
              <p className="text-lg font-semibold text-orange-500">bisamecustomercare@gmail.com</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 rounded-2xl border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <span className="font-semibold">Remember:</span> If you feel unsafe during any transaction, 
              contact local authorities immediately. Your safety is more important than any deal.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmergencyContact;
