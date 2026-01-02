'use client';

import React from 'react';
import BottomNavigation from './BottomNavigation';
import { IconType } from 'react-icons';

interface NavigationItem {
  id: "home" | "categories" | "post" | "messages" | "my-bisame";
  icon: IconType;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BottomNavigationWrapperProps {
  children?: React.ReactNode;
  className?: string;
  navClassName?: string;
  items?: NavigationItem[];
  defaultActive?: string;
}

const BottomNavigationWrapper: React.FC<BottomNavigationWrapperProps> = ({
  children,
  className = '',
  navClassName = '',
  items,
  defaultActive
}) => {
  return (
    <div className={`bg-white flex items-end justify-center min-h-screen p-4 sm:p-6 ${className}`}>
      {children}
      <BottomNavigation 
        className={navClassName}
        items={items}
        defaultActive={defaultActive}
      />
    </div>
  );
};

export default BottomNavigationWrapper;