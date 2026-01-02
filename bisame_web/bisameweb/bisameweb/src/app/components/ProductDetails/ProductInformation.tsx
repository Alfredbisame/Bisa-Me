"use client";
import { useState } from "react";
import TabNavigation from "./ProductInformation/TabNavigation";
import DescriptionTab from "./ProductInformation/DescriptionTab";
import LoadingSkeleton from "./ProductInformation/LoadingSkeleton";
import ErrorDisplay from "./ProductInformation/ErrorDisplay";
import AdditionalInformation from "./AdditionalInformation";
import Reviews from "./Reviews";
import { useProductData } from "./hooks/useProductData";
import type { TabType } from "./ProductInformation/types";
import { useSearchParams } from "next/navigation";

const ProductInformation = () => {
  const [activeTab, setActiveTab] = useState<TabType>("DESCRIPTION");
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const {
    product,
    isLoading,
    hasError: allProductsError,
    error,
  } = useProductData(productId);

  const handleRetry = () => {
    window.location.reload();
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (allProductsError) {
    return <ErrorDisplay error={error} onRetry={handleRetry} />;
  }

  if (!product) {
    return (
      <ErrorDisplay
        error={{ message: "Product not found" }}
        onRetry={handleRetry}
      />
    );
  }

  console.log(product.price);

  return (
    <div className="max-w-8xl mx-auto px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-56 sm:py-6 md:py-8">
      <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          hasNoPrice={product.price == 0 ? true : false}
        />
        <div className="mt-6">
          {activeTab === "DESCRIPTION" && (
            <DescriptionTab
              product={product}
              isLoading={isLoading}
              error={error}
              listingId={productId || undefined}
            />
          )}
          {activeTab === "ADDITIONAL INFORMATION" && product?.price !== 0 && (
            <AdditionalInformation />
          )}
          {activeTab === "REVIEW" && (
            <Reviews listingId={productId} product={product} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInformation;
