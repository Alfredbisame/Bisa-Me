'use client';

import React from 'react';
import TermsHeader from '@/app/components/TermsOfUse/TermsHeader';
import TableOfContents from '@/app/components/TermsOfUse/TableOfContents';
import IntroductionSection from '@/app/components/TermsOfUse/IntroductionSection';
import AcceptanceSection from '@/app/components/TermsOfUse/AcceptanceSection';
import DefinitionsSection from '@/app/components/TermsOfUse/DefinitionsSection';
import EligibilitySection from '@/app/components/TermsOfUse/EligibilitySection';
import UseWebsiteSection from '@/app/components/TermsOfUse/UseWebsiteSection';
import ChangesTermsSection from '@/app/components/TermsOfUse/ChangesTermsSection';
import SigningUpSection from '@/app/components/TermsOfUse/SigningUpSection';
import TheServiceSection from '@/app/components/TermsOfUse/TheServiceSection';
import PromotionSection from '@/app/components/TermsOfUse/PromotionSection';
import GuidelinesPromotionsSection from '@/app/components/TermsOfUse/GuidelinesPromotionsSection';
import BenefitsSection from '@/app/components/TermsOfUse/BenefitsSection';
import WarrantiesSection from '@/app/components/TermsOfUse/WarrantiesSection';
import ConductSection from '@/app/components/TermsOfUse/ConductSection';
import IndemnitySection from '@/app/components/TermsOfUse/IndemnitySection';
import LiabilitySection from '@/app/components/TermsOfUse/LiabilitySection';
import IntellectualPropertySection from '@/app/components/TermsOfUse/IntellectualPropertySection';
import DisputeResolutionSection from '@/app/components/TermsOfUse/DisputeResolutionSection';
import ContactSection from '@/app/components/TermsOfUse/ContactSection';

const TermsOfUsePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <TermsHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Table of Contents - Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-8">
              <TableOfContents />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="space-y-12">
              <IntroductionSection />
              <AcceptanceSection />
              <DefinitionsSection />
              <EligibilitySection />
              <UseWebsiteSection />
              <ChangesTermsSection />
              <SigningUpSection />
              <TheServiceSection />
              <PromotionSection />
              <GuidelinesPromotionsSection />
              <BenefitsSection />
              <WarrantiesSection />
              <ConductSection />
              <IndemnitySection />
              <LiabilitySection />
              <IntellectualPropertySection />
              <DisputeResolutionSection />
              <ContactSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUsePage;
