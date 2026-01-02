'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

const values: ValueItem[] = [
  {
    icon: "🛡️",
    title: "Security First",
    description: "Your safety and privacy are our top priorities in every transaction."
  },
  {
    icon: "🚀",
    title: "Innovation",
    description: "Cutting-edge technology to enhance your buying and selling experience."
  },
  {
    icon: "🤝",
    title: "Trust",
    description: "Building lasting relationships through transparency and reliability."
  },
  {
    icon: "🌍",
    title: "Community",
    description: "Connecting people across Ghana to create a thriving marketplace."
  }
];

const ValuesSection: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-50/50 to-orange-50/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-orange-500">Values</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The principles that guide everything we do
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-full">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
