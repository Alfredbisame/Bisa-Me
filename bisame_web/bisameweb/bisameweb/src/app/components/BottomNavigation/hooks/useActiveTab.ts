"use client";

import { useState, useEffect } from "react";

export type defaultActive =
  | "home"
  | "categories"
  | "post"
  | "messages"
  | "my-bisame";

interface ActiveTab {
  active: defaultActive;
  setActiveTab: (tab: defaultActive) => void;
}

const STORAGE_KEY = "activeTab";

const useActiveTab = (activeTab: defaultActive = "home"): ActiveTab => {
  const [active, setActive] = useState<defaultActive>(activeTab);

  // Load saved tab from localStorage on first mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY) as defaultActive | null;
      if (saved) setActive(saved);
    }
  }, []);

  const setActiveTab = (tab: defaultActive) => {
    setActive(tab);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, tab);
    }
  };

  return { active, setActiveTab };
};

export default useActiveTab;
