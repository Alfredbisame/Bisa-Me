import { useState, useMemo } from 'react';
import { RevenueData } from '../types';

interface UseRevenueFiltersProps {
  revenueData: RevenueData[];
  itemsPerPage?: number;
}

interface UseRevenueFiltersReturn {
  searchTerm: string;
  sortBy: 'name' | 'direct' | 'indirect' | 'total' | 'totalAffiliates';
  sortOrder: 'asc' | 'desc';
  currentPage: number;
  filteredAndSortedData: RevenueData[];
  paginatedData: RevenueData[];
  totalPages: number;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSort: (field: 'name' | 'direct' | 'indirect' | 'total' | 'totalAffiliates') => void;
  handlePageChange: (page: number) => void;
  clearSearch: () => void;
}

const useRevenueFilters = ({ 
  revenueData, 
  itemsPerPage = 10 
}: UseRevenueFiltersProps): UseRevenueFiltersReturn => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'direct' | 'indirect' | 'total' | 'totalAffiliates'>('total');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and sort revenue data
  const filteredAndSortedData = useMemo(() => {
    const filtered = revenueData.filter(item =>
      item.affiliateName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.affiliateName.localeCompare(b.affiliateName);
          break;
        case 'direct':
          comparison = a.direct - b.direct;
          break;
        case 'indirect':
          comparison = a.indirect - b.indirect;
          break;
        case 'total':
          comparison = a.total - b.total;
          break;
        case 'totalAffiliates':
          comparison = a.totalAffiliates - b.totalAffiliates;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [revenueData, searchTerm, sortBy, sortOrder]);
  
  // Paginate the filtered and sorted data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedData.slice(startIndex, endIndex);
  }, [filteredAndSortedData, currentPage, itemsPerPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  // Reset to first page when search term changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSort = (field: 'name' | 'direct' | 'indirect' | 'total' | 'totalAffiliates') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc'); // Default to desc for revenue data
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  return {
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
  };
};

export default useRevenueFilters; 


// import { useState, useMemo } from 'react';
// import { RevenueData } from '../types';

// interface UseRevenueFiltersProps {
//   revenueData: RevenueData[];
//   itemsPerPage?: number;
// }

// interface UseRevenueFiltersReturn {
//   searchTerm: string;
//   sortBy: 'name' | 'today' | 'thisWeek' | 'thisMonth' | 'totalAffiliates';
//   sortOrder: 'asc' | 'desc';
//   currentPage: number;
//   filteredAndSortedData: RevenueData[];
//   paginatedData: RevenueData[];
//   totalPages: number;
//   handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   handleSort: (field: 'name' | 'today' | 'thisWeek' | 'thisMonth' | 'totalAffiliates') => void;
//   handlePageChange: (page: number) => void;
//   clearSearch: () => void;
// }

// const useRevenueFilters = ({ 
//   revenueData, 
//   itemsPerPage = 10 
// }: UseRevenueFiltersProps): UseRevenueFiltersReturn => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState<'name' | 'today' | 'thisWeek' | 'thisMonth' | 'totalAffiliates'>('thisMonth');
//   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
//   const [currentPage, setCurrentPage] = useState(1);

//   // Filter and sort revenue data
//   const filteredAndSortedData = useMemo(() => {
//     const filtered = revenueData.filter(item =>
//       item.affiliateName.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     filtered.sort((a, b) => {
//       let comparison = 0;
//       switch (sortBy) {
//         case 'name':
//           comparison = a.affiliateName.localeCompare(b.affiliateName);
//           break;
//         case 'today':
//           comparison = a.today - b.today;
//           break;
//         case 'thisWeek':
//           comparison = a.thisWeek - b.thisWeek;
//           break;
//         case 'thisMonth':
//           comparison = a.thisMonth - b.thisMonth;
//           break;
//         case 'totalAffiliates':
//           comparison = a.totalAffiliates - b.totalAffiliates;
//           break;
//       }
//       return sortOrder === 'asc' ? comparison : -comparison;
//     });

//     return filtered;
//   }, [revenueData, searchTerm, sortBy, sortOrder]);

//   // Paginate the filtered and sorted data
//   const paginatedData = useMemo(() => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     return filteredAndSortedData.slice(startIndex, endIndex);
//   }, [filteredAndSortedData, currentPage, itemsPerPage]);

//   // Calculate total pages
//   const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

//   // Reset to first page when search term changes
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   const handleSort = (field: 'name' | 'today' | 'thisWeek' | 'thisMonth' | 'totalAffiliates') => {
//     if (sortBy === field) {
//       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortBy(field);
//       setSortOrder('desc'); // Default to desc for revenue data
//     }
//   };
  
//   const clearSearch = () => {
//     setSearchTerm('');
//     setCurrentPage(1);
//   };

//   return {
//     searchTerm,
//     sortBy,
//     sortOrder,
//     currentPage,
//     filteredAndSortedData,
//     paginatedData,
//     totalPages,
//     handleSearchChange,
//     handleSort,
//     handlePageChange,
//     clearSearch
//   };
// };

// export default useRevenueFilters; 