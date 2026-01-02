import type { Product } from './types';

interface ProductDescriptionProps {
  product: Product | null;
  isLoading: boolean;
  error: unknown;
}

const ProductDescription = ({ product, isLoading, error }: ProductDescriptionProps) => {
  const defaultDescription = "No description available for this product.";

  if (isLoading) {
    return (
      <div className="lg:col-span-1">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Description</h2>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lg:col-span-1">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Description</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">Failed to load product description.</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="lg:col-span-1">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Description</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-gray-500 text-sm">Product not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-1">
      <h2 className="md:text-xl font-semibold mb-4 text-gray-900">Description</h2>
      <div className="prose prose-sm max-w-none">
        <p className="text-gray-700 mb-4 leading-relaxed whitespace-pre-line text-sm md:text-base">
          {product.description || defaultDescription}
        </p>
      </div>
    </div>
  );
};

export default ProductDescription;