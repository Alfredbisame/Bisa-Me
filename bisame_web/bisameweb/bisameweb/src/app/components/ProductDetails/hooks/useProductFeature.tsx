import React from "react";
import { useProductData } from "./useProductData";
import { FaToolbox } from "react-icons/fa";

// Define the feature type
interface Feature {
  icon: React.ReactNode;
  text: string;
}

const useProductFeature = (productId: string | null) => {
  const { product, isLoading } = useProductData(productId);

  // Extract service features from product attributes
  const getServiceFeatures = (): Feature[] => {
    if (!product || !product.attributes?.keyFeatures) {
      return [];
    }

    // Parse the keyFeatures string which appears to be a comma-separated list
    const keyFeaturesString = product.attributes.keyFeatures;
    
    // Ensure keyFeaturesString is a string before calling split
    if (typeof keyFeaturesString !== 'string') {
      return [];
    }
    
    const featuresList = keyFeaturesString
      .split(",")
      .map((feature: string) => feature.trim())
      .filter((feature: string) => feature.length > 0);

    // Map to the feature format with icons
    return featuresList.map((feature: string) => ({
      icon: <FaToolbox className="text-orange-500" />,
      text: feature,
    }));
  };

  const features = getServiceFeatures();

  return { product, isLoading, features };
};

export default useProductFeature;
