import React from 'react';
import { MainTab, InfoSubTab, HowtoSubTab } from './types';
import InfoContent from './content/InfoContent';
import HowtoContent from './content/HowtoContent';

interface ContentSectionProps {
  activeMainTab: MainTab;
  activeInfoSubTab: InfoSubTab;
  activeHowtoSubTab: HowtoSubTab;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  activeMainTab,
  activeInfoSubTab,
  activeHowtoSubTab,
}) => {
  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8">
          {activeMainTab === 'info' ? (
            <InfoContent activeSubTab={activeInfoSubTab} />
          ) : (
            <HowtoContent activeSubTab={activeHowtoSubTab} />
          )}
        </div>
      </div>
    </main>
  );
};

export default ContentSection;
