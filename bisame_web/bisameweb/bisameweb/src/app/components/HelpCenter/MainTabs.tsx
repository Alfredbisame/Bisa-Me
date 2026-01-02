import React from 'react';
import { FaInfoCircle, FaLightbulb } from 'react-icons/fa';
import { MainTab } from './types';

interface MainTabsProps {
  activeTab: MainTab;
  onTabChange: (tab: MainTab) => void;
}

const MainTabs: React.FC<MainTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'info' as MainTab, label: 'Information', icon: FaInfoCircle },
    { id: 'howto' as MainTab, label: 'How To', icon: FaLightbulb },
  ];

  return (
    <nav className="bg-blue-900 border-b border-white/10">
      <div className="flex justify-start px-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex items-center gap-2 px-6 py-4 text-sm font-semibold
                transition-all duration-300 ease-in-out
                border-b-4 relative group
                ${isActive 
                  ? 'text-orange-400 border-orange-400 bg-white/5' 
                  : 'text-white/70 border-transparent hover:text-white hover:bg-white/5'
                }
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className={`text-sm transition-transform group-hover:scale-110 ${isActive ? 'text-orange-400' : ''}`} />
              <span>{tab.label}</span>
              
              {/* Hover effect */}
              <div className={`
                absolute inset-0 bg-gradient-to-r from-orange-400/10 to-purple-400/10 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300
                ${isActive ? 'opacity-100' : ''}
              `} />
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MainTabs;
