import { useState, useMemo } from "react";
import { useCategoryData, searchSubcategories } from "./useCategoryData";

export interface CategorySelectorCallbacks {
  onSelect: (category: string) => void;
}

export interface FilteredCategoryItem {
  id: string;
  name: string;
  type: "sub";
  icon: string;
  parent: string;
}

export const useCategorySelector = (callbacks: CategorySelectorCallbacks) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMainCategory, setSelectedMainCategory] = useState<
    string | null
  >(null);
  const [viewMode, setViewMode] = useState<"categories" | "subcategories">(
    "categories"
  );

  const { data, loading, error } = useCategoryData("Buy and Sell");

  const filteredCategories = useMemo((): FilteredCategoryItem[] => {
    if (!searchTerm.trim()) return [];

    const searchResults = searchSubcategories(data, searchTerm);

    return searchResults.map((subcategory) => ({
      id: subcategory.id,
      name: subcategory.category,
      type: "sub" as const,
      icon: subcategory.image_link,
      parent: subcategory.parentCategory,
    }));
  }, [data, searchTerm]);

  const handleCategorySelect = (categoryId: string) => {
    callbacks.onSelect(categoryId);
    closeModal();
  };

  const handleMainCategoryClick = (category: string) => {
    setSelectedMainCategory(category);
    setViewMode("subcategories");
  };

  const handleBackToCategories = () => {
    setSelectedMainCategory(null);
    setViewMode("categories");
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSearchTerm("");
    setSelectedMainCategory(null);
    setViewMode("categories");
  };

  return {
    // State
    isOpen,
    searchTerm,
    selectedMainCategory,
    viewMode,
    filteredCategories,
    loading,
    error,

    // Handlers
    handleCategorySelect,
    handleMainCategoryClick,
    handleBackToCategories,
    openModal,
    closeModal,
    setSearchTerm,
  };
};
