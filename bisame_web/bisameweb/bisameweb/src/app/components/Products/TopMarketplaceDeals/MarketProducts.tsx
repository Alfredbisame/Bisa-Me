"use client";

import { TopMarketplaceDealsProps } from "./types";
import { useTopMarketplaceDeals, useProductNavigation } from "./hooks";
import {
  TopMarketplaceDealsHeader,
  LoadingSkeleton,
  ErrorState,
  TopMarketplaceDealsProductGrid,
} from "./components";
import React from "react";

const TopMarketplaceDeals = ({
  maxProducts = 4,
  showHeader = true,
  showViewAllLink = true,
}: TopMarketplaceDealsProps) => {
  const { products, error, isLoading } = useTopMarketplaceDeals(maxProducts);
  const { handleProductClick } = useProductNavigation();

  if (isLoading) {
    return <LoadingSkeleton count={maxProducts} />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <div className="w-full bg-white mx-auto px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-56 py-4">
      {showHeader && (
        <TopMarketplaceDealsHeader showViewAllLink={showViewAllLink} />
      )}
      <TopMarketplaceDealsProductGrid
        products={products}
        onProductClick={handleProductClick}
      />
    </div>
  );
};

export default React.memo(TopMarketplaceDeals);
