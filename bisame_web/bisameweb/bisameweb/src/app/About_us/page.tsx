'use client';

import React from 'react';
import BackgroundAnimation from '@/app/components/About/BackgroundAnimation';
import HeroSection from '@/app/components/About/HeroSection';
import OurStorySection from '@/app/components/About/OurStorySection';
import ValuesSection from '@/app/components/About/ValuesSection';
import SafetyTipsSection from '@/app/components/About/SafetyTipsSection';
import EmergencyContact from '@/app/components/About/EmergencyContact';
import CallToAction from '@/app/components/About/CallToAction';

const AboutUsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-orange-50/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <BackgroundAnimation />

      {/* Hero Section */}
      <HeroSection />

      {/* Our Story Section */}
      <OurStorySection />

      {/* Values Section */}
      <ValuesSection />

      {/* Safety Tips Section */}
      <SafetyTipsSection />

      {/* Emergency Contact Section */}
      <div className="px-4">
        <div className="max-w-7xl mx-auto">
          <EmergencyContact />
        </div>
      </div>

      {/* Call to Action Section */}
      <CallToAction />
    </div>
  );
};

export default AboutUsPage;
