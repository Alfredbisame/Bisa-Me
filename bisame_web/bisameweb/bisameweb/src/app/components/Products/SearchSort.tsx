// import SearchBar from '@/app/components/ShopSideBar/SearchBar';
import SortDropdown from "@/app/components/ShopSideBar/SortDropdown";
import FilterButton from "./FilterButton";
import { IoFilterCircleSharp } from "react-icons/io5";
import React from "react";

interface SearchSortProps {
  handleShowFilter?: () => void;
}

const SearchSort: React.FC<SearchSortProps> = ({ handleShowFilter }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-grow">
        {/* <SearchBar /> */}
        {/* <Filter button /> */}
        <FilterButton
          label="Filter"
          styles="block md:hidden border border-orange-500 text-orange-500 text-sm px-3 py-1 hover:opacity-90 hover:scale transition-all duration-200 ease-in-out rounded-lg flex items-center gap-2"
          icon={<IoFilterCircleSharp size={20} color="#ea580c" />}
          action={handleShowFilter}
        />
      </div>
      <div className="w-48 mr-16">
        <SortDropdown />
      </div>
    </div>
  );
};

export default SearchSort;
