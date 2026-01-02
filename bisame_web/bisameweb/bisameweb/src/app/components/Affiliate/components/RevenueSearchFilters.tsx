import React from "react";
import { FaSearch, FaSortAmountDown, FaTimes } from "react-icons/fa";

interface RevenueSearchFiltersProps {
  searchTerm: string;
  sortBy: "name" | "direct" | "indirect" | "total" | "totalAffiliates";
  sortOrder: "asc" | "desc";
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSort: (
    field: "name" | "direct" | "indirect" | "total" | "totalAffiliates"
  ) => void;
  onClearSearch: () => void;
}

const sortLabels: Record<RevenueSearchFiltersProps["sortBy"], string> = {
  name: "Name",
  direct: "Direct Revenue",
  indirect: "Indirect Revenue",
  total: "Total Revenue",
  totalAffiliates: "Total Affiliates",
};

const sortOptions: Array<{
  value: RevenueSearchFiltersProps["sortBy"];
  label: string;
}> = [
  { value: "name", label: "Name (A-Z)" },
  { value: "direct", label: "Direct Revenue" },
  { value: "indirect", label: "Indirect Revenue" },
  { value: "total", label: "Total Revenue" },
  { value: "totalAffiliates", label: "Total Affiliates" },
];

export default function RevenueSearchFilters({
  searchTerm,
  sortBy,
  sortOrder,
  onSearchChange,
  onSort,
  onClearSearch,
}: RevenueSearchFiltersProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8 py-5">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-900">Filter & Sort</h3>
          <p className="mt-1 text-xs text-gray-500">
            Search affiliates and organize revenue data
          </p>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Search Input - Takes more space */}
          <div className="lg:col-span-7">
            <label
              htmlFor="revenue-search"
              className="block text-xs font-medium text-gray-700 mb-2"
            >
              Search Affiliates
            </label>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <FaSearch className="h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
              </div>

              <input
                id="revenue-search"
                type="text"
                value={searchTerm}
                onChange={onSearchChange}
                placeholder="Search by name, ID, or email..."
                className="block w-full pl-10 pr-10 py-2.5 text-sm
                           border border-gray-300 rounded-lg
                           bg-white text-gray-900 placeholder:text-gray-400
                           focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                           transition-shadow duration-200"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={onClearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center
                             text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Clear search"
                >
                  <FaTimes className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Active Filter Badge */}
            {searchTerm && (
              <div className="mt-2 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-50 border border-orange-200">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-xs font-medium text-orange-700">
                    Active filter
                  </span>
                </span>
                <span className="text-xs text-gray-500">
                  Results for:{" "}
                  <span className="font-medium text-gray-700">
                    &quot;{searchTerm}&quot;
                  </span>
                </span>
              </div>
            )}
          </div>

          {/* Sort Controls */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Sort By Dropdown */}
            <div>
              <label
                htmlFor="revenue-sort"
                className="block text-xs font-medium text-gray-700 mb-2"
              >
                Sort By
              </label>

              <div className="relative">
                <select
                  id="revenue-sort"
                  value={sortBy}
                  onChange={(e) =>
                    onSort(
                      e.target.value as RevenueSearchFiltersProps["sortBy"]
                    )
                  }
                  className="block w-full pl-3 pr-10 py-2.5 text-sm
                             border border-gray-300 rounded-lg
                             bg-white text-gray-900
                             focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                             appearance-none cursor-pointer
                             hover:border-gray-400 transition-colors"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Sort Order Toggle */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Order
              </label>

              <button
                type="button"
                onClick={() => onSort(sortBy)}
                className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-2.5
                           border border-gray-300 rounded-lg
                           bg-white text-sm font-medium text-gray-700
                           hover:bg-gray-50 hover:border-gray-400
                           focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                           transition-all duration-200"
                aria-label={`Sort ${
                  sortOrder === "asc" ? "ascending" : "descending"
                }`}
              >
                <FaSortAmountDown
                  className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${
                    sortOrder === "desc" ? "rotate-180" : ""
                  }`}
                />
                <span className="font-semibold">
                  {sortOrder === "asc" ? "Ascending" : "Descending"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                Sorted by{" "}
                <span className="font-semibold text-gray-900">
                  {sortLabels[sortBy]}
                </span>
                {" • "}
                <span className="font-semibold text-gray-900">
                  {sortOrder === "asc" ? "Low to High" : "High to Low"}
                </span>
              </span>
            </div>

            {searchTerm && (
              <button
                onClick={onClearSearch}
                className="text-orange-600 hover:text-orange-700 font-medium transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
