import { useAffiliateData } from './useAffiliateData';
import { useAffiliateFilters, useAffiliateImageManager } from './hooks';
import {
  AffiliateHeader,
  AffiliateSearchFilters,
  AffiliateTable,
  AffiliateEmptyState,
  AffiliateLoadingState,
  AffiliateErrorState
} from './components';
import Pagination from '../ui/Pagination';

const AffiliateTab = () => {
  const { data, loading, error } = useAffiliateData();
  const { imgSrcMap, handleImageError } = useAffiliateImageManager();
  
  const {
    searchTerm,
    sortBy,
    sortOrder,
    currentPage,
    filteredAndSortedAffiliates,
    paginatedAffiliates,
    totalPages,
    handleSearchChange,
    handleSort,
    handlePageChange,
    clearSearch
  } = useAffiliateFilters({
    affiliates: data?.affiliate || [],
    itemsPerPage: 5 // Reduced to 5 items per page for consistency
  });

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <AffiliateLoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <AffiliateErrorState error={error} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <AffiliateHeader
        totalAffiliates={data?.affiliate?.length || 0}
        filteredCount={filteredAndSortedAffiliates.length}
      />
      
      <AffiliateSearchFilters
        searchTerm={searchTerm}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSearchChange={handleSearchChange}
        onSort={handleSort}
        onClearSearch={clearSearch}
      />

      {paginatedAffiliates.length > 0 ? (
        <>
          <AffiliateTable
            affiliates={paginatedAffiliates}
            imgSrcMap={imgSrcMap}
            onImageError={handleImageError}
          />
          
          {/* Pagination - Only show if there are multiple pages */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                showPageInfo={true}
                totalItems={filteredAndSortedAffiliates.length}
                itemsPerPage={5}
              />
            </div>
          )}
        </>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Affiliate
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date Joined
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AffiliateEmptyState
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

export default AffiliateTab;
