// Main component
export { default as MobileCategoryPage } from './MobileCategoryPage';

// Individual components
export { default as CategoryCard } from './CategoryCard';
export { default as Modal } from './Modal';

// Types and interfaces
export type {
  CategoryData,
  Subcategory,
  ChildCategory,
  CategoryCardProps,
  ModalProps,
  CategoryPageProps,
  CardPosition
} from './types';

// Data and utilities
export {
  defaultCategories,
  getCategoryById,
  getSubcategoryById,
  getChildCategoryById
} from './data';

export {
  debounce,
  throttle,
  generateId,
  validateCategoryData,
  searchCategories,
  filterCategoriesByType,
  getCategoryStats,
  formatCategoryForDisplay,
  hasChildCategories,
  getAllSubcategories,
  getAllChildCategories,
  createBreadcrumbTrail,
  sanitizeHtml,
  isMobileDevice,
  getViewportDimensions,
  calculateDropdownPosition
} from './utils';

// Custom hooks
export { useCategoryState } from './useCategoryState';

// Styles
export { default as styles } from './styles.module.css'; 