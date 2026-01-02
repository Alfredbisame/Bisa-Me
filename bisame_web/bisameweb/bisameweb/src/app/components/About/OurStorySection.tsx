'use client';

import React from 'react';
import { motion } from 'framer-motion';

const OurStorySection: React.FC = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-blue-600">Story</span>
            </h2>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Born from the vision to revolutionize Ghana&apos;s digital marketplace, 
                Bisame emerged as a beacon of trust and innovation in the e-commerce landscape.
              </p>
              <p>
                We recognized the need for a platform that prioritizes user safety while 
                delivering an exceptional trading experience. Our journey began with a simple 
                mission: to connect Ghanaians through secure, efficient, and enjoyable commerce.
              </p>
              <p>
                Today, we stand as Ghana&apos;s premier marketplace, powered by advanced technology 
                and driven by our commitment to community, security, and growth.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-orange-500 rounded-3xl p-1">
              <div className="bg-white rounded-3xl p-8 h-full">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">🚀</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Mission</h3>
                  <p className="text-gray-600">
                    To create Africa&apos;s most trusted and innovative marketplace, 
                    empowering every Ghanaian to buy and sell with confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStorySection;
