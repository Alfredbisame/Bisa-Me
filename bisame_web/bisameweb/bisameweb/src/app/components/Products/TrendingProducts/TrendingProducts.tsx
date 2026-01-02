"use client";

import { TrendingProductsProps } from "./types";
import { useTrendingProducts, useProductNavigation } from "./hooks";
import {
  TrendingHeader,
  LoadingSkeleton,
  ErrorState,
  TrendingProductGrid,
} from "./components";
import { memo } from "react";

const TrendingProducts = ({
  maxProducts = 4,
  showHeader = true,
  showViewAllLink = true,
}: TrendingProductsProps) => {
  const { products, error, isLoading, retry } =
    useTrendingProducts(maxProducts);
  const { handleProductClick } = useProductNavigation();

  if (isLoading) {
    return <LoadingSkeleton count={maxProducts} />;
  }

  if (error) {
    return <ErrorState onRetry={retry} />;
  }

  return (
    <div className="w-full bg-white mx-auto px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-56 py-4">
      {showHeader && <TrendingHeader showViewAllLink={showViewAllLink} />}
      <TrendingProductGrid
        products={products}
        onProductClick={handleProductClick}
      />
    </div>
  );
};

export default memo(TrendingProducts);
