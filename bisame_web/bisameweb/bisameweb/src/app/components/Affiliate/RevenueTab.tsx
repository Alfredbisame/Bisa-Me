import { useRevenueFilters } from './hooks';
import {
  RevenueHeader,
  RevenueSearchFilters,
  RevenueTable,
  RevenueEmptyState
} from './components';
import Pagination from '../ui/Pagination';
import { useAffiliateData } from './useAffiliateData';

const RevenueTab = () => {
  const { revenueData, loading, error } = useAffiliateData();

  const {
    searchTerm,
    sortBy,
    sortOrder,
    currentPage,
    filteredAndSortedData,
    paginatedData,
    totalPages,
    handleSearchChange,
    handleSort,
    handlePageChange,
    clearSearch
  } = useRevenueFilters({
    revenueData: revenueData || [],
    itemsPerPage: 5 
  });

  // Calculate totals for the filtered data
  const totals = filteredAndSortedData.reduce(
    (acc, item) => ({
      affiliates: acc.affiliates + (item.totalAffiliates || 0),
      direct: acc.direct + (item.direct || 0),
      indirect: acc.indirect + (item.indirect || 0),
      total: acc.total + ((item.direct || 0) + (item.indirect || 0)),
    }),
    { affiliates: 0, direct: 0, indirect: 0, total: 0 }
  );

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading revenue data...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <RevenueHeader
        totalRevenue={revenueData ? revenueData.length : 0}
        filteredCount={filteredAndSortedData.length}
      />
      
      <RevenueSearchFilters
        searchTerm={searchTerm}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSearchChange={handleSearchChange}
        onSort={handleSort}
        onClearSearch={clearSearch}
      />

      {paginatedData.length > 0 ? (
        <>
          <RevenueTable
            revenueData={paginatedData}
            totals={totals}
          />
          
          {/* Pagination - Only show if there are multiple pages */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                showPageInfo={true}
                totalItems={filteredAndSortedData.length}
                itemsPerPage={5}
              />
            </div>
          )}
        </>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col style={{ width: '160px' }} />
            </colgroup>
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Affiliate
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Direct(2.5%)
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Indirect(0.75%)
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              <RevenueEmptyState
                searchTerm={searchTerm}
                onClearSearch={clearSearch}
              />
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RevenueTab;
