import React, { createContext, ReactNode, useContext, useState } from "react";

export type defaultActive =
  | "home"
  | "categories"
  | "post"
  | "messages"
  | "my-bisame";

interface BottomContextProps {
  active: defaultActive;
  handleChangeActive: (activeTab: defaultActive) => void;
}

const BottomNavContext = createContext<BottomContextProps | null>(null);

const BottomNavProvider = ({ children }: { children: ReactNode }) => {
  const [active, setActive] = useState<defaultActive>("home");

  const handleChangeActive = (activeTab: defaultActive) => {
    setActive(activeTab);
  };

  return (
    <BottomNavContext.Provider value={{ active, handleChangeActive }}>
      {children}
    </BottomNavContext.Provider>
  );
};

export const useBottomNavContext = () => {
  const context = useContext(BottomNavContext);
  if (!context)
    throw new Error("Failed to wrap component with BottomNavProvider");

  return context;
};

export default BottomNavProvider;
