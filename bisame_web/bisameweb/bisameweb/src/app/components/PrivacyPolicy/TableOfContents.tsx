"use client";
import React, { useState, useEffect } from 'react';
import { FaChevronRight } from 'react-icons/fa';

const tableOfContentsItems = [
  { id: 'introduction', title: 'Introduction', icon: '📖' },
  { id: 'privacy-policy', title: 'Privacy Policy', icon: '🔒' },
  { id: 'data-collection', title: 'How Bisame Collects Information', icon: '📊' },
  { id: 'data-usage', title: 'How Bisame Uses Your Data', icon: '🔄' },
  { id: 'security', title: 'Security', icon: '🛡️' },
  { id: 'children', title: 'Children', icon: '👶' },
  { id: 'advertisement-policy', title: 'Advertisement Policy', icon: '📢' },
  { id: 'rejected-ads', title: 'Rejected Ads', icon: '❌' },
  { id: 'tax-reductions', title: 'Tax Reductions', icon: '💰' },
  { id: 'vat', title: 'VAT', icon: '📋' },
  { id: 'contact', title: 'Contact Information', icon: '📞' },
];

const TableOfContents = () => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContentsItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(tableOfContentsItems[i].id);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="sticky top-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
          <h3 className="text-white font-bold text-lg">Table of Contents</h3>
        </div>
        
        <nav className="p-2">
          {tableOfContentsItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center space-x-3 group ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 border-l-4 border-orange-500'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="flex-1 text-sm font-medium">{item.title}</span>
              <FaChevronRight
                className={`w-3 h-3 transition-transform duration-200 ${
                  activeSection === item.id ? 'text-orange-500 transform rotate-90' : 'text-gray-400 group-hover:text-gray-600'
                }`}
              />
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TableOfContents;
