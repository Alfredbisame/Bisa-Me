'use client';

import React from 'react';
import TermsSection from './TermsSection';

const DefinitionsSection: React.FC = () => {
  const definitions = [
    { term: "Bisame", definition: "Refers to our online marketplace platform and all associated services." },
    { term: "User", definition: "Any individual who accesses or uses our website and services." },
    { term: "Seller", definition: "A user who lists products or services for sale on our platform." },
    { term: "Buyer", definition: "A user who purchases products or services through our platform." },
    { term: "Content", definition: "All text, images, videos, and other materials posted on our platform." },
    { term: "Transaction", definition: "Any exchange of goods, services, or payments between users." }
  ];

  return (
    <TermsSection id="definitions" title="Definitions" icon="📖" colorScheme="blue">
      <div className="space-y-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          For the purposes of these Terms of Use, the following definitions apply:
        </p>
        
        <div className="grid gap-4">
          {definitions.map((item, index) => (
            <div key={index} className="bg-white/80 rounded-2xl p-6 border border-blue-100">
              <div className="flex flex-col sm:flex-row sm:items-start space-y-2 sm:space-y-0 sm:space-x-4">
                <span className="font-bold text-blue-600 text-lg min-w-fit">
                  &quot;{item.term}&quot;:
                </span>
                <span className="text-gray-700 leading-relaxed">
                  {item.definition}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TermsSection>
  );
};

export default DefinitionsSection;
