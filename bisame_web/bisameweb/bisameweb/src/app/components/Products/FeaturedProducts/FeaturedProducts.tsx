"use client";

import { FeaturedProductsProps } from "./types";
import { useFeaturedProducts, useProductNavigation } from "./hooks";
import {
  FeaturedHeader,
  LoadingSkeleton,
  ErrorState,
  FeaturedProductGrid,
} from "./components";
import React from "react";

const FeaturedProducts = ({
  maxProducts = 4,
  showHeader = true,
  showViewAllLink = true,
}: FeaturedProductsProps) => {
  const { products, error, isLoading } = useFeaturedProducts(maxProducts);
  const { handleProductClick } = useProductNavigation();

  if (isLoading) {
    return <LoadingSkeleton count={maxProducts} />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <div className="w-full bg-white mx-auto px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-56 py-4">
      {showHeader && <FeaturedHeader showViewAllLink={showViewAllLink} />}
      <FeaturedProductGrid
        products={products}
        onProductClick={handleProductClick}
      />
    </div>
  );
};

export default React.memo(FeaturedProducts);
