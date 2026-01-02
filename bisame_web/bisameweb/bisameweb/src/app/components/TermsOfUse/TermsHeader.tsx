'use client';

import React from 'react';
import { motion } from 'framer-motion';

const TermsHeader: React.FC = () => {
  return (
    <section className="relative pt-20 pb-16 px-4 bg-gradient-to-br from-blue-600 via-indigo-600 to-orange-500 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-4xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
            <span>📋</span>
            <span>LEGAL DOCUMENT</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            Terms of Use
          </h1>
          
          <div className="w-24 h-1 bg-white/80 mx-auto mb-8 rounded-full" />
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Please read these terms carefully before using Bisame. By accessing our platform, 
            you agree to be bound by these terms and conditions.
          </p>
          
          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <p className="text-white/80 text-sm">
              <span className="font-semibold">Last Updated:</span> February {new Date().getFullYear()} | 
              <span className="font-semibold"> Effective Date:</span> June {new Date().getFullYear()}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsHeader;
