import { useRouter } from 'next/navigation';
import { Product } from '../types';

// Route constants for better maintainability
const ROUTES = {
  PRODUCT_DETAILS: '/ProductDetails'
} as const;

export const useProductNavigation = () => {
  const router = useRouter();
  
  const handleProductClick = (product: Product) => {
    try {
      // Validate product ID before proceeding
      if (!product.id) {
        console.error('Product ID is missing or invalid');
        return;
      }

      // Navigate to product details page with the product ID as a query parameter
      try {
        router.push(`${ROUTES.PRODUCT_DETAILS}?id=${product.id}`);
      } catch (navigationError) {
        console.error('Failed to navigate to product details:', navigationError);
        // Fallback: try using window.location as a last resort
        if (typeof window !== 'undefined') {
          window.location.href = `${ROUTES.PRODUCT_DETAILS}?id=${product.id}`;
        }
      }
    } catch (error) {
      console.error('Unexpected error in handleProductClick:', error);
    }
  };
  
  return {
    handleProductClick
  };
};