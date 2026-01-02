import React from "react";
import { HistoryRootProps } from "./interfaces";
import Pagination from "../ui/Pagination";
import ProductHistoryCard from "./ProductHistoryCard";

interface ProductGridProps {
  products: HistoryRootProps[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const HistoryProductGrid: React.FC<ProductGridProps> = ({
  products,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-10 py-5">
        <div className="bg-orange-400  mb-6 p-1 md:p-2">
          <h1 className="text-white md:text-lg xl:text-xl font-semibold">
            Recently Viewed
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductHistoryCard key={product.id} product={product} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          showPageInfo={true}
        />
      </div>
    </div>
  );
};

export default HistoryProductGrid;
