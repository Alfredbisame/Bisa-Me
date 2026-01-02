"use client";

import { useState } from "react";

const useShowFilter = () => {
  const [showFilter, setShowFilter] = useState(false);

  const handleShowFilter = () => {
    setShowFilter(prev => !prev);
  };

  return { showFilter, handleShowFilter };
};

export default useShowFilter;
