'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TermsSectionProps {
  id: string;
  title: string;
  icon: string;
  children: React.ReactNode;
  colorScheme?: 'blue' | 'orange';
}

const TermsSection: React.FC<TermsSectionProps> = ({ 
  id, 
  title, 
  icon, 
  children, 
  colorScheme = 'blue' 
}) => {
  const colorClasses = {
    blue: {
      gradient: 'from-blue-500 to-blue-600',
      text: 'text-blue-600',
      bg: 'bg-blue-50/50'
    },
    orange: {
      gradient: 'from-orange-500 to-orange-600',
      text: 'text-orange-600',
      bg: 'bg-orange-50/50'
    }
  };

  const colors = colorClasses[colorScheme];

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="py-16 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <div className={`${colors.bg} rounded-2xl p-8 border border-white/50 shadow-lg`}>
          <div className="flex items-center space-x-4 mb-8">
            <div className={`w-16 h-16 bg-gradient-to-r ${colors.gradient} rounded-2xl flex items-center justify-center`}>
              <span className="text-2xl">{icon}</span>
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold ${colors.text}`}>
              {title}
            </h2>
          </div>
          
          <div className="prose prose-lg max-w-none">
            {children}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default TermsSection;
