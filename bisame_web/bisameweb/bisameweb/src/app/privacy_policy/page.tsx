"use client";
import React from 'react';
import PrivacyPolicyHeader from '@/app/components/PrivacyPolicy/PrivacyPolicyHeader';
import PrivacyPolicySection from '@/app/components/PrivacyPolicy/PrivacyPolicySection';
import DataCollectionSection from '@/app/components/PrivacyPolicy/DataCollectionSection';
import DataUsageSection from '@/app/components/PrivacyPolicy/DataUsageSection';
import SecuritySection from '@/app/components/PrivacyPolicy/SecuritySection';
import ChildrenSection from '@/app/components/PrivacyPolicy/ChildrenSection';
import AdvertisementPolicySection from '@/app/components/PrivacyPolicy/AdvertisementPolicySection';
import RejectedAdsSection from '@/app/components/PrivacyPolicy/RejectedAdsSection';
import TaxSection from '@/app/components/PrivacyPolicy/TaxSection';
import VATSection from '@/app/components/PrivacyPolicy/VATSection';
import ContactSection from '@/app/components/PrivacyPolicy/ContactSection';
import TableOfContents from '@/app/components/PrivacyPolicy/TableOfContents';
import IntroductionSection from '@/app/components/PrivacyPolicy/IntroductionSection';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <PrivacyPolicyHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents - Sidebar */}
          <div className="lg:col-span-1">
            <TableOfContents />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <IntroductionSection />
            <PrivacyPolicySection />
            <DataCollectionSection />
            <DataUsageSection />
            <SecuritySection />
            <ChildrenSection />
            <AdvertisementPolicySection />
            <RejectedAdsSection />
            <TaxSection />
            <VATSection />
            <ContactSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
