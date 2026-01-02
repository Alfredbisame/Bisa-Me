'use client';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface ConditionalNavigationProps {
  children: ReactNode;
}

const ConditionalNavigation: React.FC<ConditionalNavigationProps> = ({ children }) => {
  const pathname = usePathname();
  
  // Define routes where navigation should be hidden
  const hideNavigationRoutes = [
    '/help-center',
    '/help-center/',
    // Add other routes where you want to hide navigation
  ];

  const shouldHideNavigation = hideNavigationRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  // If navigation should be hidden, return null
  if (shouldHideNavigation) {
    return null;
  }

  // Otherwise, render the navigation components
  return <>{children}</>;
};

export default ConditionalNavigation;
