'use client';

import React from 'react';

const BottomNavigationDemo: React.FC = () => {
  // Example 1: Default navigation
  const defaultNavigation = (
    <div className="mb-6 sm:mb-8">
      {/* <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800 text-center">Navigation Component</h2>
      <div className="text-center text-gray-600 text-sm sm:text-base">
        The navigation bar is positioned at the bottom of this page.
      </div> */}
    </div>
  );

  // Example 2: Custom navigation items
  // const customItems = [
  //   {
  //     id: 'search',
  //     icon: FaSearch,
  //     label: 'Search',
  //     onClick: () => console.log('Search clicked')
  //   },
  //   {
  //     id: 'favorites',
  //     icon: FaHeart,
  //     label: 'Favorites',
  //     onClick: () => console.log('Favorites clicked')
  //   },
  //   {
  //     id: 'cart',
  //     icon: FaShoppingCart,
  //     label: 'Cart',
  //     onClick: () => console.log('Cart clicked')
  //   },
  //   {
  //     id: 'user',
  //     icon: FaUser,
  //     label: 'Profile',
  //     onClick: () => console.log('Profile clicked')
  //   }
  // ];

  // const customNavigation = (
  //   <div className="mb-8">
  //     <h2 className="text-xl font-bold mb-4 text-gray-800">Custom Navigation</h2>
  //     <BottomNavigation items={customItems} defaultActive="search" />
  //   </div>
  // );

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-6 sm:mb-8">
        Bottom Navigation Component
      </h1>
      
      {defaultNavigation}
      {/* {customNavigation} */}
    </div>
  );
};

export default BottomNavigationDemo; 