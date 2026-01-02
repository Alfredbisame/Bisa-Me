import ActiveFilters from "@/app/components/ShopSideBar/ActiveFilters";
import React from "react";

interface FilterPageProps {
  productCount?: number | undefined;
}

const FilterPage: React.FC<FilterPageProps> = ({ productCount }) => {
  const activeFilters = [
    { id: "electronics", label: "Electronics Devices" },
    { id: "5-star", label: "5 Star Rating" },
  ];

  const handleRemoveFilter = (filterId: string) => {
    console.log("Removing filter:", filterId);
  };

  return (
    <></>
    // <ActiveFilters
    //   filters={activeFilters}
    //   resultsCount={productCount || 0}
    //   onRemoveFilter={handleRemoveFilter}
    // />
  );
};

export default FilterPage;
