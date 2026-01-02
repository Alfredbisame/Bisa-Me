'use client';

import React, { useState, useEffect } from 'react';

interface TOCItem {
  id: string;
  title: string;
  icon: string;
}

const tocItems: TOCItem[] = [
  { id: 'introduction', title: 'Introduction', icon: '👋' },
  { id: 'acceptance', title: 'Acceptance of Terms', icon: '✅' },
  { id: 'definitions', title: 'Definitions', icon: '📖' },
  { id: 'eligibility', title: 'Eligibility', icon: '🎯' },
  { id: 'use-website', title: 'Use of the Website', icon: '💻' },
  { id: 'changes-terms', title: 'Changes in Terms of Use', icon: '🔄' },
  { id: 'signing-up', title: 'Signing Up for Account', icon: '✍️' },
  { id: 'the-service', title: 'The Service', icon: '⚙️' },
  { id: 'promotion', title: 'Promotion', icon: '📢' },
  { id: 'guidelines-promotions', title: 'Guidelines for Promotions', icon: '📋' },
  { id: 'benefits', title: 'Benefits', icon: '🎁' },
  { id: 'warranties', title: 'Representations and Warranties', icon: '🛡️' },
  { id: 'conduct', title: 'Your Conduct', icon: '👤' },
  { id: 'indemnity', title: 'Indemnity', icon: '⚖️' },
  { id: 'liability', title: 'Limitation of Liability', icon: '🚫' },
  { id: 'intellectual-property', title: 'Intellectual Property', icon: '💡' },
  { id: 'dispute-resolution', title: 'Dispute Resolution', icon: '🤝' },
  { id: 'contact', title: 'Contact', icon: '📞' }
];

const TableOfContents: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = tocItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(tocItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <span className="mr-2">📋</span>
        Table of Contents
      </h2>
      
      <nav className="space-y-2">
        {tocItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
              activeSection === item.id
                ? 'bg-gradient-to-r from-blue-500 to-orange-500 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm font-medium">{item.title}</span>
            <span className="ml-auto text-xs opacity-60">
              {String(index + 1).padStart(2, '0')}
            </span>
          </button>
        ))}
      </nav>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Click any section to jump directly to it
        </p>
      </div>
    </div>
  );
};

export default TableOfContents;
