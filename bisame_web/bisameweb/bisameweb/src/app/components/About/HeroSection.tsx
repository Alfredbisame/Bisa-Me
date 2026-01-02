'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StatItem {
  number: string;
  label: string;
  icon: string;
}

const stats: StatItem[] = [
  { number: "50K+", label: "Active Users", icon: "👥" },
  { number: "100K+", label: "Products Listed", icon: "📦" },
  { number: "25K+", label: "Successful Deals", icon: "🤝" },
  { number: "99.9%", label: "Uptime", icon: "⚡" }
];

const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-20 pb-32 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 bg-clip-text text-transparent mb-6">
            BISAME
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto mb-8 rounded-full" />
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ghana&apos;s most trusted marketplace, connecting buyers and sellers with 
            <span className="text-blue-600 font-semibold"> cutting-edge technology</span> and 
            <span className="text-orange-500 font-semibold"> unmatched security</span>
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="group">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
