'use client';
import React, { useState } from 'react';
import HelpHeader from './HelpHeader';
import MainTabs from './MainTabs';
import SubNavigation from './SubNavigation';
import ContentSection from './ContentSection';
import { MainTab, InfoSubTab, HowtoSubTab } from './types';
// import SearchBar from './SearchBar';

const HelpCenter: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState<MainTab>('info');
  const [activeInfoSubTab, setActiveInfoSubTab] = useState<InfoSubTab>('mainpage');
  const [activeHowtoSubTab, setActiveHowtoSubTab] = useState<HowtoSubTab>('register');

  const handleMainTabChange = (tab: MainTab) => {
    setActiveMainTab(tab);
    // Reset sub-tabs to default when switching main tabs
    if (tab === 'info') {
      setActiveInfoSubTab('mainpage');
    } else {
      setActiveHowtoSubTab('register');
    }
  };

  
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50">
      <HelpHeader />
      
      <MainTabs 
        activeTab={activeMainTab}
        onTabChange={handleMainTabChange}
      />
      
      <SubNavigation
        activeMainTab={activeMainTab}
        activeInfoSubTab={activeInfoSubTab}
        activeHowtoSubTab={activeHowtoSubTab}
        onInfoSubTabChange={setActiveInfoSubTab}
        onHowtoSubTabChange={setActiveHowtoSubTab}
      />

       {/* Search Bar */}
      {/* <div className="max-w-4xl mx-auto px-6 pt-6">
        <SearchBar 
          onSearch={handleSearch}
          placeholder="Search help articles..."
        />
      </div> */}
      
      <ContentSection
        activeMainTab={activeMainTab}
        activeInfoSubTab={activeInfoSubTab}
        activeHowtoSubTab={activeHowtoSubTab}
      />
    </div>
  );
};

export default HelpCenter;
