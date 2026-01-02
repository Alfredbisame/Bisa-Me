import React from "react";
import { HistoryRootProps } from "./interfaces";
import HistoryProductGrid from "./HistoryProductGrid";

interface AllProductsProps {
  products: HistoryRootProps[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const AllProductHistory: React.FC<AllProductsProps> = ({
  products = [],
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
}) => {
  return (
    <HistoryProductGrid
      products={products}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  );
};

export default AllProductHistory;
