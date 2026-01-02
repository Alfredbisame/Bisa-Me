'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SafetyTip {
  category: string;
  tips: string[];
  icon: string;
  color: string;
}

const safetyTips: SafetyTip[] = [
  {
    category: "Meeting Safety",
    tips: [
      "Always meet in public, well-lit places",
      "Bring a friend or family member with you",
      "Choose busy locations like malls or cafes",
      "Trust your instincts - if something feels wrong, leave"
    ],
    icon: "🏢",
    color: "from-blue-500 to-blue-600"
  },
  {
    category: "Payment Security",
    tips: [
      "Use secure payment methods",
      "Never send money before seeing the item",
      "Avoid wire transfers to strangers",
      "Keep receipts and transaction records"
    ],
    icon: "💳",
    color: "from-orange-500 to-orange-600"
  },
  {
    category: "Communication",
    tips: [
      "Keep conversations on the platform initially",
      "Be wary of urgent or pressure tactics",
      "Verify seller/buyer identity when possible",
      "Report suspicious behavior immediately"
    ],
    icon: "💬",
    color: "from-blue-600 to-indigo-600"
  },
  {
    category: "Product Verification",
    tips: [
      "Inspect items thoroughly before buying",
      "Ask for additional photos if needed",
      "Research market prices beforehand",
      "Check for authenticity and condition"
    ],
    icon: "🔍",
    color: "from-orange-600 to-red-500"
  }
];

const SafetyTipsSection: React.FC = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
            <span>🛡️</span>
            <span>SAFETY FIRST</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Stay <span className="text-blue-600">Safe</span> & <span className="text-orange-500">Secure</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your safety is our priority. Follow these essential tips for secure trading
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {safetyTips.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                {/* Header */}
                <div className={`bg-gradient-to-r ${section.color} p-6 text-white`}>
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl bg-white/20 rounded-2xl p-3">
                      {section.icon}
                    </div>
                    <h3 className="text-2xl font-bold">{section.category}</h3>
                  </div>
                </div>

                {/* Tips List */}
                <div className="p-6">
                  <ul className="space-y-4">
                    {section.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start space-x-3 group/item">
                        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors duration-200">
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SafetyTipsSection;
