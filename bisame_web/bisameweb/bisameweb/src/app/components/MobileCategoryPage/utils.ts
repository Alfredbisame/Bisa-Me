import { CategoryData, Subcategory, ChildCategory } from './types';

/**
 * Debounce function to limit the rate at which a function can fire
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function to ensure a function is called at most once in a specified time period
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Generate a unique ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Validate category data structure
 */
export const validateCategoryData = (category: unknown): category is CategoryData => {
  return !!(
    category &&
    typeof (category as { id?: unknown; name?: unknown; description?: unknown; imageUrl?: unknown; borderColor?: unknown; textColor?: unknown; subcategories?: unknown[] }).id === 'string' &&
    typeof (category as { name: unknown }).name === 'string' &&
    typeof (category as { description: unknown }).description === 'string' &&
    typeof (category as { imageUrl: unknown }).imageUrl === 'string' &&
    typeof (category as { borderColor: unknown }).borderColor === 'string' &&
    typeof (category as { textColor: unknown }).textColor === 'string' &&
    Array.isArray((category as { subcategories?: unknown[] }).subcategories) &&
    (category as { subcategories: unknown[] }).subcategories.every((sub: unknown) => 
      sub && typeof (sub as { id: unknown }).id === 'string' && typeof (sub as { name: unknown }).name === 'string'
    )
  );
};

/**
 * Search categories by name or description
 */
export const searchCategories = (
  categories: CategoryData[],
  searchTerm: string
): CategoryData[] => {
  const term = searchTerm.toLowerCase();
  return categories.filter(category =>
    category.name.toLowerCase().includes(term) ||
    category.description.toLowerCase().includes(term) ||
    category.subcategories.some(sub =>
      sub.name.toLowerCase().includes(term) ||
      (sub.description && sub.description.toLowerCase().includes(term))
    )
  );
};

/**
 * Filter categories by type
 */
export const filterCategoriesByType = (
  categories: CategoryData[],
  type: 'services' | 'buy-sell' | 'all'
): CategoryData[] => {
  if (type === 'all') return categories;
  return categories.filter(category => category.id === type);
};

/**
 * Get category statistics
 */
export const getCategoryStats = (categories: CategoryData[]) => {
  const totalCategories = categories.length;
  const totalSubcategories = categories.reduce(
    (sum, category) => sum + category.subcategories.length,
    0
  );
  const totalChildCategories = categories.reduce(
    (sum, category) => sum + (category.childCategories?.length || 0),
    0
  );

  return {
    totalCategories,
    totalSubcategories,
    totalChildCategories,
    averageSubcategoriesPerCategory: totalCategories > 0 ? totalSubcategories / totalCategories : 0
  };
};

/**
 * Format category data for display
 */
export const formatCategoryForDisplay = (category: CategoryData) => {
  return {
    ...category,
    displayName: category.name.toUpperCase(),
    shortDescription: category.description.length > 100 
      ? `${category.description.substring(0, 100)}...` 
      : category.description,
    subcategoryCount: category.subcategories.length,
    childCategoryCount: category.childCategories?.length || 0
  };
};

/**
 * Check if a category has child categories
 */
export const hasChildCategories = (category: CategoryData): boolean => {
  return !!(category.childCategories && category.childCategories.length > 0);
};

/**
 * Get all subcategories from all categories
 */
export const getAllSubcategories = (categories: CategoryData[]): Subcategory[] => {
  return categories.flatMap(category => category.subcategories);
};

/**
 * Get all child categories from all categories
 */
export const getAllChildCategories = (categories: CategoryData[]): ChildCategory[] => {
  return categories.flatMap(category => category.childCategories || []);
};

/**
 * Create a breadcrumb trail for navigation
 */
export const createBreadcrumbTrail = (
  category: CategoryData,
  subcategory?: Subcategory,
  childCategory?: ChildCategory
): Array<{ id: string; name: string; type: 'category' | 'subcategory' | 'child' }> => {
  const trail: Array<{ id: string; name: string; type: 'category' | 'subcategory' | 'child' }> = [
    { id: category.id, name: category.name, type: 'category' }
  ];

  if (subcategory) {
    trail.push({ id: subcategory.id, name: subcategory.name, type: 'subcategory' });
  }

  if (childCategory) {
    trail.push({ id: childCategory.id, name: childCategory.name, type: 'child' });
  }

  return trail;
};

/**
 * Sanitize HTML content
 */
export const sanitizeHtml = (html: string): string => {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};

/**
 * Check if the current device is mobile
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Get viewport dimensions
 */
export const getViewportDimensions = () => {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 };
  }
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
};

/**
 * Calculate optimal dropdown position
 */
export const calculateDropdownPosition = (
  elementRect: DOMRect,
  dropdownWidth: number,
  dropdownHeight: number
): { top: number; left: number } => {
  const viewport = getViewportDimensions();
  
  let top = elementRect.bottom + 10;
  let left = elementRect.left + (elementRect.width / 2) - (dropdownWidth / 2);

  // Adjust if dropdown goes off the right edge
  if (left + dropdownWidth > viewport.width) {
    left = viewport.width - dropdownWidth - 10;
  }

  // Adjust if dropdown goes off the left edge
  if (left < 10) {
    left = 10;
  }

  // Adjust if dropdown goes off the bottom edge
  if (top + dropdownHeight > viewport.height) {
    top = elementRect.top - dropdownHeight - 10;
  }

  return { top, left };
}; 