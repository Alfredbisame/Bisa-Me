import React from "react";
import SavedProductCard from "./SavedProductCard";
import { SavedProduct } from "./useSavedData";


interface SavedProductsGridProps {
  products: SavedProduct[];
  onProductClick: (productId: string, e: React.MouseEvent) => void;
}

const SavedProductsGrid: React.FC<SavedProductsGridProps> = ({
  products,
  onProductClick,
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {products.map((product) => (
      <SavedProductCard
        key={product.id}
        product={product}
        onProductClick={onProductClick}
      />
    ))}
  </div>
);

export default SavedProductsGrid;
