/**
 * Category route mapping utilities
 * Handles the mapping of category names to their corresponding routes
 */


const categoryRouteMap: Record<string, string> = {
  Aboboyaa: "/services/AboboyaaPage",
  Accessories: "/services/AccessoriesCosmeticShopPage",
  AccessoriesPage: "/services/AccessoriesPage",
  AfricanPrintSkillsCraft: "/services/AfricanPrintSkillsCraftPage",
  AgroChemicals: "/services/AgroChemicalsPage",
  AirConditioningElectronicsRepairer:
    "/services/AirConditioningElectronicsRepairerPage",
  AirconditionInstallation: "/services/AirConditionInstallationPage",
  Airplane: "/services/AirplanePage",
  // AlignmentBalancing: '/services/AlignmentBalancingPage',
};

// Shared edge cases for multi-word categories and special characters
const edgeCases: Record<string, string> = {
  // Service-specific edge cases
  "accessories cosmetic shop": "/services/AccessoriesCosmeticShopPage",
  "african print skills craft": "/services/AfricanPrintSkillsCraftPage",
  "agro chemicals": "/services/AgroChemicalsPage",
  "air conditioning electronics repairer":
    "/services/AirConditioningElectronicsRepairerPage",
  // Special character edge cases
  // 'alignment/balancingpage': '/services/AlignmentBalancingPage',
  "alignment/balancing": "/services/AlignmentBalancingPage",
};

/**
 * Maps category names to their corresponding routes
 * Handles special cases and edge cases for multi-word categories
 */
export function getCategoryRoute(
  categoryName: string,
  subCategoryName: string
): string {
  // Handle specific edge cases for multi-word categories
  const lower = categoryName.toLowerCase();

  // Check for edge cases first
  if (edgeCases[lower]) {
    return edgeCases[lower];
  }

  // Handle special characters in category names
  // Remove spaces, forward slashes, and other special characters, then capitalize
  const normalized = subCategoryName
    .replace(/[\s\/\-_]+/g, "") // Remove spaces, forward slashes, hyphens, and underscores
    .replace(/[^\w]/g, ""); // Remove any other non-word characters

  // Check if the normalized category exists in the map
  if (categoryRouteMap[normalized]) {
    return categoryRouteMap[normalized];
  }

  // Universal routing: prefix with /services/ for any category not in the map
  return `/services?category=${encodeURIComponent(
    categoryName
  )}&subCategory=${encodeURIComponent(subCategoryName)}`;
}

/**
 * Validates if a category route exists
 */
export function isValidCategoryRoute(categoryName: string): boolean {
  // Check if the category name exists in the edge cases
  const lower = categoryName.toLowerCase();

  if (edgeCases[lower]) {
    return true;
  }

  // Check if the normalized category name exists in the main category map
  const normalized = categoryName
    .replace(/[\s\/\-_]+/g, "") // Remove spaces, forward slashes, hyphens, and underscores
    .replace(/[^\w]/g, ""); // Remove any other non-word characters
  return categoryRouteMap.hasOwnProperty(normalized);
}
