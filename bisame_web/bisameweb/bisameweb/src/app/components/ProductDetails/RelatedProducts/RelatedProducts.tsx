"use client";

import { useState } from "react";
import { useProductData } from "@/app/components/ProductDetails/hooks/useProductData";
import { useRelatedProducts } from "./hooks/useRelatedProducts";
import ProductGrid from "./components/ProductGrid";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import EmptyState from "./components/EmptyState";
import { useSearchParams } from "next/navigation";
import Pagination from "@/app/components/ui/Pagination";

const RelatedProducts = () => {
  const [isManualRetrying, setIsManualRetrying] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const listingId = searchParams.get("id");

  const {
    product: selectedProduct,
    isLoading: productLoading,
    hasError: productError,
  } = useProductData(listingId || null);

  // Extract category information from the product
  const category = selectedProduct?.category;
  const subCategory = selectedProduct?.subCategory;
  const childCategory = selectedProduct?.childCategory;

  const {
    products,
    isLoading,
    isRetrying,
    error,
    retry,
    retryCount,
    totalCount,
    totalPages,
  } = useRelatedProducts(
    category,
    subCategory,
    childCategory ?? undefined,
    currentPage,
    12 // pageSize
  );

  const handleRetry = async () => {
    setIsManualRetrying(true);
    try {
      await retry();
    } finally {
      // Add a small delay to show the retrying state
      setTimeout(() => {
        setIsManualRetrying(false);
      }, 1000);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Show loading state while product is loading or related products are loading
  if (productLoading || isLoading) {
    return <LoadingState />;
  }

  // Show error state if there's an error with the main product or related products
  if (productError || error) {
    return (
      <ErrorState
        onRetry={handleRetry}
        isRetrying={isManualRetrying || isRetrying}
        error={error}
        retryCount={retryCount}
      />
    );
  }

  // Show empty state if no products found
  if (!products || !products.length) {
    return <EmptyState />;
  }

  return (
    <div className="max-w-8xl my-5 mx-auto px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-56 sm:py-6 md:py-8">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
        Similar Ads
      </h2>
      <ProductGrid products={products} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          showPageInfo={true}
          totalItems={totalCount}
          itemsPerPage={12}
        />
      )}
    </div>
  );
};

export default RelatedProducts;
