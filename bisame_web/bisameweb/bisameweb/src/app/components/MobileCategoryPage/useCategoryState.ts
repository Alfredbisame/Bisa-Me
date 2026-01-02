import { useState, useCallback, useRef, useEffect } from 'react';
import { CategoryData, Subcategory, ChildCategory } from './types';

interface UseCategoryStateProps {
  onCategorySelect?: (category: CategoryData) => void | Promise<void>;
  onSubcategorySelect?: (subcategory: Subcategory) => void | Promise<void>;
  onChildCategorySelect?: (childCategory: ChildCategory) => void | Promise<void>;
}

export const useCategoryState = ({
  onCategorySelect,
  onSubcategorySelect,
  onChildCategorySelect
}: UseCategoryStateProps) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<{
    category?: CategoryData;
    subcategory?: Subcategory;
    childCategory?: ChildCategory;
  }>({});
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Handle category toggle
  const handleCategoryToggle = useCallback((categoryId: string) => {
    setActiveCategoryId(prevId => prevId === categoryId ? null : categoryId);
  }, []);

  // Handle subcategory selection
  const handleSubcategoryClick = useCallback(async (subcategory: Subcategory) => {
    setIsLoading(true);
    try {
      setSelectedItems(prev => ({ ...prev, subcategory }));
      
      if (onSubcategorySelect) {
        await onSubcategorySelect(subcategory);
      }
      
      // Close dropdown after selection
      setActiveCategoryId(null);
    } catch (error) {
      console.error('Error handling subcategory selection:', error);
    } finally {
      setIsLoading(false);
    }
  }, [onSubcategorySelect]);

  // Handle child category selection
  const handleChildCategoryClick = useCallback(async (childCategory: ChildCategory) => {
    setIsLoading(true);
    try {
      setSelectedItems(prev => ({ ...prev, childCategory }));
      
      if (onChildCategorySelect) {
        await onChildCategorySelect(childCategory);
      }
      
      // Close dropdown after selection
      setActiveCategoryId(null);
    } catch (error) {
      console.error('Error handling child category selection:', error);
    } finally {
      setIsLoading(false);
    }
  }, [onChildCategorySelect]);

  // Handle category selection
  const handleCategorySelect = useCallback(async (category: CategoryData) => {
    setIsLoading(true);
    try {
      setSelectedItems(prev => ({ ...prev, category }));
      
      if (onCategorySelect) {
        await onCategorySelect(category);
      }
    } catch (error) {
      console.error('Error handling category selection:', error);
    } finally {
      setIsLoading(false);
    }
  }, [onCategorySelect]);

  // Close dropdown
  const closeDropdown = useCallback(() => {
    setActiveCategoryId(null);
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        closeDropdown();
      }
    };

    if (activeCategoryId) {
      // Add a small delay to prevent immediate closing
      timeoutRef.current = setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 100);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeCategoryId, closeDropdown]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && activeCategoryId) {
        closeDropdown();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeCategoryId, closeDropdown]);

  // Reset selections
  const resetSelections = useCallback(() => {
    setSelectedItems({});
    setActiveCategoryId(null);
  }, []);

  return {
    activeCategoryId,
    isLoading,
    selectedItems,
    dropdownRef,
    handleCategoryToggle,
    handleSubcategoryClick,
    handleChildCategoryClick,
    handleCategorySelect,
    closeDropdown,
    resetSelections
  };
}; 