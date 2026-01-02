import React from "react";
import { Product } from "../hooks/useProductData";


// Define the feature type
interface Feature {
  icon: React.ReactNode;
  text: string;
}

interface ProductFeatureProps {
  features: Feature[];
  isLoading: boolean;
  product: Product | undefined;
}

const ProductFeatures: React.FC<ProductFeatureProps> = ({
  features,
  isLoading,
  product,
}) => {
  // Don't render the component if there are no features
  if (!features.length) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="lg:col-span-1 lg:border-l lg:pl-8 border-gray-200">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
        <ul className="space-y-3">
          {[...Array(5)].map((_, index) => (
            <li key={index} className="flex items-center">
              <div className="h-5 w-5 bg-gray-200 rounded-full mr-3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="lg:col-span-1 lg:border-l lg:pl-8 border-gray-200">
      <h2 className="md:text-xl font-semibold mb-4 text-gray-900">
        {product?.categoryGroup === "Services"
          ? "Key Services"
          : "Key Features"}
      </h2>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center group">
            <span className="text-orange-500 mr-3 text-lg group-hover:text-orange-600 transition-colors">
              {feature.icon}
            </span>
            <span className="text-gray-700 text-sm group-hover:text-gray-900 transition-colors md:text-base">
              {feature.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductFeatures;
