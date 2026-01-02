"use client";

import { useProductData } from "./hooks/useProductData";
import { useSearchParams } from "next/navigation";

const AdditionalInformation = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  // Use the same hook as ProductDetail to fetch product data
  const { product, isLoading, hasError } = useProductData(productId || null);

  if (isLoading) return <div>Loading product information...</div>;
  if (hasError) return <div>Failed to load product information</div>;
  if (!product) return <div>No product data available</div>;

  // Function to format attribute keys for display
  const formatAttributeKey = (key: string) => {
    // Convert camelCase to Title Case
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const formatAttributeValue = (value: unknown): string => {
    if (value === null || value === undefined) {
      return "N/A";
    }

    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }

    if (typeof value === "number") {
      // Format numbers with commas for better readability
      if (Number.isInteger(value)) {
        return value.toLocaleString();
      }
      return value.toString();
    }

    if (Array.isArray(value)) {
      // Format arrays as comma-separated list
      return value.length > 0 ? value.join(", ") : "N/A";
    }

    // For objects, try to stringify them or return N/A
    if (typeof value === "object") {
      try {
        return JSON.stringify(value);
      } catch {
        return "N/A";
      }
    }

    // For strings and other types, convert to string
    return String(value);
  };

  // Get all attributes from the product
  const attributes = product.attributes || {};

  // Filter out any attributes that are null, undefined, or empty
  const validAttributes = Object.entries(attributes).filter(
    ([, value]) => value !== null && value !== undefined && value !== ""
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="bg-white divide-y divide-gray-200">
          {validAttributes.map(([key, value]) => (
            <tr key={key}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {formatAttributeKey(key)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatAttributeValue(value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdditionalInformation;
