"use client";

import { LocalServicesProps } from "./types";
import { useLocalServices, useProductNavigation } from "./hooks";
import {
  LocalServicesHeader,
  LoadingSkeleton,
  ErrorState,
  LocalServicesProductGrid,
} from "./components";
import React from "react";

const LocalServices = ({
  maxProducts = 4,
  showHeader = true,
  showViewAllLink = true,
  products: externalProducts,
  isLoading: externalIsLoading,
  error: externalError,
}: LocalServicesProps) => {
  // Only fetch data internally if external products are not provided
  const shouldFetchInternal = !externalProducts;
  const internalData = useLocalServices(maxProducts, {
    skip: !shouldFetchInternal,
  });
  const { handleProductClick } = useProductNavigation();

  const { products, error, isLoading } = externalProducts
    ? {
        products: externalProducts,
        error: externalError,
        isLoading: externalIsLoading || false,
      }
    : internalData;

  if (isLoading) {
    return <LoadingSkeleton count={maxProducts} />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <div className="w-full bg-white mx-auto px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-56 py-4">
      {showHeader && <LocalServicesHeader showViewAllLink={showViewAllLink} />}
      <LocalServicesProductGrid
        products={products}
        onProductClick={handleProductClick}
      />
    </div>
  );
};

export default React.memo(LocalServices) ;
