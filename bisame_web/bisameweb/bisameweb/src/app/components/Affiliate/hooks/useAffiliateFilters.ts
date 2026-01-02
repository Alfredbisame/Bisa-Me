import { useState, useMemo } from 'react';
import { AffiliateUser } from '../types';

interface UseAffiliateFiltersProps {
  affiliates: AffiliateUser[];
  itemsPerPage?: number;
}

interface UseAffiliateFiltersReturn {
  searchTerm: string;
  sortBy: 'name' | 'date';
  sortOrder: 'asc' | 'desc';
  currentPage: number;
  filteredAndSortedAffiliates: AffiliateUser[];
  paginatedAffiliates: AffiliateUser[];
  totalPages: number;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSort: (field: 'name' | 'date') => void;
  handlePageChange: (page: number) => void;
  clearSearch: () => void;
}

const useAffiliateFilters = ({ 
  affiliates, 
  itemsPerPage = 10 
}: UseAffiliateFiltersProps): UseAffiliateFiltersReturn => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and sort affiliates
  const filteredAndSortedAffiliates = useMemo(() => {
    const filtered = affiliates.filter(affiliate =>
      affiliate.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else {
        comparison = new Date(a.datetime).getTime() - new Date(b.datetime).getTime();
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [affiliates, searchTerm, sortBy, sortOrder]);

  // Paginate the filtered and sorted affiliates
  const paginatedAffiliates = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedAffiliates.slice(startIndex, endIndex);
  }, [filteredAndSortedAffiliates, currentPage, itemsPerPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredAndSortedAffiliates.length / itemsPerPage);

  // Reset to first page when search term changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSort = (field: 'name' | 'date') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
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
    filteredAndSortedAffiliates,
    paginatedAffiliates,
    totalPages,
    handleSearchChange,
    handleSort,
    handlePageChange,
    clearSearch
  };
};

export default useAffiliateFilters; 