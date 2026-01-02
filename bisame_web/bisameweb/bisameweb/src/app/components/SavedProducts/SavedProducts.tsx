"use client";

import React from "react";
import SavedProductsGrid from "./SavedProductsGrid";
import EmptySavedProducts from "./EmptySavedProducts";
import { useSavedData, type SavedProduct } from "./useSavedData";
import ProductsHeader from "./SavedProductsHeader";

const SavedProducts: React.FC = () => {
  const { data, loading, error } = useSavedData();

  const products: SavedProduct[] = data?.products ?? [];

  const handleProductClick = (productId: string, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".delete-button")) {
      return;
    }
    console.log("Navigate to product:", productId);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="container">
          <ProductsHeader
            header="Saved Products"
            description="These are products you’ve saved for later. You can revisit or manage
        them anytime."
          />
          <div className="animate-pulse">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="border p-2 rounded-md">
                  <div className="h-40 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto">
          <ProductsHeader
            header="Saved Products"
            description="These are products you’ve saved for later. You can revisit or manage
        them anytime."
          />
          <div className="text-center py-12">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <ProductsHeader
          header="Saved Products"
          description="These are products you’ve saved for later. You can revisit or manage
        them anytime."
          productsCount={products.length}
        />
        {products.length > 0 ? (
          <SavedProductsGrid
            products={products}
            onProductClick={handleProductClick}
          />
        ) : (
          <EmptySavedProducts />
        )}
      </div>
    </div>
  );
};

export default SavedProducts;
