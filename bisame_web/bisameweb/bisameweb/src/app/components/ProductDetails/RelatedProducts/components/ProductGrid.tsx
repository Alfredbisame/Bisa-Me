"use client";

import { useRouter } from "next/navigation";
import { Product } from "../types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const router = useRouter();

  const handleProductClick = (product: Product) => {
    if (product.id || product._id) {
      const productId = product.id || product._id;
      router.push(`/ProductDetails?id=${productId}`);
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full">
        {products.map((product: Product, index: number) => (
          <ProductCard
            key={product.id || product._id}
            product={product}
            onClick={handleProductClick}
            priority={index < 4}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;