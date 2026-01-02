import React from 'react';
import { FaSearch, FaList, FaPlus, FaShoppingBag, FaTv, FaUpload, FaUsers } from 'react-icons/fa';
import { InfoSubTab } from '../types';
import ContentCard from './ContentCard';

interface InfoContentProps {
  activeSubTab: InfoSubTab;
}

const InfoContent: React.FC<InfoContentProps> = ({ activeSubTab }) => {
  const renderMainPageContent = () => (
    <div className="space-y-8">
      <ContentCard
        icon={<FaSearch className="text-2xl text-blue-500" />}
        title="GENERAL OVERVIEW OF BISAME"
        content="Bisame is a social app that connects businesses and service Providers to customers in a unique way. Bisame also has job Creation module through an affiliate program."
      />
      
      <ContentCard
        icon={<FaSearch className="text-2xl text-green-500" />}
        title="Help Center"
        content="This connects visitors to the knowledge center of bisame. It walks you through the bisame app. Almost all your questions are answered here."
      />
      
      <ContentCard
        icon={<FaSearch className="text-2xl text-purple-500" />}
        title="Search"
        content={
          <div>
            <p>This enables you to search through the category, search specific product or service.</p>
            <ul className="mt-3 space-y-1 text-sm text-gray-600">
              <li>1. Select the desired location.</li>
              <li>2. Default location shall always be where you are if you have enabled location on your device.</li>
            </ul>
          </div>
        }
      />
      
      <ContentCard
        icon={<FaList className="text-2xl text-orange-500" />}
        title="Categories"
        content="Organizes the various businesses/service providers. The list on the far left are the main categories. You click on the main category and its sub-category opens to the right for you. Click on view all to see all the sub-categories. You can use the search option as well."
      />
      
      <ContentCard
        icon={<FaPlus className="text-2xl text-red-500" />}
        title="Post"
        content="This is when you will want to place your business/service or post an item for sale on the app. Fill the form and click on post."
      />
    </div>
  );

  const renderBuySellContent = () => (
    <div className="space-y-8">
      <ContentCard
        icon={<FaShoppingBag className="text-2xl text-blue-500" />}
        title="BUY/SELL OVERVIEW"
        content="The Buy/Sell section allows users to post items for sale or browse items listed by others. You can filter by category, price, and location."
      />
      
      <ContentCard
        icon={<FaPlus className="text-2xl text-green-500" />}
        title="Posting an Item"
        content="To post an item, fill out the form with details such as title, description, price, and upload images. Once submitted, your item will be visible to other users."
      />
      
      <ContentCard
        icon={<FaSearch className="text-2xl text-purple-500" />}
        title="Browsing Items"
        content="Use the search bar or browse categories to find items you want to buy. Contact sellers directly through the app to negotiate or ask questions."
      />
    </div>
  );

  const renderBisameTvContent = () => (
    <div className="space-y-8">
      <ContentCard
        icon={<FaTv className="text-2xl text-blue-500" />}
        title="BISAME TV"
        content="Bisame TV is a video platform integrated within the app where users can watch tutorials, product demos, and promotional content from businesses."
      />
      
      <ContentCard
        icon={<FaUsers className="text-2xl text-green-500" />}
        title="Channels"
        content="Subscribe to channels of your favorite businesses or content creators to stay updated with their latest videos."
      />
      
      <ContentCard
        icon={<FaUpload className="text-2xl text-purple-500" />}
        title="Uploading Videos"
        content="Businesses can upload videos to showcase their products or services and engage with customers."
      />
    </div>
  );

  switch (activeSubTab) {
    case 'mainpage':
      return renderMainPageContent();
    case 'buysell':
      return renderBuySellContent();
    case 'bisametv':
      return renderBisameTvContent();
    default:
      return renderMainPageContent();
  }
};

export default InfoContent;
