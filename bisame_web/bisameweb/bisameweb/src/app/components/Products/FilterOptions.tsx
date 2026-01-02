"use client";
import React from "react";
import PriceRange from "../ShopSideBar/PriceRange";
import PopularBrands from "../ShopSideBar/PopularBrands";
import PopularTags from "../ShopSideBar/PopularTags";
import FilterButton from "./FilterButton";
import CloseIcon from "../ui/CloseIcon";
import { AnimatePresence, motion } from "framer-motion";

interface FilterOptionsProps {
  showFilter: boolean;
  handleShowFilter: () => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  showFilter,
  handleShowFilter,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className={`${
          showFilter ? "block" : "hidden md:block"
        } w-full fixed inset-0 overflow-y-scroll md:overflow-auto z-40 bg-white md:static lg:w-1/4`}
        initial={{
          opacity: showFilter ? 0 : 1,
          x: -5,
        }}
        whileInView={{
          opacity: showFilter ? 1 : undefined,
          x: 0,
        }}
        exit={{ opacity: 0, x: -300 }}
        transition={{ duration: 0.5, delay: 0 }}
      >
        <div className="md:flex lg:block">
          <CloseIcon handleShowFilter={handleShowFilter} />
          <PriceRange />
          <PopularBrands />
        </div>

        <PopularTags />

        <FilterButton
          label="Filter"
          styles=" md:hidden m-3 border bg-orange-500 text-white text-sm px-6 py-1 hover:opacity-90 hover:scale transition-all duration-200 ease-in-out rounded-lg flex items-center gap-2"
          action={handleShowFilter}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default FilterOptions;
