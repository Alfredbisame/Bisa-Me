import React from 'react';
import { FaHome, FaShoppingCart, FaTv, FaUserPlus, FaDollarSign, FaBullhorn } from 'react-icons/fa';
import { MainTab, InfoSubTab, HowtoSubTab } from './types';

interface SubNavigationProps {
  activeMainTab: MainTab;
  activeInfoSubTab: InfoSubTab;
  activeHowtoSubTab: HowtoSubTab;
  onInfoSubTabChange: (tab: InfoSubTab) => void;
  onHowtoSubTabChange: (tab: HowtoSubTab) => void;
}

const SubNavigation: React.FC<SubNavigationProps> = ({
  activeMainTab,
  activeInfoSubTab,
  activeHowtoSubTab,
  onInfoSubTabChange,
  onHowtoSubTabChange,
}) => {
  const infoTabs = [
    { id: 'mainpage' as InfoSubTab, label: 'Main Page', icon: FaHome },
    { id: 'buysell' as InfoSubTab, label: 'Buy/Sell', icon: FaShoppingCart },
    { id: 'bisametv' as InfoSubTab, label: 'Bisame TV', icon: FaTv },
  ];

  const howtoTabs = [
    { id: 'register' as HowtoSubTab, label: 'Register', icon: FaUserPlus },
    { id: 'earnincome' as HowtoSubTab, label: 'Earn Income', icon: FaDollarSign },
    { id: 'promotions' as HowtoSubTab, label: 'Promotions', icon: FaBullhorn },
  ];

  const currentTabs = activeMainTab === 'info' ? infoTabs : howtoTabs;
  const activeSubTab = activeMainTab === 'info' ? activeInfoSubTab : activeHowtoSubTab;
  const onSubTabChange: (tab: InfoSubTab | HowtoSubTab) => void =
    activeMainTab === 'info'
      ? (onInfoSubTabChange as (tab: InfoSubTab | HowtoSubTab) => void)
      : (onHowtoSubTabChange as (tab: InfoSubTab | HowtoSubTab) => void);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="flex justify-start px-6 overflow-x-auto">
        {currentTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onSubTabChange(tab.id)}
              className={`
                flex items-center gap-2 px-6 py-4 text-sm font-semibold whitespace-nowrap
                transition-all duration-300 ease-in-out
                border-b-4 relative group min-w-fit
                ${isActive 
                  ? 'text-orange-500 border-orange-500 bg-orange-50' 
                  : 'text-gray-600 border-transparent hover:text-orange-500 hover:bg-orange-50/50'
                }
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className={`text-sm transition-all group-hover:scale-110 ${isActive ? 'text-orange-500' : 'text-gray-500'}`} />
              <span>{tab.label}</span>
              
              {/* Active indicator */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-orange-500/10 rounded-t-lg" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default SubNavigation;
