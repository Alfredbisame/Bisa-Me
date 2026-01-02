"use client";

import React, { useState, useCallback, useEffect } from "react";
import { CategoryPageProps, Subcategory, ChildCategory } from "./types";
import { defaultCategories } from "./data";
import CategoryCard from "./CategoryCard";
import styles from "./styles.module.css";

const MobileCategoryPage: React.FC<CategoryPageProps> = ({
  // onCategorySelect,
  onSubcategorySelect,
  onChildCategorySelect,
  categories = defaultCategories,
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(`.${styles.categoryCard}`)) {
        setActiveCategoryId(null);
      }
    };

    if (activeCategoryId) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activeCategoryId]);

  // Handle category toggle
  const handleCategoryToggle = useCallback((categoryId: string) => {
    setActiveCategoryId((prevId) =>
      prevId === categoryId ? null : categoryId
    );
  }, []);

  // Handle subcategory selection
  const handleSubcategoryClick = useCallback(
    async (subcategory: Subcategory) => {
      setIsLoading(true);
      try {
        if (onSubcategorySelect) {
          await onSubcategorySelect(subcategory);
        }
        // Close modal after selection
        setActiveCategoryId(null);
      } catch (error) {
        console.error("Error handling subcategory selection:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [onSubcategorySelect]
  );

  // Handle child category selection
  const handleChildCategoryClick = useCallback(
    async (childCategory: ChildCategory) => {
      setIsLoading(true);
      try {
        if (onChildCategorySelect) {
          await onChildCategorySelect(childCategory);
        }
        // Close modal after selection
        setActiveCategoryId(null);
      } catch (error) {
        console.error("Error handling child category selection:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [onChildCategorySelect]
  );

  // {Unused logic}
  // Handle category selection
  // const handleCategorySelect = useCallback(async (category: CategoryData) => {
  //   setIsLoading(true);
  //   try {
  //     if (onCategorySelect) {
  //       await onCategorySelect(category);
  //     }
  //   } catch (error) {
  //     console.error('Error handling category selection:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [onCategorySelect]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && activeCategoryId) {
        setActiveCategoryId(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeCategoryId]);

  return (
    <div className={styles.categoryPage}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>CATEGORIES</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            isActive={activeCategoryId === category.id}
            onToggle={handleCategoryToggle}
            onSubcategoryClick={handleSubcategoryClick}
            onChildCategoryClick={handleChildCategoryClick}
          />
        ))}
      </main>

      {/* Loading indicator */}
      {isLoading && (
        <div className={styles.loading}>
          <div className="sr-only">Loading...</div>
        </div>
      )}

      {/* Screen reader announcements */}
      <div className={styles.srOnly} aria-live="polite" aria-atomic="true">
        {activeCategoryId &&
          `Modal opened for ${
            categories.find((c) => c.id === activeCategoryId)?.name
          } category`}
      </div>
    </div>
  );
};

export default MobileCategoryPage;
