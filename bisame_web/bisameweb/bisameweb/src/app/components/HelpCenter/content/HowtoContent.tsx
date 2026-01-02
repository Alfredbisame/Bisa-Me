import React from 'react';
import { FaUserPlus, FaUser, FaDollarSign, FaLink, FaStore, FaBullhorn, FaChartLine, FaCog } from 'react-icons/fa';
import { HowtoSubTab } from '../types';
import ContentCard from './ContentCard';

interface HowtoContentProps {
  activeSubTab: HowtoSubTab;
}

const HowtoContent: React.FC<HowtoContentProps> = ({ activeSubTab }) => {
  const renderRegisterContent = () => (
    <div className="space-y-8">
      <ContentCard
        icon={<FaUserPlus className="text-2xl text-blue-500" />}
        title="HOW TO REGISTER"
        content="To register on Bisame, download the app and fill out the registration form with your personal details. Verify your email or phone number to complete the process."
      />
      
      <ContentCard
        icon={<FaUser className="text-2xl text-green-500" />}
        title="Account Setup"
        content="After registration, set up your profile by adding a photo, business details, and preferences to get the best experience."
      />
    </div>
  );

  const renderEarnIncomeContent = () => (
    <div className="space-y-8">
      <ContentCard
        icon={<FaDollarSign className="text-2xl text-blue-500" />}
        title="HOW TO EARN INCOME"
        content="Earn income by promoting products, providing services, or joining the affiliate program within Bisame."
      />
      
      <ContentCard
        icon={<FaLink className="text-2xl text-green-500" />}
        title="Affiliate Program"
        content="Share referral links and earn commissions when new users sign up or make purchases through your link."
      />
      
      <ContentCard
        icon={<FaStore className="text-2xl text-purple-500" />}
        title="Service Sales"
        content="List your services or products for sale and connect with customers directly."
      />
    </div>
  );

  const renderPromotionsContent = () => (
    <div className="space-y-8">
      <ContentCard
        icon={<FaBullhorn className="text-2xl text-blue-500" />}
        title="HOW TO USE PROMOTIONS"
        content="Create and manage promotions to attract more customers and increase sales."
      />
      
      <ContentCard
        icon={<FaCog className="text-2xl text-green-500" />}
        title="Creating Promotions"
        content="Use the promotions dashboard to set discounts, special offers, or bundle deals."
      />
      
      <ContentCard
        icon={<FaChartLine className="text-2xl text-purple-500" />}
        title="Tracking Performance"
        content="Monitor the success of your promotions with analytics and adjust your strategy accordingly."
      />
    </div>
  );

  switch (activeSubTab) {
    case 'register':
      return renderRegisterContent();
    case 'earnincome':
      return renderEarnIncomeContent();
    case 'promotions':
      return renderPromotionsContent();
    default:
      return renderRegisterContent();
  }
};

export default HowtoContent;
