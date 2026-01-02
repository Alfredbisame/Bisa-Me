"use client";

import { useFeaturedProductsData } from "@/app/ProductsPage/hooks/useFeaturedProductsData";
import { useLatestListingsData } from "@/app/ProductsPage/hooks/useLatestListingsData";
import { useLocalServicesData } from "@/app/ProductsPage/hooks/useLocalServicesData";
import { useMarketDealsData } from "@/app/ProductsPage/hooks/useMarketDealsData";
import useShowFilter from "@/app/ProductsPage/hooks/useShowFilter";
import { useTrendingProductsData } from "@/app/ProductsPage/hooks/useTrendingProductsData";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import FilterOptions from "../Products/FilterOptions";
import SearchSort from "../Products/SearchSort";
import FilterPage from "../ShopSideBar/FilterPage";
import AllProducts, { ApiProduct } from "../Products/AllProducts ";
import { BottomNavigation } from "../BottomNavigation";

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const isFeatured = searchParams.get("type") === "featured";
  const isMarketDeals = searchParams.get("type") === "marketdeals";
  const isLocalServices = searchParams.get("type") === "localservices";
  const isLatest = searchParams.get("type") === "latest";
  // const isHistory = searchParams.get("type") === "history";

  // console.log(isHistory);

  // Use the appropriate hook based on the type
  const trendingData = useTrendingProductsData(currentPage, 12);
  const featuredData = useFeaturedProductsData(currentPage, 12);
  const marketDealsData = useMarketDealsData(currentPage, 12);
  const localServicesData = useLocalServicesData(currentPage, 12);
  const latestData = useLatestListingsData(currentPage, 12);
  // const historyData = useBrowsingHistory(currentPage, 12)

  const {
    data: products,
    error,
    isLoading,
    totalPages,
  } = isFeatured
    ? featuredData
    : isMarketDeals
    ? marketDealsData
    : isLocalServices
    ? localServicesData
    : isLatest
    ? latestData
    : trendingData;

  const { showFilter, handleShowFilter } = useShowFilter();

  console.log(products);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen">
      <div className="flex flex-col lg:flex-row gap-4 p-3 lg:px-14 xl:px-20 2xl:px-52">
        {/* <FilterCategory /> */}
        <FilterOptions
          showFilter={showFilter}
          handleShowFilter={handleShowFilter}
        />

        <div className="w-full lg:w-3/4">
          <SearchSort handleShowFilter={handleShowFilter} />
          <FilterPage productCount={products.length} />
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : error ? (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-4 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error.message}</span>
            </div>
          ) : !products || products.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">
                No{" "}
                {isFeatured
                  ? "featured"
                  : isMarketDeals
                  ? "market deals"
                  : isLocalServices
                  ? "local services"
                  : isLatest
                  ? "latest listings"
                  : "trending"}{" "}
                products found
              </p>
            </div>
          ) : (
            <AllProducts
              products={products as unknown as ApiProduct[]}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
        <BottomNavigation />
      </div>
    </main>
  );
};

export default ProductsPage;
