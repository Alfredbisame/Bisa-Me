"use client";
import React from "react";
import BottomNavigation from "./BottomNavigation";
import BottomNavProvider from "./context/BottomNavContext";

const BottomNav = () => {
  return (
    <BottomNavProvider>
      <BottomNavigation />
    </BottomNavProvider>
  );
};

export default BottomNav;
