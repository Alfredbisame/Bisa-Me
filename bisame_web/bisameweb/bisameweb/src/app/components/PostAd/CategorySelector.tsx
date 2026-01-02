"use client";

// import { findSubcategoryById } from "./CategorySelectorComponents";
import CategoryButton from "./CategorySelectorComponents/CategoryButton";
import CategoryModal from "./CategorySelectorComponents/CategoryModal";
import { useCategorySelector } from "./CategorySelectorComponents/useCategorySelector";
// Removed unused import
import { useServiceData } from "./ServiceCategorySelector";

export interface Category {
  id: string;
  name: string;
}

interface CategorySelectorProps {
  selectedCategory: Category | null;
  onSelect: (category: Category) => void;
}

const CategorySelector = ({
  selectedCategory,
  onSelect,
}: CategorySelectorProps) => {
  const { data } = useServiceData("Buy and Sell");

  console.log(data);
  const {
    isOpen,
    searchTerm,
    selectedMainCategory,
    viewMode,
    filteredCategories,
    handleCategorySelect,
    handleMainCategoryClick,
    handleBackToCategories,
    openModal,
    closeModal,
    setSearchTerm,
    loading,
    error,
  } = useCategorySelector({
    onSelect: (categoryId: string) => {
      // Simplified implementation - just use the categoryId as both id and name
      onSelect({ id: categoryId, name: categoryId });
    },
  });

  return (
    <>
      <CategoryButton
        selectedCategory={selectedCategory ? selectedCategory.name : ""}
        onOpen={openModal}
      />
      <CategoryModal
        isOpen={isOpen}
        searchTerm={searchTerm}
        selectedMainCategory={selectedMainCategory}
        viewMode={viewMode}
        filteredCategories={filteredCategories}
        selectedCategory={selectedCategory ? selectedCategory.name : ""}
        loading={loading}
        error={error}
        onClose={closeModal}
        onSearchChange={setSearchTerm}
        onBackToCategories={handleBackToCategories}
        onMainCategoryClick={handleMainCategoryClick}
        onCategorySelect={handleCategorySelect}
      />
    </>
  );
};

export default CategorySelector;
