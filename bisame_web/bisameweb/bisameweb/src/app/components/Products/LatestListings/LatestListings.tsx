"use client";

import { LatestListingsProps } from "./types";
import { useLatestListings, useProductNavigation } from "./hooks";
import {
  LatestListingsHeader,
  LoadingSkeleton,
  ErrorState,
  LatestListingsProductGrid,
} from "./components";
import React from "react";

const LatestListings = ({
  maxProducts = 4,
  showHeader = true,
  showViewAllLink = true,
}: LatestListingsProps) => {
  const { products, error, isLoading } = useLatestListings(maxProducts);
  const { handleProductClick } = useProductNavigation();

  if (isLoading) {
    return <LoadingSkeleton count={maxProducts} />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <div className="w-full bg-white mx-auto px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-56 py-4">
      {showHeader && <LatestListingsHeader showViewAllLink={showViewAllLink} />}
      <LatestListingsProductGrid
        products={products}
        onProductClick={handleProductClick}
      />
    </div>
  );
};

export default React.memo(LatestListings);
