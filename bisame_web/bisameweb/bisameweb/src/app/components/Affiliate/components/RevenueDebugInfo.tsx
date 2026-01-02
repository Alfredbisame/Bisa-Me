// interface RevenueDebugInfoProps {
//   currentPage: number;
//   totalPages: number;
//   totalItems: number;
//   itemsPerPage: number;
//   filteredCount: number;
//   paginatedCount: number;
// }

// const RevenueDebugInfo = ({
//   currentPage,
//   totalPages,
//   totalItems,
//   itemsPerPage,
//   filteredCount,
//   paginatedCount
// }: RevenueDebugInfoProps) => {
//   if (process.env.NODE_ENV === 'production') return null;

//   return (
//     <div className="px-6 py-2 bg-blue-50 border-b border-blue-200 text-xs text-blue-700">
//       <div className="flex flex-wrap gap-4">
//         <span>Page: {currentPage} / {totalPages}</span>
//         <span>Items: {paginatedCount} of {filteredCount} (filtered from {totalItems})</span>
//         <span>Per Page: {itemsPerPage}</span>
//         <span>Show Pagination: {totalPages > 1 ? 'Yes' : 'No'}</span>
//       </div>
//     </div>
//   );
// };

// export default RevenueDebugInfo; 